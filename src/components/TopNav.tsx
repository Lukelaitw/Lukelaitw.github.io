import type { Link } from "@/content/types";
import styles from "./TopNav.module.css";

export function TopNav({ links }: { links: Link[] }) {
  return (
    <nav className={styles.nav} aria-label="Sections">
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
