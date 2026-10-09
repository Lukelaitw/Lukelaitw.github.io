import type { SkillGroup } from "@/content/types";
import { Section } from "./Section";
import styles from "./Skills.module.css";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills" title="Skills">
      <dl className={styles.list}>
        {groups.map((group) => (
          <div key={group.label} className={styles.row}>
            <dt className={styles.label}>{group.label}</dt>
            <dd className={styles.items}>{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
