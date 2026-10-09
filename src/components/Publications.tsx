import type { Publication } from "@/content/types";
import { Section } from "./Section";
import styles from "./Publications.module.css";

type PublicationsProps = { items: Publication[]; selfName: string };

// Renders nothing until the first entry is added to src/content/publications.ts.
export function Publications({ items, selfName }: PublicationsProps) {
  if (items.length === 0) return null;
  return (
    <Section id="publications" title="Publications">
      {items.map((publication) => (
        <article key={publication.title} className={styles.item}>
          <h3 className={styles.title}>{publication.title}</h3>
          <p className={styles.authors}>
            {publication.authors.map((author, index) => (
              <span key={author}>
                {index > 0 && ", "}
                {author === selfName ? <b>{author}</b> : author}
              </span>
            ))}
          </p>
          <p className={styles.venue}>
            <i>{publication.venue}</i>, {publication.year}
            {publication.note && ` · ${publication.note}`}
          </p>
          {publication.links.length > 0 && (
            <p className={styles.links}>
              {publication.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </p>
          )}
        </article>
      ))}
    </Section>
  );
}
