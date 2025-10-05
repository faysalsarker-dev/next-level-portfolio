
export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  categories?: string[];
  status?: "draft" | "published";
  meta?: {
    views?: number;
    readTime?: number;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}



export interface IProject {
  _id?: string;
  title: string;
  thumbnail: string;
  description: string;
  features: string[];
  technologies: string[];
  githubLink?: string;
  liveSite?: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

