import type { ResearchItem } from "@/content/types";
import { EntryHeading } from "./EntryHeading";
import { Section } from "./Section";
import styles from "./Research.module.css";

export function Research({ items }: { items: ResearchItem[] }) {
  return (
    <Section id="research" title="Research">
      {items.map((item) => (
        <article key={`${item.lab}-${item.org}`} className={styles.item}>
          <EntryHeading title={`${item.lab}, ${item.org}`} period={item.period} />
          <p className={styles.advisor}>
            Advisor: <a href={item.advisor.href}>{item.advisor.label}</a>
            {item.note && ` · ${item.note}`}
          </p>
          <p className={styles.description}>{item.description}</p>
        </article>
      ))}
    </Section>
  );
}
