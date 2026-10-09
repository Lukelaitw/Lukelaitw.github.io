"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import type { ImageFile } from "@/content/types";
import styles from "./ImageLightbox.module.css";

type ImageLightboxProps = { image: ImageFile; alt: string; caption: string; children: ReactNode };

// Makes a thumbnail a link to `image` that opens it in a modal dialog instead. The dialog
// closes with its close button, Escape, or a click outside the image. Modified clicks
// (such as Cmd-click to open a new tab) and visits without JavaScript follow the link.
export function ImageLightbox({ image, alt, caption, children }: ImageLightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <a
        href={image.src}
        className={styles.trigger}
        aria-label={`View larger image: ${alt}`}
        aria-haspopup="dialog"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          dialog.current?.showModal();
        }}
      >
        {children}
        <span className={styles.badge} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </a>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={caption}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <figure className={styles.figure}>
          <Image src={image.src} alt={alt} width={image.width} height={image.height} className={styles.image} />
          <figcaption className={styles.caption}>{caption}</figcaption>
        </figure>
        <button type="button" className={styles.close} aria-label="Close" onClick={close}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
