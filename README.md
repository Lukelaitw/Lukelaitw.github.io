# lukelaitw.github.io

Source of my personal website, https://lukelaitw.github.io. It is a Next.js site exported as static HTML and deployed to GitHub Pages by GitHub Actions on every push to `master`.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000 with hot reload
npm run build     # static export into out/
npm run check     # structural checks on out/
npm run preview   # serve out/ at http://localhost:3000
```

## Editing content

All text lives in `src/content/`. Components in `src/components/` only handle layout.

| File | Content |
| --- | --- |
| `profile.tsx` | Name, intro paragraphs, and the Email / CV / GitHub / LinkedIn links |
| `news.tsx` | News items, newest first |
| `publications.ts` | Publications. The section and its nav link appear once this list is non-empty. |
| `research.ts` | Research positions |
| `projects.ts` | Projects. Thumbnails are 720×448 WebP files in `public/images/projects/`. |
| `education.ts`, `skills.ts` | Education and Skills |

## Updating the CV

The site serves `public/cv/Yu-Heng_Lai_CV.pdf`, a web copy of the research resume without unpublished project names. After changing the resume:

1. Apply the same change to `resume_research_web.tex`, next to the original `.tex`, keeping unpublished project names out.
2. Compile it with `pdflatex resume_research_web.tex`.
3. Copy the PDF to `public/cv/Yu-Heng_Lai_CV.pdf` and push.

## Deployment

`.github/workflows/deploy.yml` runs `npm ci`, lint, build, and check, then deploys `out/` to GitHub Pages. The repository's Pages source must be set to "GitHub Actions".
