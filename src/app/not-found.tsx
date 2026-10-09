import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found — Yu-Heng Lai",
};

export default function NotFound() {
  return (
    <main className="container">
      <div className={styles.page}>
        <h1 className={styles.title}>Page not found</h1>
        <p>This page doesn’t exist. It may have moved when this site was rebuilt.</p>
        <p>
          <Link href="/">Go to the homepage</Link>
          {" · "}
          <a href={profile.cvPath}>View my CV</a>
        </p>
      </div>
    </main>
  );
}
