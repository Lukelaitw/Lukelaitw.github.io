import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { News } from "@/components/News";
import { TopNav } from "@/components/TopNav";
import { news } from "@/content/news";
import { profile } from "@/content/profile";
import type { Link } from "@/content/types";

const navLinks: Link[] = [
  { label: "News", href: "#news" },
  { label: "CV", href: profile.cvPath },
];

export default function Home() {
  return (
    <div className="container">
      <TopNav links={navLinks} />
      <main>
        <Intro profile={profile} />
        <News items={news} />
      </main>
      <Footer name={profile.name} />
    </div>
  );
}
