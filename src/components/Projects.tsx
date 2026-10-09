import Image from "next/image";
import type { Project } from "@/content/types";
import { EcgIllustration } from "./EcgIllustration";
import { ImageLightbox } from "./ImageLightbox";
import { Section } from "./Section";
import styles from "./Projects.module.css";

function ProjectThumbnail({ project }: { project: Project }) {
  const { thumbnail } = project;
  if (thumbnail.kind === "ecg") return <EcgIllustration />;
  const image = (
    <Image
      src={thumbnail.src}
      alt={thumbnail.alt}
      width={360}
      height={224}
      className={styles.image}
      style={{ objectFit: thumbnail.fit ?? "cover" }}
    />
  );
  if (!thumbnail.full) return image;
  return (
    <ImageLightbox image={thumbnail.full} alt={thumbnail.alt} caption={project.title}>
      {image}
    </ImageLightbox>
  );
}

export function Projects({ items }: { items: Project[] }) {
  return (
    <Section id="projects" title="Projects">
      {items.map((project) => (
        <article key={project.title} className={styles.item}>
          <div className={styles.thumb}>
            <ProjectThumbnail project={project} />
          </div>
          <div>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.meta}>
              {project.award && (
                <>
                  <span className={styles.award}>{project.award}</span>{" "}
                </>
              )}
              <span className={styles.period}>
                {project.award && "· "}
                {project.period}
              </span>
            </p>
            <p className={styles.description}>{project.description}</p>
            <p className={styles.tags}>{project.tags.join(" · ")}</p>
            <p className={styles.links}>
              {project.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </p>
          </div>
        </article>
      ))}
    </Section>
  );
}
