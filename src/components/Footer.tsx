import styles from "./Footer.module.css";

// Evaluated during `next build`, so the footer shows when the site was last deployed.
const buildDate = new Date();
const year = buildDate.getUTCFullYear();
const lastUpdated = buildDate.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

export function Footer({ name }: { name: string }) {
  return (
    <footer className={styles.footer}>
      © {year} {name} · Last updated {lastUpdated}
    </footer>
  );
}
