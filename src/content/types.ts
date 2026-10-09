import type { ReactNode } from "react";

export type Link = { label: string; href: string };

export type Profile = {
  name: string;
  cvPath: string;
  bio: ReactNode;
  links: Link[];
};

export type NewsItem = { date: string; text: ReactNode };

export type ResearchItem = {
  lab: string;
  org: string;
  period: string;
  advisor: Link;
  note?: string;
  description: ReactNode;
};

export type Thumbnail =
  | { kind: "image"; src: string; alt: string; fit?: "cover" | "contain" }
  | { kind: "ecg" };

export type Project = {
  title: string;
  award?: string;
  period: string;
  description: string;
  tags: string[];
  links: Link[];
  thumbnail: Thumbnail;
};

export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  note?: string;
  links: Link[];
};

export type EducationItem = {
  school: string;
  period: string;
  degree: string;
  details?: string[];
};

export type SkillGroup = { label: string; items: string[] };
