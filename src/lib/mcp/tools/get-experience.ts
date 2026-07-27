import { defineTool } from "@lovable.dev/mcp-js";

const experience = [
  {
    role: "DevOps Engineer (Azure)",
    client: "Follett Corporation",
    employer: "Tata Consultancy Services (TCS)",
    location: "Hyderabad, India",
    highlights: [
      "Supported Azure cloud infrastructure and DevOps operations.",
      "Built and maintained CI/CD pipelines for application deployments.",
      "Automated operational workflows and deployment processes.",
      "Implemented monitoring and observability solutions.",
      "Collaborated with dev and ops teams to improve release efficiency and platform reliability.",
    ],
  },
  {
    role: "Cloud & DevOps Engineer",
    client: "Wedbush Securities",
    employer: "Tata Consultancy Services (TCS)",
    highlights: [
      "Supported migration from on-premises infrastructure to Microsoft Azure.",
      "Assisted in cloud setup, deployment, and migration activities.",
      "Helped ensure minimal downtime during migration initiatives.",
      "Contributed to cloud adoption and modernization efforts.",
    ],
  },
  {
    role: "Cloud & DevOps Engineer",
    employer: "Tata Consultancy Services (TCS)",
    period: "June 2022 – July 2025",
  },
];

export default defineTool({
  name: "get_experience",
  title: "Get work experience",
  description:
    "Returns Shakeer's professional work experience: roles, clients, employers, and key responsibilities.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(experience, null, 2) }],
    structuredContent: { experience },
  }),
});
