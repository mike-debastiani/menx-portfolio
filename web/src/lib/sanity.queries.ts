import { sanityClient } from './sanity.client';
import { fetchSanity } from './sanity.fetch';
import type { Phase, Method, Project, Impression } from '@/types/sanity';

export async function testSanityConnection() {
  const result = await sanityClient.fetch<unknown | null>(
    `*[_type match "*"][0]`
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

export async function getImpressionsByMethod(): Promise<ImpressionWithRelations[]> {
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

