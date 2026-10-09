"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Sidebar.module.css";

// The page header. On wide screens it is the left column and stays in view while the page
// scrolls; if it is taller than the window, it scrolls until its bottom shows, then stays.
export function Sidebar({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sidebar = ref.current;
    if (!sidebar) return;
    const update = () => {
      sidebar.style.setProperty("--sidebar-top", `${Math.min(0, window.innerHeight - sidebar.offsetHeight)}px`);
    };
    // The observer also calls update once when it starts observing.
    const observer = new ResizeObserver(update);
    observer.observe(sidebar);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header ref={ref} className={styles.sidebar}>
      {children}
    </header>
  );
}
