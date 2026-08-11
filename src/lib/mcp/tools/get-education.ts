import { defineTool } from "@lovable.dev/mcp-js";

const education = [
  {
    program: "Executive Program in Applied Business Analytics",
    institution: "Indian School of Business (ISB)",
    expected: "July 2026",
  },
  {
    program: "MBA (PG) — Business Operations & Analytics",
    institution: "CBIT, Hyderabad",
    period: "2025 – Present",
  },
  {
    program: "B.Tech in Electrical and Electronics Engineering (EEE)",
    institution: "SR University, Warangal",
    period: "2019 – 2022",
  },
];

const certifications = [
  "McKinsey.org Forward Program — McKinsey & Company (Jun 2026)",
  "Microsoft Certified: Azure Administrator Associate (AZ-104)",
  "Microsoft Certified: Azure Fundamentals (AZ-900)",
  "Python — HackerRank (Mar 2022)",
  "Claude 101 — Anthropic (Apr 2026)",
  "SQL — Udemy (Jan 2026)",
  "Scrum Fundamentals Certified (SFC) — SCRUMstudy (Apr 2026)",
];

export default defineTool({
  name: "get_education_and_certifications",
  title: "Get education and certifications",
  description:
    "Returns Shakeer's education history and professional certifications.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      { type: "text", text: JSON.stringify({ education, certifications }, null, 2) },
    ],
    structuredContent: { education, certifications },
  }),
});
