import type { Profile } from "@/content/types";
import styles from "./Intro.module.css";

export function Intro({ profile }: { profile: Profile }) {
  return (
    <header className={styles.intro}>
      <h1 className={styles.name}>{profile.name}</h1>
      <div className={styles.bio}>{profile.bio}</div>
      <p className={styles.links}>
        {profile.links.map((link, index) => (
          <span key={link.href}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden="true">
                {" / "}
              </span>
            )}
            <a href={link.href}>{link.label}</a>
          </span>
        ))}
      </p>
    </header>
  );
}
