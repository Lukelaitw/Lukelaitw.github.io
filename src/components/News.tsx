import type { NewsItem } from "@/content/types";
import { Section } from "./Section";
import styles from "./News.module.css";

export function News({ items }: { items: NewsItem[] }) {
  return (
    <Section id="news" title="News">
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={`${item.date}-${index}`} className={styles.item}>
            <span className={styles.date}>{item.date}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
