export type ProjectType = 'web' | 'desktop' | 'mobile';

export interface Project {
  id: string;
  number: string;
  title: string;
  type: ProjectType;
  category: string;
  descriptionKey: string;
  description?: string;
  technologies: string[];
  heroImage: string;
  image?: string;
  imageAlt?: string;
  screenshots?: string[];
  caseStudyUrl?: string;
  repositoryUrl?: string;
  github?: string;
  liveUrl?: string;
}
