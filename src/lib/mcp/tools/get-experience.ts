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
        client: "Client: US-based Education Services",
        highlights: [
          "3+ years of hands-on experience in Azure Administration and Azure DevOps, delivering secure, scalable, and highly available cloud infrastructure for enterprise applications",
          "Designed, built, and maintained 20+ Azure DevOps CI/CD pipelines, reducing deployment time by 70% and enabling faster, reliable software releases",
          "Automated infrastructure provisioning using Terraform (Infrastructure as Code), reducing manual effort by 80% and ensuring consistent, repeatable deployments across environments",
          "Provisioned, configured, and administered 100+ Azure resources, including Virtual Machines (Linux: Ubuntu, RHEL; Windows Server 2016/2019), VNets, NSGs, Storage Accounts, Public IPs, Load Balancers, and Virtual Disks",
          "Deployed, managed, and troubleshot containerized applications on Azure Kubernetes Service (AKS) using Docker, improving application scalability, availability, and resource utilization",
          "Automated server provisioning, configuration management, and application deployments using Ansible Playbooks, significantly reducing configuration drift and manual intervention",
          "Implemented proactive monitoring, logging, and alerting using Azure Monitor, Log Analytics, Application Insights, and KQL, reducing Mean Time to Resolution (MTTR) by 40%",
          "Configured and managed Azure Active Directory (Azure AD), RBAC, Key Vault, Traffic Manager, and Load Balancers to implement enterprise-grade identity management, secure access control, and high availability",
          "Developed automation scripts using PowerShell, Azure CLI, and YAML to streamline operational tasks, infrastructure management, and deployment workflows",
          "Managed source code using Git with feature branching, pull requests, code reviews, and integrated automated build validation within Azure DevOps pipelines",
          "Administered Azure Networking components including VNets, Subnets, NSGs, Route Tables, Private Endpoints, DNS, and Storage Replication (LRS/GRS/ZRS) to ensure secure and resilient cloud connectivity",
          "Worked with Azure Web Apps, App Service deployments, and deployment slots to support zero-downtime application releases",
          "Collaborated with cross-functional Agile teams, participating in sprint planning, release management, incident resolution, and production support while consistently achieving 99.9% service availability",
          "Performed infrastructure monitoring, root cause analysis (RCA), troubleshooting, and performance optimization to improve system stability, security, and operational efficiency",
        ],
      },
      {
        role: "Cloud & DevOps Engineer",
        client: "Client: US-based Financial Services",
        highlights: [
          "Led the end-to-end migration of on-premises infrastructure to Microsoft Azure, covering workload assessment, replication, phased cutover and post-migration validation",
          "Provisioned and managed cloud infrastructure using Azure Bicep (Infrastructure as Code), enabling repeatable, consistent deployments of resource groups, VNets, storage, compute and networking components",
          "Designed, built and maintained CI/CD pipelines in Azure DevOps to automate build, test and deployment of migrated workloads across dev, test and production environments",
          "Established secure hybrid connectivity between the on-premises datacenter and Azure (VPN gateway, VNets, NSGs) to support phased workload migration",
          "Planned and executed cutover windows with rollback strategies, ensuring minimal downtime and zero data loss during migration initiatives",
          "Assisted in cloud setup, deployment, and migration activities while modernizing legacy server workloads onto Azure",
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
