import { sanityClient, urlForImage } from './sanity.client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
import { fetchSanity } from './sanity.fetch';
import type { Phase, Method, Project, Impression, About, Home, SanityImage } from '@/types/sanity';
import type { ProjectCardData } from '@/components/organisms/ProjectCard';
import type { CaseStudyHeaderData } from '@/components/organisms/CaseStudyHeader';
import type { SubInfoGroupItem } from '@/components/molecules/SubInfoGroup';

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
      slug,
      year,
      timeframe,
      context,
      role,
      team,
      outcome
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
        projectTitle,
        slug,
        year,
        timeframe,
        context,
        role,
        team,
        outcome
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

export async function getProjectBySlug(slug: string): Promise<CaseStudyHeaderData | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    projectTitle,
    projectStatement,
    projectDescription,
    attributePills,
    role,
    context,
    timeframe,
    year,
    team,
    outcome
  }`;
  const result = await fetchSanity<CaseStudyHeaderData | null>(query, { slug });
  return result;
}

export interface CaseStudyData extends CaseStudyHeaderData {
  contentBlocks?: any[];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyData | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    projectTitle,
    projectStatement,
    projectDescription,
    attributePills,
    role,
    context,
    timeframe,
    year,
    team,
    outcome,
    contentBlocks[] {
      _key,
      _type,
      _type == "fullImage" => {
        image {
          ...,
          "asset": asset,
          "assetMetadata": asset->metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt,
        caption,
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "imageGallery" => {
        images[] {
          image,
          alt,
          caption
        },
        layout,
        bentoLayout,
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "sectionBlock" => {
        sectionTitle,
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        contentBlocks[] {
          _key,
          _type,
          _type == "sectionBlockText" => {
            content,
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockColumns" => {
            columns[] {
              title,
              items
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockRows" => {
            rows[] {
              label,
              items[] {
                label,
                href
              }
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockImage" => {
            image,
            alt,
            caption,
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockDetailedRows" => {
            title,
            rows[] {
              content
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockAccordion" => {
            items[] {
              title,
              content
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          }
        }
      },
      _type == "sectionBlockText" => {
        content,
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "sectionBlockColumns" => {
        columns[] {
          title,
          items
        },
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "sectionBlockRows" => {
        rows[] {
          label,
          items[] {
            label,
            href
          }
        },
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "sectionBlockImage" => {
        image,
        alt,
        caption,
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "sectionBlockDetailedRows" => {
        title,
        rows[] {
          content
        },
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "sectionBlockAccordion" => {
        items[] {
          title,
          content
        },
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "textBlock" => {
        content,
        alignment,
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "twoColumn" => {
        leftColumn {
          type,
          text,
          image,
          imageAlt
        },
        rightColumn {
          type,
          text,
          image,
          imageAlt
        },
        columnColumns {
          base {
            left,
            leftEnd,
            right,
            rightEnd
          },
          md {
            left,
            leftEnd,
            right,
            rightEnd
          },
          lg {
            left,
            leftEnd,
            right,
            rightEnd
          }
        },
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "twoColumnLayout" => {
        leftBlock[] {
          _key,
          _type,
          _type == "sectionBlockText" => {
            content,
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockColumns" => {
            columns[] {
              title,
              items
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockRows" => {
            rows[] {
              label,
              items[] {
                label,
                href
              }
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockImage" => {
            image,
            alt,
            caption,
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockDetailedRows" => {
            title,
            rows[] {
              content
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockAccordion" => {
            items[] {
              title,
              content
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          }
        },
        rightBlock[] {
          _key,
          _type,
          _type == "sectionBlockText" => {
            content,
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockColumns" => {
            columns[] {
              title,
              items
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockRows" => {
            rows[] {
              label,
              items[] {
                label,
                href
              }
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockImage" => {
            image,
            alt,
            caption,
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockDetailedRows" => {
            title,
            rows[] {
              content
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockAccordion" => {
            items[] {
              title,
              content
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          }
        },
        columnColumns {
          md {
            left,
            leftEnd,
            right,
            rightEnd
          },
          lg {
            left,
            leftEnd,
            right,
            rightEnd
          }
        },
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      },
      _type == "video" => {
        videoType,
        youtubeId,
        vimeoId,
        "sanityVideo": sanityVideo {
          asset-> {
            url
          }
        },
        videoUrl,
        caption,
        autoplay,
        loop,
        muted,
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
        gridPlacement
      }
    }
  }`;
  const result = await fetchSanity<CaseStudyData | null>(query, { slug });
  return result;
}

/**
 * Fetches the category of a project by its slug
 * Returns 'relevant-work' or 'lab' or null if project not found
 */
export async function getProjectCategoryBySlug(slug: string): Promise<'relevant-work' | 'lab' | null> {
  const query = `*[_type == "project" && slug.current == $slug][0].category`;
  const result = await fetchSanity<'relevant-work' | 'lab' | null>(query, { slug });
  return result;
}

/**
 * Fetches up to two suggested projects from the same category,
 * excluding the current project.
 */
export async function getSuggestedProjectsByCategory(
  category: 'relevant-work' | 'lab',
  excludeSlug: string,
): Promise<ProjectCardData[]> {
  const orderField = category === 'relevant-work' ? 'relevantWorkOrder' : 'labOrder';
  const query = `
    *[_type == "project" && category == $category]
      | order(coalesce(${orderField}, 9999) asc, _createdAt desc) {
      _id,
      slug,
      cardTitle,
      cardDescription,
      cardImage,
      attributePills
    }
  `;
  const projects = await fetchSanity<any[]>(query, { category });

  const currentIndex = projects.findIndex((project) => project.slug?.current === excludeSlug);
  const orderedProjects = currentIndex === -1
    ? projects
    : [...projects.slice(currentIndex + 1), ...projects.slice(0, currentIndex)];
  const suggestedProjects = orderedProjects
    .filter((project) => project.slug?.current !== excludeSlug)
    .slice(0, 2);

  return suggestedProjects.map((project) => {
    const tags = project.attributePills
      ? project.attributePills.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
      : undefined;

    const imageUrl = project.cardImage
      ? urlForImage(project.cardImage, {
          width: 1640,
          height: 1040,
          fit: 'crop',
          quality: 90,
          dpr: 2,
          auto: 'format',
        })
      : null;

    return {
      slug: project.slug.current,
      title: project.cardTitle || project.slug.current,
      excerpt: project.cardDescription || '',
      tags,
      image: imageUrl ? { src: imageUrl, alt: project.cardTitle || '' } : null,
    };
  });
}

export async function getSelectedProjects(): Promise<ProjectCardData[]> {
  const query = `
    *[_type == "project" && showOnHomepage == true] | order(selectedWorkOrder asc, _createdAt desc) {
      _id,
      slug,
      cardTitle,
      cardDescription,
      cardImage,
      attributePills
    }
  `;
  const projects = await fetchSanity<any[]>(query);
  
  // Convert to ProjectCardData format
  return projects.map((project) => {
    // Parse attributePills (comma-separated string) to tags array
    const tags = project.attributePills
      ? project.attributePills.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
      : undefined;
    
    // Convert cardImage to image URL with high quality for Retina displays
    const imageUrl = project.cardImage
      ? urlForImage(project.cardImage, { 
          width: 1640, // 2x for Retina displays
          height: 1040, // 2x for Retina displays
          fit: 'crop',
          quality: 90, // High quality
          dpr: 2, // Device Pixel Ratio for Retina
          auto: 'format' // Auto-optimize format (WebP, AVIF, etc.)
        })
      : null;
    
    return {
      slug: project.slug.current,
      title: project.cardTitle || project.slug.current,
      excerpt: project.cardDescription || '',
      tags,
      image: imageUrl ? { src: imageUrl, alt: project.cardTitle || '' } : null,
    };
  });
}

export async function getImpressionsCount(): Promise<number> {
  const query = `count(*[_type == "impression"])`;
  return fetchSanity<number>(query);
}

/**
 * Fetches all Relevant Work projects (category === 'relevant-work')
 * Sorted by relevantWorkOrder (ascending), then by _createdAt (descending)
 * Projects without relevantWorkOrder are sorted to the end
 */
export async function getRelevantWorkProjects(): Promise<ProjectCardData[]> {
  const query = `
    *[_type == "project" && category == "relevant-work"] | order(coalesce(relevantWorkOrder, 9999) asc, _createdAt desc) {
      _id,
      slug,
      cardTitle,
      cardDescription,
      cardImage,
      attributePills
    }
  `;
  const projects = await fetchSanity<any[]>(query);
  
  // Convert to ProjectCardData format
  return projects.map((project) => {
    // Parse attributePills (comma-separated string) to tags array
    const tags = project.attributePills
      ? project.attributePills.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
      : undefined;
    
    // Convert cardImage to image URL with high quality for Retina displays
    const imageUrl = project.cardImage
      ? urlForImage(project.cardImage, { 
          width: 1640, // 2x for Retina displays
          height: 1040, // 2x for Retina displays
          fit: 'crop',
          quality: 90, // High quality
          dpr: 2, // Device Pixel Ratio for Retina
          auto: 'format' // Auto-optimize format (WebP, AVIF, etc.)
        })
      : null;
    
    return {
      slug: project.slug.current,
      title: project.cardTitle || project.slug.current,
      excerpt: project.cardDescription || '',
      tags,
      image: imageUrl ? { src: imageUrl, alt: project.cardTitle || '' } : null,
    };
  });
}

/**
 * Fetches all Lab Projects (category === 'lab')
 * Sorted by labOrder (ascending), then by _createdAt (descending)
 * Projects without labOrder are sorted to the end
 */
export async function getLabProjects(): Promise<ProjectCardData[]> {
  const query = `
    *[_type == "project" && category == "lab"] | order(coalesce(labOrder, 9999) asc, _createdAt desc) {
      _id,
      slug,
      cardTitle,
      cardDescription,
      cardImage,
      attributePills
    }
  `;
  const projects = await fetchSanity<any[]>(query);
  
  // Convert to ProjectCardData format
  return projects.map((project) => {
    // Parse attributePills (comma-separated string) to tags array
    const tags = project.attributePills
      ? project.attributePills.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
      : undefined;
    
    // Convert cardImage to image URL with high quality for Retina displays
    const imageUrl = project.cardImage
      ? urlForImage(project.cardImage, { 
          width: 1640, // 2x for Retina displays
          height: 1040, // 2x for Retina displays
          fit: 'crop',
          quality: 90, // High quality
          dpr: 2, // Device Pixel Ratio for Retina
          auto: 'format' // Auto-optimize format (WebP, AVIF, etc.)
        })
      : null;
    
    return {
      slug: project.slug.current,
      title: project.cardTitle || project.slug.current,
      excerpt: project.cardDescription || '',
      tags,
      image: imageUrl ? { src: imageUrl, alt: project.cardTitle || '' } : null,
    };
  });
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
          projectTitle,
          slug,
          year,
          timeframe,
          context,
          role,
          team,
          outcome
        }
      },
      
      // Get all methods that have impressions, with phase data
      // Note: Sorting by phase->order in GROQ may not work reliably, so we sort in JavaScript instead
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
  
  // Debug: Log raw data count (also in production for Vercel debugging)
  const rawCount = data.impressions.length;
  const withMethod = data.impressions.filter(i => i.method && typeof i.method === 'object' && 'name' in i.method).length;
  const withProject = data.impressions.filter(i => i.project && typeof i.project === 'object' && 'projectTitle' in i.project).length;
  const withPhase = data.impressions.filter(i => {
    const method = i.method as WorkflowAtlasMethod | null;
    return method && method.phase && typeof method.phase === 'object' && 'name' in method.phase;
  }).length;
  
  // Log in all environments (especially important for Vercel debugging)
  console.log('[getWorkflowAtlasData] Environment:', process.env.NODE_ENV);
  console.log('[getWorkflowAtlasData] Raw impressions count:', rawCount);
  console.log('[getWorkflowAtlasData] Impressions with method:', withMethod);
  console.log('[getWorkflowAtlasData] Impressions with project:', withProject);
  console.log('[getWorkflowAtlasData] Impressions with phase:', withPhase);
  console.log('[getWorkflowAtlasData] Token present:', !!process.env.SANITY_API_READ_TOKEN);
  
  // Filter out any impressions with invalid method or project references (safety check)
  data.impressions = data.impressions.filter((impression) => {
    const hasMethod = impression.method && typeof impression.method === 'object' && 'name' in impression.method;
    const hasProject = impression.project && typeof impression.project === 'object' && 'projectTitle' in impression.project;
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

/**
 * Fetches WorkflowAtlas data for a single project (by slug).
 * Returns impressions ordered by: phase.order -> method.order -> impression.order/_createdAt
 * Only includes methods/phases that have at least 1 impression for this project.
 */
export async function getWorkflowAtlasProjectData(slug: string): Promise<WorkflowAtlasData> {
  const query = `
    {
      "impressions": *[_type == "impression" && defined(method) && defined(project) && method-> != null && project-> != null && project->slug.current == $slug] {
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
          projectTitle,
          slug,
          year,
          timeframe,
          context,
          role,
          team,
          outcome
        }
      },
      "methods": *[_type == "method" && count(*[_type == "impression" && references(^._id) && project->slug.current == $slug]) > 0] {
        _id,
        _type,
        name,
        slug,
        order,
        "impressionCount": count(*[_type == "impression" && references(^._id) && project->slug.current == $slug]),
        "phase": phase-> {
          _id,
          _type,
          name,
          order,
          slug,
          color
        }
      },
      "phases": *[_type == "phase" && count(*[_type == "method" && references(^._id) && count(*[_type == "impression" && references(^._id) && project->slug.current == $slug]) > 0]) > 0] | order(order asc) {
        _id,
        _type,
        name,
        order,
        slug,
        color,
        "methods": *[_type == "method" && references(^._id) && count(*[_type == "impression" && references(^._id) && project->slug.current == $slug]) > 0] | order(order asc) {
          _id,
          _type,
          name,
          slug,
          order,
          "impressionCount": count(*[_type == "impression" && references(^._id) && project->slug.current == $slug])
        }
      },
      "stats": {
        "impressionsCount": count(*[_type == "impression" && project->slug.current == $slug]),
        "methodsWithImpressionsCount": count(*[_type == "method" && count(*[_type == "impression" && references(^._id) && project->slug.current == $slug]) > 0]),
        "phasesInDatasetCount": count(*[_type == "phase" && count(*[_type == "method" && references(^._id) && count(*[_type == "impression" && references(^._id) && project->slug.current == $slug]) > 0]) > 0]),
        "projectsTotalCount": 1
      }
    }
  `;

  const data = await fetchSanity<WorkflowAtlasData>(query, { slug });

  // Filter out any impressions with invalid method or project references (safety check)
  data.impressions = data.impressions.filter((impression) => {
    const hasMethod = impression.method && typeof impression.method === 'object' && 'name' in impression.method;
    const hasProject = impression.project && typeof impression.project === 'object' && 'projectTitle' in impression.project;
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

    if (aPhase.order !== bPhase.order) {
      return aPhase.order - bPhase.order;
    }

    if (aMethod.order !== bMethod.order) {
      return aMethod.order - bMethod.order;
    }

    const aOrder = a.order ?? 0;
    const bOrder = b.order ?? 0;
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

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

export interface AboutData {
  greeting?: string;
  heading: string;
  description: string;
  subInfoItems?: SubInfoGroupItem[];
  image?: {
    src: string;
    alt: string;
  };
  contentBlocks?: any[];
  footerCtaTitle?: string;
  footerPrimaryButtonText?: string;
  footerPrimaryButtonFileUrl?: string;
  footerSecondaryButtonText?: string;
  footerSecondaryButtonLink?: string;
}

export async function getAboutData(): Promise<AboutData | null> {
  const query = `
    *[_type == "about"][0] {
      greeting,
      bigStatement,
      supportingParagraph,
      portraitImage,
      location,
      status,
      showStatusDot,
      contentBlocks[] {
        _key,
        _type,
        _type == "fullImage" => {
          image {
            ...,
            "asset": asset,
            "assetMetadata": asset->metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt,
          caption,
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "imageGallery" => {
          images[] {
            image,
            alt,
            caption
          },
          layout,
          bentoLayout,
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "sectionBlock" => {
          sectionTitle,
        padding {
          base { pt, pb },
          md { pt, pb },
          xl { pt, pb }
        },
          contentBlocks[] {
            _key,
            _type,
            _type == "sectionBlockText" => {
              content,
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockColumns" => {
              columns[] {
                title,
                items
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockRows" => {
              rows[] {
                label,
                items[] {
                  label,
                  href
                }
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockImage" => {
              image,
              alt,
              caption,
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
          },
          _type == "sectionBlockDetailedRows" => {
            title,
            rows[] {
              content
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
          },
          _type == "sectionBlockAccordion" => {
            items[] {
              title,
              content
            },
            padding {
              base { pt, pb },
              md { pt, pb },
              xl { pt, pb }
            },
            gridPlacement
            }
          }
        },
        _type == "sectionBlockText" => {
          content,
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "sectionBlockColumns" => {
          columns[] {
            title,
            items
          },
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "sectionBlockRows" => {
          rows[] {
            label,
            items[] {
              label,
              href
            }
          },
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "sectionBlockImage" => {
          image,
          alt,
          caption,
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "sectionBlockDetailedRows" => {
          title,
          rows[] {
            content
          },
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "sectionBlockAccordion" => {
          items[] {
            title,
            content
          },
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "textBlock" => {
          content,
          alignment,
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "twoColumn" => {
          leftColumn {
            type,
            text,
            image,
            imageAlt
          },
          rightColumn {
            type,
            text,
            image,
            imageAlt
          },
          columnColumns {
            md {
              left,
              leftEnd,
              right,
              rightEnd
            },
            lg {
              left,
              leftEnd,
              right,
              rightEnd
            }
          },
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "twoColumnLayout" => {
          leftBlock[] {
            _key,
            _type,
            _type == "sectionBlockText" => {
              content,
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockColumns" => {
              columns[] {
                title,
                items
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockRows" => {
              rows[] {
                label,
                items[] {
                  label,
                  href
                }
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockImage" => {
              image,
              alt,
              caption,
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockDetailedRows" => {
              title,
              rows[] {
                content
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockAccordion" => {
              items[] {
                title,
                content
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            }
          },
          rightBlock[] {
            _key,
            _type,
            _type == "sectionBlockText" => {
              content,
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockColumns" => {
              columns[] {
                title,
                items
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockRows" => {
              rows[] {
                label,
                items[] {
                  label,
                  href
                }
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockImage" => {
              image,
              alt,
              caption,
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockDetailedRows" => {
              title,
              rows[] {
                content
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            },
            _type == "sectionBlockAccordion" => {
              items[] {
                title,
                content
              },
              padding {
                base { pt, pb },
                md { pt, pb },
                xl { pt, pb }
              },
              gridPlacement
            }
          },
          columnColumns {
            md {
              left,
              leftEnd,
              right,
              rightEnd
            },
            lg {
              left,
              leftEnd,
              right,
              rightEnd
            }
          },
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        },
        _type == "video" => {
          videoType,
          youtubeId,
          vimeoId,
          "sanityVideo": sanityVideo {
            asset-> {
              url
            }
          },
          videoUrl,
          caption,
          autoplay,
          loop,
          muted,
          padding {
            base { pt, pb },
            md { pt, pb },
            xl { pt, pb }
          },
          gridPlacement
        }
      },
      footerCtaTitle,
      footerPrimaryButtonText,
      "footerPrimaryButtonFile": footerPrimaryButtonFile {
        asset-> {
          _id,
          _type,
          url,
          originalFilename,
          path,
          size,
          mimeType
        },
        filename
      },
      footerSecondaryButtonText,
      footerSecondaryButtonLink
    }
  `;
  const about = await fetchSanity<About | null>(query);
  
  if (!about) {
    return null;
  }
  
  // Build SubInfoGroup items
  const subInfoItems: SubInfoGroupItem[] = [];
  if (about.location) {
    subInfoItems.push({ label: 'Location:', value: about.location });
  }
  if (about.status) {
    subInfoItems.push({ 
      label: 'Status:', 
      value: about.status, 
      showDot: about.showStatusDot || false 
    });
  }
  
  // Convert portraitImage to URL
  const imageUrl = about.portraitImage
    ? urlForImage(about.portraitImage, {
        width: 1200,
        height: 1200,
        fit: 'crop',
        quality: 90,
        dpr: 2,
        auto: 'format',
      })
    : undefined;
  
  // Get file URL for primary button
  // Sanity provides the URL directly from the asset
  let primaryButtonFileUrl: string | undefined;
  
  if (about.footerPrimaryButtonFile?.asset) {
    const asset = about.footerPrimaryButtonFile.asset as any;
    
    // First try: Use URL directly from asset if available
    if (asset.url) {
      primaryButtonFileUrl = asset.url;
    } 
    // Second try: Use path from asset if available
    else if (asset.path && projectId && dataset) {
      primaryButtonFileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${asset.path}`;
    }
    // Fallback: Construct URL from asset ID
    else if (asset._id && projectId && dataset) {
      // Asset ID format: file-{id}-{width}x{height}-{extension}
      // For files, it's usually: file-{id}-{extension}
      const assetId = asset._id;
      
      // Try to extract ID and extension from asset ID
      // Format can be: file-{id}-{extension} or file-{id}
      if (assetId.startsWith('file-')) {
        const withoutPrefix = assetId.replace(/^file-/, '');
        const parts = withoutPrefix.split('-');
        
        // Get extension from mimeType, filename, or asset ID
        let extension = 'pdf'; // default
        if (asset.mimeType) {
          // Extract extension from mimeType (e.g., "application/pdf" -> "pdf")
          const mimeParts = asset.mimeType.split('/');
          if (mimeParts.length > 1) {
            extension = mimeParts[1];
            // Handle special cases
            if (extension === 'vnd.openxmlformats-officedocument.wordprocessingml.document') extension = 'docx';
            if (extension === 'msword') extension = 'doc';
          }
        } else if (about.footerPrimaryButtonFile.filename) {
          extension = about.footerPrimaryButtonFile.filename.split('.').pop() || 'pdf';
        } else if (asset.originalFilename) {
          extension = asset.originalFilename.split('.').pop() || 'pdf';
        } else if (parts.length > 1) {
          // Last part might be extension
          extension = parts[parts.length - 1];
        }
        
        // The ID is usually the first part
        const id = parts[0];
        primaryButtonFileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
      }
    }
  }

  return {
    greeting: about.greeting,
    heading: about.bigStatement || '',
    description: about.supportingParagraph || '',
    subInfoItems: subInfoItems.length > 0 ? subInfoItems : undefined,
    image: imageUrl
      ? {
          src: imageUrl,
          alt: 'Mike De Bastiani - Digital Product Designer',
        }
      : undefined,
    contentBlocks: about.contentBlocks || [],
    footerCtaTitle: about.footerCtaTitle,
    footerPrimaryButtonText: about.footerPrimaryButtonText,
    footerPrimaryButtonFileUrl: primaryButtonFileUrl,
    footerSecondaryButtonText: about.footerSecondaryButtonText,
    footerSecondaryButtonLink: about.footerSecondaryButtonLink,
  };
}

export interface HomeData {
  roles?: Array<{
    id: string;
    label: string;
    contentType: 'headline' | 'code';
    headlineText?: string;
    codeLines?: Array<{
      lineNumber: number;
      segments: Array<{
        text: string;
        tone: 'default' | 'purple' | 'green' | 'orange' | 'gray' | 'muted' | 'red';
      }>;
    }>;
  }>;
  testimonialSectionTitle?: string;
  testimonials?: Array<{
    quote: string;
    personName: string;
    personRole: string;
    personImage?: SanityImage;
  }>;
  showTestimonialSection?: boolean;
}

/**
 * Fetches the Home page data from Sanity.
 * Returns the first (and should be only) home document.
 */
export async function getHomeData(): Promise<HomeData | null> {
  const query = `
    *[_type == "home"][0] {
      roles[] {
        id,
        label,
        contentType,
        headlineText,
        codeLines[] {
          lineNumber,
          segments[] {
            text,
            tone
          }
        }
      },
      testimonialSectionTitle,
      showTestimonialSection,
      testimonials[] {
        quote,
        personName,
        personRole,
        personImage
      }
    }
  `;
  const home = await fetchSanity<Home | null>(query);
  
  if (!home) {
    return null;
  }
  
  return {
    roles: home.roles || [],
    testimonialSectionTitle: home.testimonialSectionTitle,
    testimonials: home.testimonials || [],
    showTestimonialSection: home.showTestimonialSection,
  };
}
