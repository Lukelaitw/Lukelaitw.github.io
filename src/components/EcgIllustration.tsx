import styles from "./EcgIllustration.module.css";

// Stand-in thumbnail for the BLE app, which has no screenshot; it is labelled as an illustration.
export function EcgIllustration() {
  return (
    <svg className={styles.svg} viewBox="0 0 180 112" role="img" aria-label="Illustrative ECG waveform">
      <defs>
        <pattern id="ecg-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" className={styles.grid} />
        </pattern>
      </defs>
      <rect width="180" height="112" className={styles.paper} />
      <rect width="180" height="112" fill="url(#ecg-grid)" />
      <polyline
        className={styles.trace}
        points="0,62 16,62 20,57 24,62 32,62 35,67 39,24 43,76 47,62 56,62 62,53 68,62 86,62 90,57 94,62 102,62 105,67 109,24 113,76 117,62 126,62 132,53 138,62 156,62 160,57 164,62 172,62 175,67 178,40"
      />
      <text x="172" y="104" textAnchor="end" className={styles.label}>
        illustration
      </text>
    </svg>
  );
}
