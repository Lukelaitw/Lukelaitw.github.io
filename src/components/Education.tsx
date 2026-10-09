import Image from "next/image";
import type { EducationItem } from "@/content/types";
import { EntryHeading } from "./EntryHeading";
import { Section } from "./Section";
import styles from "./Education.module.css";

export function Education({ items }: { items: EducationItem[] }) {
  return (
    <Section id="education" title="Education">
      {items.map((item) => (
        <article key={item.school} className={styles.item}>
          {item.logo && (
            <Image src={item.logo} alt={`${item.school} logo`} width={52} height={52} className={styles.logo} />
          )}
          <div className={styles.body}>
            <EntryHeading title={item.school} period={item.period} />
            <p className={styles.degree}>{item.degree}</p>
            {item.details?.map((detail) => (
              <p key={detail} className={styles.detail}>
                {detail}
              </p>
            ))}
          </div>
        </article>
      ))}
    </Section>
  );
}
