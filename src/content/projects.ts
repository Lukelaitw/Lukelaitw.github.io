import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "Semiconductor Intelligence Platform",
    award: "3rd Place, 2026 TSMC IT CareerHack (Group B)",
    period: "Feb 2026",
    description:
      "An AI assistant for semiconductor supply-chain insights. LLM pipelines turn 300+ news articles and 100 earnings-call transcripts into summaries and risk profiles for 20 companies; a Vertex AI agent with 4 retrieval tools over BigQuery and Cloud Storage answers company-grounded questions.",
    tags: ["Next.js", "TypeScript", "Python", "Vertex AI", "BigQuery"],
    links: [
      { label: "Code", href: "https://github.com/Lukelaitw/Careerhack_hackathon" },
      {
        label: "Sample Report",
        href: "https://github.com/Lukelaitw/Careerhack_hackathon/blob/main/Reports/B5_TSMC.pdf",
      },
      {
        label: "Award",
        href: "https://github.com/Lukelaitw/Careerhack_hackathon/blob/main/assets/careerhack_award_certificate_2026.png",
      },
    ],
    thumbnail: {
      kind: "image",
      src: "/images/projects/careerhack.webp",
      alt: "Company dashboard of the Semiconductor Intelligence Platform with financial trend charts",
      full: { src: "/images/projects/full/careerhack.webp", width: 1600, height: 911 },
    },
  },
  {
    title: "Tightrope Balance: Real-Time EEG Game Control",
    award: "First Prize, NTU BME Lab Final Project",
    period: "Dec 2025",
    description:
      "A brain–computer interface game. A CNN-Transformer (CTNet) classifies focus vs. relaxation from 500 Hz EEG, reaching 71.3% mean leave-one-subject-out accuracy across 35 subjects (baseline 55.1%), and streams predictions over TCP to steer a physics-based balance game.",
    tags: ["PyTorch", "Python", "TCP Sockets"],
    links: [
      { label: "Project Page", href: "https://lukelaitw.github.io/2025_Fall_NTUEE_BMELAB_Final.github.io/" },
      { label: "Code", href: "https://github.com/Lukelaitw/114-1_BME_LAB_Final_Project_G5" },
    ],
    thumbnail: {
      kind: "image",
      src: "/images/projects/bci.webp",
      alt: "Title screen of the Tightrope Balance game",
      full: { src: "/images/projects/full/bci.webp", width: 1600, height: 906 },
    },
  },
  {
    title: "EEG-Based Dementia Classification",
    period: "Sep 2025 – Jan 2026",
    description:
      "Classifies Alzheimer’s disease, frontotemporal dementia, and healthy controls from 19-channel EEG of 88 subjects. A two-stage SVM on graph-signal features reached 74.1% accuracy and 0.767 macro ROC-AUC on a 27-subject test set, benchmarked against random forest, logistic regression, and a CNN-Transformer.",
    tags: ["scikit-learn", "PyTorch", "MNE", "PyGSP"],
    links: [
      {
        label: "Code",
        href: "https://github.com/Lukelaitw/Special-Topics-in-Innovative-Integration-of-Medicine-and-EECS-I-2025fall",
      },
      {
        label: "Results",
        href: "https://github.com/Lukelaitw/Special-Topics-in-Innovative-Integration-of-Medicine-and-EECS-I-2025fall/blob/main/asset/two_stage_results/SVM/evaluation_metrics.txt",
      },
    ],
    thumbnail: {
      kind: "image",
      src: "/images/projects/eeg.webp",
      alt: "Per-class Grad-CAM EEG scalp maps for Alzheimer’s disease, controls, and frontotemporal dementia",
      fit: "contain",
      full: { src: "/images/projects/full/eeg.webp", width: 1600, height: 541 },
    },
  },
  {
    title: "Biomedical Signal Acquisition App",
    period: "Sep 2025 – Jan 2026",
    description:
      "A Flutter app that streams Arduino ECG/EMG measurements over Bluetooth Low Energy and displays live waveforms with heart-rate estimation.",
    tags: ["Flutter", "Dart", "Arduino", "BLE"],
    links: [{ label: "Code", href: "https://github.com/Lukelaitw/114-1_BME_Exp2_group_5" }],
    thumbnail: { kind: "ecg" },
  },
  {
    title: "Smart Drawing Machine",
    award: "Best Popularity Award",
    period: "Mar – Jun 2024",
    description:
      "A web app that converts sketches and Raspberry Pi camera photos into G-code through a custom JPG → SVG → G-code pipeline, then drives a pen plotter via Universal G-code Sender.",
    tags: ["Python", "JavaScript", "Raspberry Pi"],
    links: [
      { label: "Web App", href: "https://lukelaitw.github.io/carcarclass.github.io/" },
      { label: "Demo Video", href: "https://youtu.be/VoTIUAAcsV8" },
      { label: "Code", href: "https://github.com/Lukelaitw/carcarclass.github.io" },
    ],
    thumbnail: {
      kind: "image",
      src: "/images/projects/drawing.webp",
      alt: "Pen-plotter hardware of the smart drawing machine with a Raspberry Pi",
      full: { src: "/images/projects/full/drawing.webp", width: 800, height: 600 },
    },
  },
];
