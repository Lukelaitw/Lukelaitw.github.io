import type { EducationItem } from "@/content/types";
import { EntryHeading } from "./EntryHeading";
import { Section } from "./Section";
import styles from "./Education.module.css";

export function Education({ items }: { items: EducationItem[] }) {
  return (
    <Section id="education" title="Education">
      {items.map((item) => (
        <article key={item.school} className={styles.item}>
          <EntryHeading title={item.school} period={item.period} />
          <p className={styles.degree}>{item.degree}</p>
          {item.details?.map((detail) => (
            <p key={detail} className={styles.detail}>
              {detail}
            </p>
          ))}
        </article>
      ))}
    </Section>
  );
}
