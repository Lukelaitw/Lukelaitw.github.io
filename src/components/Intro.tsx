import type { Profile } from "@/content/types";
import { Icon } from "./Icon";
import styles from "./Intro.module.css";

export function Intro({ profile }: { profile: Profile }) {
  return (
    <div>
      <h1 className={styles.name}>{profile.name}</h1>
      <div className={styles.bio}>{profile.bio}</div>
      <ul className={styles.links}>
        {profile.links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>
              <Icon name={link.icon} />
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
