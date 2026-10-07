export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Used by BOTH the visible <FaqSection /> and the FAQPage JSON-LD in layout.tsx.
 * Google requires structured-data answers to match on-page content.
 */
export const FAQS: FaqItem[] = [
  {
    question: "Who owns the source code and intellectual property of my custom software?",
    answer:
      "You do — 100%. Every DukaTrio project ends with a complete handover: the full Git repository, Docker configuration, database schema and server access. There are no recurring platform fees, locked themes or royalties, and no vendor lock-in.",
  },
  {
    question: "Why choose bespoke Next.js development over WordPress or off-the-shelf SaaS?",
    answer:
      "Bespoke Next.js and React applications deliver sub-400ms load times, strict TypeScript type safety, role-based access control and a codebase that fits your exact workflow. Template and plugin stacks are slower, harder to secure and become more expensive per seat as your team grows.",
  },
  {
    question: "How much does a custom web application or client portal cost?",
    answer:
      "Most projects fall between a focused MVP and a full enterprise platform. Use the interactive Scope & Cost Estimator on this page to get a fixed-milestone price bracket and delivery timeline in under a minute — with no hidden surcharges.",
  },
  {
    question: "How long does it take to build a custom client portal or SaaS platform?",
    answer:
      "A focused MVP portal typically ships in a few weeks, while multi-role enterprise platforms follow a fixed 3-stage protocol: Discovery & Blueprint, Implementation Sprints with live staging previews, and Cutover & Handoff with a post-launch warranty.",
  },
  {
    question: "Do you host and maintain the software after launch?",
    answer:
      "Yes, if you want. We deploy to dedicated European Linux infrastructure with automated TLS, HTTP/3, zero-downtime releases and offsite backups. You can also take full control and host it yourself — the handover includes everything required.",
  },
  {
    question: "Can you build industry-specific platforms such as construction or fintech systems?",
    answer:
      "Yes. Our live production platforms include Gradilište Dukatrio, a construction management OS with digital site diaries, worker attendance and a fixed EUR/RSD payroll engine, and FundingSolutions, a commercial capital underwriting and client portal system.",
  },
  {
    question: "Do you work with clients in Serbia and across Europe?",
    answer:
      "Yes. DukaTrio is based in Belgrade and delivers custom software, web applications and SaaS platforms for clients in Serbia, the EU and worldwide, with communication in English and Serbian (srpski).",
  },
];
