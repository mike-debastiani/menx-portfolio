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

export interface SanityFileAsset {
  _id: string;
  _type: string;
  url?: string;
  path?: string;
  originalFilename?: string;
}

export interface SanityFile {
  _type: 'file';
  asset: SanityFileAsset | {
    _ref: string;
    _type: 'reference';
  };
  filename?: string;
  url?: string;
}

export interface About extends SanityDocument {
  _type: 'about';
  greeting?: string;
  bigStatement?: string;
  supportingParagraph?: string;
  portraitImage: SanityImage;
  location?: string;
  status?: string;
  showStatusDot?: boolean;
  contentBlocks?: any[];
  footerCtaTitle?: string;
  footerPrimaryButtonText?: string;
  footerPrimaryButtonFile?: SanityFile;
  footerSecondaryButtonText?: string;
  footerSecondaryButtonLink?: string;
}

export interface HomeRoleCodeSegment {
  text: string;
  tone: 'default' | 'purple' | 'green' | 'orange' | 'gray' | 'muted' | 'red';
}

export interface HomeRoleCodeLine {
  lineNumber: number;
  segments: HomeRoleCodeSegment[];
}

export interface HomeRole {
  id: string;
  label: string;
  contentType: 'headline' | 'code';
  headlineText?: string;
  codeLines?: HomeRoleCodeLine[];
}

export interface HomeTestimonial {
  quote: string;
  personName: string;
  personRole: string;
  personImage?: SanityImage;
}

export interface Home extends SanityDocument {
  _type: 'home';
  roles?: HomeRole[];
  testimonialSectionTitle?: string;
  testimonials?: HomeTestimonial[];
  showTestimonialSection?: boolean;
}
