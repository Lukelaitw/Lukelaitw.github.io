import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { TopNav } from "@/components/TopNav";
import { profile } from "@/content/profile";
import type { Link } from "@/content/types";

const navLinks: Link[] = [{ label: "CV", href: profile.cvPath }];

export default function Home() {
  return (
    <div className="container">
      <TopNav links={navLinks} />
      <main>
        <Intro profile={profile} />
      </main>
      <Footer name={profile.name} />
    </div>
  );
}
