export type ProjectType = 'web' | 'desktop' | 'mobile';

export interface ProjectCaseStudy {
  summary: string;
  context: string;
  problem: string;
  role: string;
  responsibilities: string[];
  architecture: {
    pattern: string;
    description: string;
    highlights: string[];
  };
  keyEngineeringDecisions: Array<{
    decision: string;
    rationale: string;
    impact: string;
  }>;
  challengesAndSolutions: Array<{
    challenge: string;
    solution: string;
  }>;
  securityAndPerformance: {
    security: string[];
    performance: string[];
  };
  results: string[];
  lessonsLearned: string[];
}

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
  caseStudy?: ProjectCaseStudy;
}
