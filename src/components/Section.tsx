import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = { id: string; title: string; children: ReactNode };

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className={styles.heading}>
        {title}
      </h2>
      {children}
    </section>
  );
}
