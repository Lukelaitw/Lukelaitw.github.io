import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { News } from "@/components/News";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Research } from "@/components/Research";
import { SectionNav } from "@/components/SectionNav";
import { Sidebar } from "@/components/Sidebar";
import { Skills } from "@/components/Skills";
import { education } from "@/content/education";
import { news } from "@/content/news";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { publications } from "@/content/publications";
import { research } from "@/content/research";
import { skills } from "@/content/skills";
import type { Link } from "@/content/types";
import styles from "./page.module.css";

const navLinks: Link[] = [
  { label: "News", href: "#news" },
  ...(publications.length > 0 ? [{ label: "Publications", href: "#publications" }] : []),
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar>
        <Intro profile={profile} />
        <SectionNav links={navLinks} />
      </Sidebar>
      <div className={styles.content}>
        <main>
          <News items={news} />
          <Publications items={publications} selfName={profile.name} />
          <Research items={research} />
          <Projects items={projects} />
          <Education items={education} />
          <Skills groups={skills} />
        </main>
        <Footer name={profile.name} />
      </div>
    </div>
  );
}
