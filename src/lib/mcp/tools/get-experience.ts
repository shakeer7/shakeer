import { defineTool } from "@lovable.dev/mcp-js";

const experience = [
  {
    role: "Cloud & DevOps Engineer",
    employer: "Tata Consultancy Services (TCS)",
    location: "Hyderabad, India",
    period: "June 2022 – July 2025",
    clients: [
      {
        role: "DevOps Engineer (Azure)",
        client: "Follett Corporation",
        highlights: [
          "Built and maintained CI/CD pipelines for application deployments.",
          "Automated operational workflows and deployment processes across the environment.",
          "Implemented monitoring and observability solutions using Datadog.",
        ],
      },
      {
        role: "Cloud & DevOps Engineer",
        client: "Wedbush Securities",
        highlights: [
          "Supported migration from on-premises infrastructure to Microsoft Azure.",
          "Assisted in cloud setup, deployment, and migration activities.",
          "Helped ensure minimal downtime during migration initiatives.",
        ],
      },
    ],
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
