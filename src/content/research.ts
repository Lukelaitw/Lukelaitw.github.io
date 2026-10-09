import type { ResearchItem } from "./types";

export const research: ResearchItem[] = [
  {
    lab: "Spatiotemporal Machine Learning Lab",
    org: "UC San Diego",
    period: "Sep 2026 – Present",
    advisor: { label: "Prof. Rose Yu", href: "https://roseyu.com/" },
    description:
      "Designing a spatiotemporal forecasting benchmark that evaluates where, when, and how real-world events affect economic regions connected by a graph. Curated 22 economic and financial time-series sources and built a USDA grain-logistics graph with 19 markets and 36 state-to-port edges.",
  },
  {
    lab: "MAGICS Lab",
    org: "Northwestern University",
    period: "Oct 2025 – Present",
    advisor: { label: "Prof. Han Liu", href: "https://magics.cs.northwestern.edu" },
    note: "Remote",
    description:
      "Developing PyTorch generative models that predict single-cell gene-expression responses to genetic perturbations, and studying the optimal mix of synthetic and real training data. Built a sparse-matrix QC and donor-level aggregation pipeline across 2 studies (25,690 selected cells, 20,889 shared genes).",
  },
  {
    lab: "Wireless Mobile Network Lab",
    org: "National Taiwan University",
    period: "Feb 2025 – Present",
    advisor: { label: "Prof. Hung-Yu Wei", href: "https://wmnlab.ee.ntu.edu.tw/index.html" },
    description:
      "Developing deep generative models that synthesize wireless time-series data for digital twins. Built 199,567 overlapping sequence windows from 791 wireless trace files and adapted TimeVAE for wireless data synthesis.",
  },
  {
    lab: "Vision and Learning Lab",
    org: "National Taiwan University",
    period: "Sep 2025 – Feb 2026",
    advisor: { label: "Prof. Yu-Chiang Wang", href: "https://vllab.ee.ntu.edu.tw" },
    description:
      "Surveyed video diffusion-based world models, analyzing how architectures support autoregressive rollout and spatial memory.",
  },
];
