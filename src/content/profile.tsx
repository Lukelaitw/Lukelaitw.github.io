import type { Profile } from "./types";

const cvPath = "/cv/Yu-Heng_Lai_CV.pdf";

export const profile: Profile = {
  name: "Yu-Heng Lai",
  cvPath,
  bio: (
    <>
      <p>
        I’m a senior undergraduate at <a href="https://www.ntu.edu.tw/english/">National Taiwan University</a>,
        majoring in Electrical Engineering with a double major in Physics. During Fall 2026, I’m an exchange
        student in Electrical and Computer Engineering at <a href="https://ucsd.edu/">UC San Diego</a>.
      </p>
      <p>
        My research interests lie in <b>generative modeling</b> and{" "}
        <b>machine learning for spatiotemporal and scientific data</b>. I currently work with{" "}
        <a href="https://roseyu.com/">Prof. Rose Yu</a> (UC San Diego) on context-aware spatiotemporal
        forecasting, <a href="https://magics.cs.northwestern.edu">Prof. Han Liu</a> (Northwestern) on generative
        models for single-cell perturbations, and{" "}
        <a href="https://wmnlab.ee.ntu.edu.tw/index.html">Prof. Hung-Yu Wei</a> (NTU) on generative models for
        wireless time series.
      </p>
      <p>
        I also enjoy building end-to-end ML systems, from LLM-powered analytics platforms to real-time
        brain–computer interfaces.
      </p>
    </>
  ),
  links: [
    { label: "Email", href: "mailto:b12901075@ntu.edu.tw" },
    { label: "CV", href: cvPath },
    { label: "GitHub", href: "https://github.com/Lukelaitw" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lukelaitw/" },
  ],
};
