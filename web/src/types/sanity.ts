export interface SanitySlug {
  current: string;
  _type: 'slug';
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityReference {
  _ref: string;
  _type: 'reference';
}

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface Phase extends SanityDocument {
  _type: 'phase';
  name: string;
  order: number;
  slug: SanitySlug;
  color?: string;
}

export interface Method extends SanityDocument {
  _type: 'method';
  name: string;
  slug: SanitySlug;
  order: number;
  phase: SanityReference | Phase;
}

export interface Project extends SanityDocument {
  _type: 'project';
  projectTitle?: string;
  slug: SanitySlug;
  year?: number;
  timeframe?: string;
  context?: string;
  role?: string;
  team?: string;
  outcome?: string;
}

export interface Impression extends SanityDocument {
  _type: 'impression';
  image: SanityImage;
  method: SanityReference | Method;
  project: SanityReference | Project;
  headline: string;
  description?: string;
  order?: number;
}
