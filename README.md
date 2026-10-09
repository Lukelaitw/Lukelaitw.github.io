# lukelaitw.github.io

Source of my personal website, https://lukelaitw.github.io. It is a Next.js site exported as static HTML and deployed to GitHub Pages by GitHub Actions on every push to `master`.

## Local development

Requires Node.js 20.9 or later (CI uses Node 22).

```bash
npm install
npm run dev       # http://localhost:3000 with hot reload
npm run lint      # ESLint
npm run build     # static export into out/
npm run check     # structural checks on out/
npm run preview   # serve out/ at http://localhost:3000 (needs python3)
```

## Editing content

Page content lives in `src/content/`, and components in `src/components/` handle layout. A few fixed strings live elsewhere: section headings and small labels (such as "Advisor:" and the footer text) in `src/components/`, nav labels in `src/app/page.tsx`, and the page title and search/social description in `src/app/layout.tsx`. Update that description when the bio in `profile.tsx` changes.

| File | Content |
| --- | --- |
| `profile.tsx` | Name, intro paragraphs, and the Email / CV / GitHub / LinkedIn links |
| `news.tsx` | News items, newest first |
| `publications.ts` | Publications. The section and its nav link appear once this list is non-empty. |
| `research.ts` | Research positions |
| `projects.ts` | Projects. Image thumbnails are 720×448 WebP files in `public/images/projects/`; the BLE app uses an inline SVG illustration (`kind: "ecg"`). |
| `education.ts`, `skills.ts` | Education and Skills |

To add an entry, copy an existing object in the relevant file and edit it:

- **News:** add `{ date: "Mon YYYY", text: "..." }` at the top of `news.tsx`. Keep dates short. Wrap the text in `<>...</>` to use `<b>` or links.
- **Publication:** add an object to `publications.ts` following the commented example. Write your name exactly as `Yu-Heng Lai` in `authors` so it is shown in bold.
- **Project:** add an object to `projects.ts`. Image thumbnails need a non-empty `alt`.

Run `npm run build && npm run check` before pushing. To guard against an unpublished name, run `FORBIDDEN_TERMS="<name>" npm run check`; the check fails if the name (case-insensitive) appears in any text file in `out/` (.html, .txt, .js, .css, .json, .svg, .xml). It does not read the CV PDF, so check that as described under Updating the CV.

## Updating the CV

The site serves `public/cv/Yu-Heng_Lai_CV.pdf`, a web copy of the research resume without unpublished project names. After changing the resume:

1. Apply the same change to `resume_research_web.tex`, which sits next to the original `.tex` outside this repository, keeping unpublished project names out.
2. Compile it with `pdflatex resume_research_web.tex`.
3. Check that the PDF is one page and contains no unpublished names: `pdfinfo resume_research_web.pdf | grep Pages` should report 1 page, and each of `pdftotext resume_research_web.pdf - | grep -ci "<name>"`, `pdfinfo resume_research_web.pdf | grep -ci "<name>"`, and `pdfinfo -url resume_research_web.pdf | grep -ci "<name>"` (link targets) should print `0`.
4. Copy the PDF to `public/cv/Yu-Heng_Lai_CV.pdf` and push.

## Deployment

`.github/workflows/deploy.yml` runs `npm ci`, lint, build, and check, then deploys `out/` to GitHub Pages. The repository's Pages source must be set to "GitHub Actions".
