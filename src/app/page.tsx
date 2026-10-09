import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { News } from "@/components/News";
import { Research } from "@/components/Research";
import { TopNav } from "@/components/TopNav";
import { news } from "@/content/news";
import { profile } from "@/content/profile";
import { research } from "@/content/research";
import type { Link } from "@/content/types";

const navLinks: Link[] = [
  { label: "News", href: "#news" },
  { label: "Research", href: "#research" },
  { label: "CV", href: profile.cvPath },
];

export default function Home() {
  return (
    <div className="container">
      <TopNav links={navLinks} />
      <main>
        <Intro profile={profile} />
        <News items={news} />
        <Research items={research} />
      </main>
      <Footer name={profile.name} />
    </div>
  );
}
