"use client";

import { useEffect, useState } from "react";
import type { Link } from "@/content/types";
import styles from "./SectionNav.module.css";

// Links to the page's sections, marking the one being read.
export function SectionNav({ links }: { links: Link[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    // A section is current while it crosses a band 20–30% down the window.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const link of links) {
      const section = document.getElementById(link.href.slice(1));
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className={styles.nav} aria-label="Sections">
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} aria-current={current === link.href.slice(1) ? "location" : undefined}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
