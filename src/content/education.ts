import type { EducationItem } from "./types";

export const education: EducationItem[] = [
  {
    school: "University of California, San Diego",
    period: "Sep 2026 – Dec 2026",
    degree: "Exchange Student, Electrical and Computer Engineering",
    logo: "/images/schools/ucsd.webp",
  },
  {
    school: "National Taiwan University",
    period: "Aug 2023 – Jun 2027 (expected)",
    degree: "B.S. in Electrical Engineering, Double Major in Physics · GPA 4.12/4.30",
    details: [
      "Coursework: Machine Learning, Deep Learning, Computer Vision, Probability and Statistics, Linear Algebra, Signals and Systems",
    ],
    logo: "/images/schools/ntu.webp",
  },
  {
    school: "National Yang Ming Chiao Tung University",
    period: "Aug 2022 – Jun 2023",
    degree: "Short-Term Student, Taichung First Senior High School Science Program",
    details: ["Took the program’s 12th-grade coursework at NYCU."],
    logo: "/images/schools/nycu.webp",
  },
  {
    school: "Taichung First Senior High School",
    period: "Aug 2020 – Jun 2023",
    degree: "Science Program",
    logo: "/images/schools/tcfsh.webp",
  },
];
