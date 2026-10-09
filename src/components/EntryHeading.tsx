import type { ReactNode } from "react";
import styles from "./EntryHeading.module.css";

type EntryHeadingProps = { title: ReactNode; period: string };

// Title on the left and period on the right; they stack on narrow screens.
export function EntryHeading({ title, period }: EntryHeadingProps) {
  return (
    <div className={styles.heading}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.period}>{period}</span>
    </div>
  );
}
