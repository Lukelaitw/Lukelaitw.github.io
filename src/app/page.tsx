import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { News } from "@/components/News";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";
import { TopNav } from "@/components/TopNav";
import { education } from "@/content/education";
import { news } from "@/content/news";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { publications } from "@/content/publications";
import { research } from "@/content/research";
import { skills } from "@/content/skills";
import type { Link } from "@/content/types";

const navLinks: Link[] = [
  { label: "News", href: "#news" },
  ...(publications.length > 0 ? [{ label: "Publications", href: "#publications" }] : []),
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "CV", href: profile.cvPath },
];

export default function Home() {
  return (
    <div className="container">
      <TopNav links={navLinks} />
      <main>
        <Intro profile={profile} />
        <News items={news} />
        <Publications items={publications} selfName={profile.name} />
        <Research items={research} />
        <Projects items={projects} />
        <Education items={education} />
        <Skills groups={skills} />
      </main>
      <Footer name={profile.name} />
    </div>
  );
}
