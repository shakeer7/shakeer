import { defineTool } from "@lovable.dev/mcp-js";

const skills = {
  cloud: ["Microsoft Azure", "Amazon Web Services (AWS)"],
  devopsAutomation: [
    "Azure DevOps",
    "GitHub Actions",
    "Ansible",
    "CI/CD Pipelines",
    "Terraform (IaC)",
    "Azure Bicep",
  ],
  containers: ["Docker", "Kubernetes", "Helm", "Argo CD"],
  monitoring: ["Datadog", "Prometheus", "Grafana"],
  security: ["SonarQube", "Trivy", "OWASP ZAP", "Nuclei"],
  mlops: ["Python", "Pandas", "Scikit-learn", "MLflow", "DVC", "FastAPI"],
  languages: ["Python", "Bash"],
  versionControl: ["Git", "GitHub"],
  interests: [
    "DevOps",
    "Cloud Engineering",
    "Kubernetes",
    "Platform Engineering",
    "MLOps",
    "AI Infrastructure",
    "Automation",
    "SRE",
  ],
};

export default defineTool({
  name: "get_skills",
  title: "Get skills",
  description:
    "Returns Shakeer's technical skills grouped by category (cloud, DevOps/automation, containers, MLOps, security, monitoring, languages, version control, interests).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(skills, null, 2) }],
    structuredContent: skills,
  }),
});
