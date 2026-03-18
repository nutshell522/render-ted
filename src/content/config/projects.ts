export type ProjectConfig = {
  id: string;
  title: string;
  imageSrc?: string;
  repoUrl?: string;
  demoUrl?: string;
  tags?: string[];
};

export const projects: ProjectConfig[] = [];
