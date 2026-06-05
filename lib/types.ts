export type ProjectCategory =
  | "automation"
  | "devtools"
  | "data"
  | "writing"
  | "research"
  | "productivity";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  team: string;
  members: number;
  emoji: string;
  votes: number;
  trending: boolean;
  techStack: string[];
  coverImage: string;
}
