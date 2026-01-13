import { sanityClient } from './sanity.client';
import { fetchSanity } from './sanity.fetch';
import type { Phase, Method, Project, Impression } from '@/types/sanity';

export async function testSanityConnection() {
  const result = await sanityClient.fetch<unknown | null>(
    `*[_type match "*"][0]`,
  );
  return result;
}

export interface MethodWithImpressionCount extends Method {
  impressionCount: number;
}

export interface PhaseWithMethods extends Phase {
  methods: MethodWithImpressionCount[];
}

export async function getPhasesWithMethods(): Promise<PhaseWithMethods[]> {
  const query = `
    *[_type == "phase"] | order(order asc) {
      _id,
      name,
      order,
      color,
      "methods": *[_type == "method" && references(^._id)] | order(order asc) {
        _id,
        name,
        order,
        slug,
        "impressionCount": count(*[_type == "impression" && references(^._id)])
      }
    }
  `;
  return fetchSanity<PhaseWithMethods[]>(query);
}

export async function getLatestProjects(): Promise<Project[]> {
  const query = `
    *[_type == "project"] | order(year desc, _createdAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      year,
      timeframe,
      context,
      role,
      team,
      outcome,
      statement,
      description
    }
  `;
  return fetchSanity<Project[]>(query);
}

export interface ImpressionWithRelations extends Impression {
  method: Method;
  project: Project;
}

export async function getImpressionsByMethod(): Promise<
  ImpressionWithRelations[]
> {
  const query = `
    *[_type == "impression"] | order(method->order asc, order asc, _createdAt asc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      image,
      "method": method-> {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        slug,
        order,
        phase
      },
      "project": project-> {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        year,
        timeframe,
        context,
        role,
        team,
        outcome,
        statement,
        description
      },
      headline,
      description,
      order
    }
  `;
  return fetchSanity<ImpressionWithRelations[]>(query);
}

export async function getProjectsCount(): Promise<number> {
  const query = `count(*[_type == "project"])`;
  return fetchSanity<number>(query);
}

export async function getImpressionsCount(): Promise<number> {
  const query = `count(*[_type == "impression"])`;
  return fetchSanity<number>(query);
}

// WorkflowAtlas data types
export interface WorkflowAtlasImpression extends Impression {
  method: Method & {
    phase: Phase;
  };
  project: Project;
}

export interface WorkflowAtlasMethod extends Method {
  phase: Phase;
  impressionCount: number;
}

export interface WorkflowAtlasPhase extends Phase {
  methods: WorkflowAtlasMethod[];
}

export interface WorkflowAtlasStats {
  impressionsCount: number;
  methodsWithImpressionsCount: number;
  phasesInDatasetCount: number;
  projectsTotalCount: number;
}

export interface WorkflowAtlasData {
  impressions: WorkflowAtlasImpression[];
  methods: WorkflowAtlasMethod[];
  phases: WorkflowAtlasPhase[];
  stats: WorkflowAtlasStats;
}

/**
 * Fetches all data needed for the WorkflowAtlas section.
 * Returns impressions ordered by: phase.order -> method.order -> impression.order/_createdAt
 * Only includes methods/phases that have at least 1 impression.
 */
export async function getWorkflowAtlasData(): Promise<WorkflowAtlasData> {
  // Single comprehensive query that fetches everything we need
  // Note: GROQ doesn't support ordering by nested fields directly,
  // so we'll fetch all and sort in JS if needed, or use a workaround
  // The client is configured with perspective: 'raw' to include drafts
  // Important: We filter out impressions with missing method or project references
  const query = `
    {
      // Get all impressions with full method and phase data
      // Filter out impressions where method or project reference is null
      // We'll sort by phase order, method order, then impression order in the application
      "impressions": *[_type == "impression" && defined(method) && defined(project) && method-> != null && project-> != null] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        image,
        headline,
        description,
        order,
        "method": method-> {
          _id,
          _type,
          name,
          slug,
          order,
          "phase": phase-> {
            _id,
            _type,
            name,
            order,
            slug,
            color
          }
        },
        "project": project-> {
          _id,
          _type,
          title,
          slug,
          year,
          timeframe,
          context,
          role,
          team,
          outcome,
          statement,
          description
        }
      },
      
      // Get all methods that have impressions, with phase data
      "methods": *[_type == "method" && count(*[_type == "impression" && references(^._id)]) > 0] {
        _id,
        _type,
        name,
        slug,
        order,
        "impressionCount": count(*[_type == "impression" && references(^._id)]),
        "phase": phase-> {
          _id,
          _type,
          name,
          order,
          slug,
          color
        }
      },
      
      // Get all phases that have methods with impressions
      "phases": *[_type == "phase" && count(*[_type == "method" && references(^._id) && count(*[_type == "impression" && references(^._id)]) > 0]) > 0] | order(order asc) {
        _id,
        _type,
        name,
        order,
        slug,
        color,
        "methods": *[_type == "method" && references(^._id) && count(*[_type == "impression" && references(^._id)]) > 0] | order(order asc) {
          _id,
          _type,
          name,
          slug,
          order,
          "impressionCount": count(*[_type == "impression" && references(^._id)])
        }
      },
      
      // Stats
      "stats": {
        "impressionsCount": count(*[_type == "impression"]),
        "methodsWithImpressionsCount": count(*[_type == "method" && count(*[_type == "impression" && references(^._id)]) > 0]),
        "phasesInDatasetCount": count(*[_type == "phase" && count(*[_type == "method" && references(^._id) && count(*[_type == "impression" && references(^._id)]) > 0]) > 0]),
        "projectsTotalCount": count(*[_type == "project"])
      }
    }
  `;
  
  const data = await fetchSanity<WorkflowAtlasData>(query);
  
  // Debug: Log raw data count
  if (process.env.NODE_ENV === 'development') {
    console.log('[getWorkflowAtlasData] Raw impressions count:', data.impressions.length);
    console.log('[getWorkflowAtlasData] Impressions with method:', data.impressions.filter(i => i.method && typeof i.method === 'object' && 'name' in i.method).length);
    console.log('[getWorkflowAtlasData] Impressions with project:', data.impressions.filter(i => i.project && typeof i.project === 'object' && 'title' in i.project).length);
    console.log('[getWorkflowAtlasData] Impressions with phase:', data.impressions.filter(i => {
      const method = i.method as WorkflowAtlasMethod | null;
      return method && method.phase && typeof method.phase === 'object' && 'name' in method.phase;
    }).length);
  }
  
  // Filter out any impressions with invalid method or project references (safety check)
  data.impressions = data.impressions.filter((impression) => {
    const hasMethod = impression.method && typeof impression.method === 'object' && 'name' in impression.method;
    const hasProject = impression.project && typeof impression.project === 'object' && 'title' in impression.project;
    const method = impression.method as WorkflowAtlasMethod | null;
    const hasPhase = method && method.phase && typeof method.phase === 'object' && 'name' in method.phase;
    return hasMethod && hasProject && hasPhase;
  });
  
  // Sort impressions: phase.order -> method.order -> impression.order -> _createdAt
  data.impressions.sort((a, b) => {
    const aPhase = (a.method as WorkflowAtlasMethod).phase;
    const bPhase = (b.method as WorkflowAtlasMethod).phase;
    const aMethod = a.method as WorkflowAtlasMethod;
    const bMethod = b.method as WorkflowAtlasMethod;
    
    // Phase order
    if (aPhase.order !== bPhase.order) {
      return aPhase.order - bPhase.order;
    }
    
    // Method order
    if (aMethod.order !== bMethod.order) {
      return aMethod.order - bMethod.order;
    }
    
    // Impression order (if exists)
    const aOrder = a.order ?? 0;
    const bOrder = b.order ?? 0;
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    
    // Fallback to creation date
    return new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime();
  });
  
  // Sort methods: phase.order -> method.order
  data.methods.sort((a, b) => {
    if (a.phase.order !== b.phase.order) {
      return a.phase.order - b.phase.order;
    }
    return a.order - b.order;
  });
  
  return data;
}
