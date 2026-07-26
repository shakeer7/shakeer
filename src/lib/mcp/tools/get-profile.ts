import { defineTool } from "@lovable.dev/mcp-js";

const profile = {
  name: "Shakeer Mohammed",
  title: "DevOps / Cloud Engineer | MLOps Enthusiast",
  location: "Hyderabad, India",
  email: "mds.shakeer@gmail.com",
  links: {
    github: "https://github.com/shakeer7",
    linkedin: "https://www.linkedin.com/in/shakeer-mohammed-384b741a2/",
    opensre: "https://github.com/Tracer-Cloud/opensre",
    website: "https://shakeer.lovable.app",
  },
  about:
    "Cloud & DevOps Engineer with 3+ years of experience designing, automating, and managing cloud infrastructure, CI/CD pipelines, containerized apps, and IaC on Azure and AWS. Expanding into MLOps, Platform Engineering, and AI-driven infrastructure automation.",
  mission:
    "To build scalable, secure, and automated cloud platforms that enable organizations to deliver software faster, improve reliability, and drive innovation through modern engineering practices.",
};

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Returns Shakeer Mohammed's public professional profile: name, title, location, contact email, and social/portfolio links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
    structuredContent: profile,
  }),
});
