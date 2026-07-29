import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Azure DevOps vs GitHub Actions: CI/CD Compared (2026)";
const DESCRIPTION =
  "A practical comparison of Azure DevOps and GitHub Actions for CI/CD: pipelines, Azure integration, self-hosted runners, governance, pricing and developer experience.";
const URL = "https://shakeer.online/azure-devops-vs-github-actions";

export const Route = createFileRoute("/azure-devops-vs-github-actions")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          author: { "@type": "Person", name: "Shakeer Mohammed", url: "https://shakeer.online" },
          mainEntityOfPage: URL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is GitHub Actions replacing Azure DevOps?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Microsoft continues to support Azure DevOps, but new investment is focused on GitHub. Most greenfield teams start on GitHub Actions, while large enterprises keep Azure DevOps for Boards, Artifacts and mature governance.",
              },
            },
            {
              "@type": "Question",
              name: "Which is better for deploying to Azure?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Both deploy to Azure well. Azure DevOps offers richer built-in release gates and environments; GitHub Actions uses OIDC federated credentials with the azure/login action, which avoids storing long-lived secrets.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use both together?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. A common pattern is source and CI in GitHub Actions, with Azure DevOps used for Boards, Artifacts feeds, or regulated release approvals.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: ComparisonGuide,
});

const rows: { area: string; ado: string; gha: string }[] = [
  {
    area: "Pipeline definition",
    ado: "YAML pipelines (plus legacy Classic UI editor)",
    gha: "YAML workflows only, stored in .github/workflows",
  },
  {
    area: "Azure integration",
    ado: "Native service connections, environments, deployment gates",
    gha: "azure/login with OIDC federated credentials — no stored secrets",
  },
  {
    area: "Reusability",
    ado: "Templates, task groups, extensions from the Marketplace",
    gha: "Composite/reusable workflows and a very large Actions marketplace",
  },
  {
    area: "Runners / agents",
    ado: "Microsoft-hosted agents, self-hosted agent pools",
    gha: "GitHub-hosted runners, self-hosted and ARC runners on Kubernetes",
  },
  {
    area: "Approvals & governance",
    ado: "Mature environment approvals, checks, branch policies",
    gha: "Environment protection rules, required reviewers, rulesets",
  },
  {
    area: "Work tracking & artifacts",
    ado: "Boards, Repos, Test Plans, Artifacts in one suite",
    gha: "Issues/Projects, Packages; test tooling comes from the ecosystem",
  },
  {
    area: "Pricing model",
    ado: "Per parallel job, free tier for public projects",
    gha: "Per runner minute, free minutes on public repos",
  },
];

function ComparisonGuide() {
  return (
    <main className="min-h-screen py-20">
      <article className="container-tight max-w-3xl">
        <Link to="/" className="text-sm text-primary hover:underline">
          ← Back to portfolio
        </Link>

        <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Azure DevOps vs GitHub Actions: choosing a CI/CD platform
        </h1>
        <p className="mt-4 text-muted-foreground">
          I have run production pipelines on both platforms across Azure and AWS environments. This
          guide compares them on the things that actually decide the choice: pipeline authoring,
          Azure integration, runners, governance and cost.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">Side-by-side comparison</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl glass p-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-3 font-semibold text-foreground">Area</th>
                <th className="p-3 font-semibold text-foreground">Azure DevOps</th>
                <th className="p-3 font-semibold text-foreground">GitHub Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.area} className="border-t border-white/10 align-top">
                  <td className="p-3 font-medium text-foreground">{r.area}</td>
                  <td className="p-3 text-muted-foreground">{r.ado}</td>
                  <td className="p-3 text-muted-foreground">{r.gha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">CI/CD features</h2>
        <p className="mt-3 text-muted-foreground">
          Azure DevOps separates build and release stages with a long history of enterprise release
          management: multi-stage YAML, deployment jobs with strategies such as rolling and canary,
          and environment checks that can query Azure Monitor before promoting. GitHub Actions is
          event-driven — anything in the repository lifecycle can trigger a workflow — which makes
          it excellent for pull-request automation, matrix builds and repository governance.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">Integration with Azure</h2>
        <p className="mt-3 text-muted-foreground">
          Azure DevOps service connections remain the smoothest path for teams that need scoped,
          audited access to many subscriptions. GitHub Actions closed most of the gap with OIDC:
          register a federated credential on a user-assigned managed identity or app registration
          and <code>azure/login</code> exchanges a short-lived token, so no client secret is ever
          stored. For Kubernetes delivery, both hand off cleanly to Helm and Argo CD, which is the
          pattern I prefer — CI builds and publishes the image, GitOps owns the cluster state.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">Developer experience</h2>
        <p className="mt-3 text-muted-foreground">
          GitHub Actions wins on iteration speed: workflows live next to the code, the marketplace
          covers most tasks, and logs and reruns are one click from the pull request. Azure DevOps
          wins when a single tool must cover boards, repos, artifact feeds, test plans and
          compliance reporting for a large organisation.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">Which should you pick?</h2>
        <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
          <li>Code already on GitHub, small to mid-sized team → GitHub Actions.</li>
          <li>Heavy release governance, Boards and Artifacts in use → stay on Azure DevOps.</li>
          <li>Migrating? Move CI first, keep Azure DevOps releases until parity is proven.</li>
          <li>Regulated enterprise on Azure → both work; decide on audit and approval needs.</li>
        </ul>

        <p className="mt-12 text-sm text-muted-foreground">
          Written by Shakeer Mohammed, DevOps / Cloud Engineer.{" "}
          <Link to="/" className="text-primary hover:underline">
            See my experience and projects →
          </Link>
        </p>
      </article>
    </main>
  );
}
