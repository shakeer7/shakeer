import { defineTool } from "@lovable.dev/mcp-js";

const projects = [
  {
    name: "OpenSRE",
    role: "Contributor",
    description:
      "Open-source Site Reliability Engineering community project by Tracer Cloud.",
    url: "https://github.com/Tracer-Cloud/opensre",
  },
  {
    name: "GitHub Portfolio",
    description: "Personal GitHub with DevOps, IaC, and automation projects.",
    url: "https://github.com/shakeer7",
  },
];

export default defineTool({
  name: "get_projects",
  title: "Get projects",
  description:
    "Returns Shakeer's public projects and open-source contributions with GitHub links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    structuredContent: { projects },
  }),
});
