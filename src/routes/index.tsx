import { createFileRoute } from "@tanstack/react-router";
import {
  Cloud,
  Server,
  Container,
  GitBranch,
  Code,
  Monitor,
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Github,
  Linkedin,
  ChevronDown,
  ExternalLink,
  ArrowRight,
  Zap,
  Eye,
  LayoutGrid,
  Cpu,
  Database,
  FileCode,
  Globe,
  Shield,
  Rocket,
  Clock,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import profileImg from "../assets/shakeer-portrait.jpg.asset.json";
import { useEffect, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/shakeer-mohammed-384b741a2/";

type Theme = "light" | "dark" | "system";

const themeOptions: { value: Theme; label: string; icon: ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun className="w-3.5 h-3.5" /> },
  { value: "dark", label: "Dark", icon: <Moon className="w-3.5 h-3.5" /> },
  { value: "system", label: "System", icon: <Laptop className="w-3.5 h-3.5" /> },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("shakeer-theme") as Theme | null;
      if (stored) setTheme(stored);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const systemDark = media.matches;
      const isDark = theme === "dark" || (theme === "system" && systemDark);
      root.classList.toggle("dark", isDark);
    };
    apply();
    try {
      localStorage.setItem("shakeer-theme", theme);
    } catch {
      // ignore
    }
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, mounted]);

  return (
    <div
      className="inline-flex items-center rounded-full glass p-1 gap-0.5"
      aria-label="Theme selector"
      role="group"
    >
      {themeOptions.map((option) => {
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-white/20"
            }`}
            title={`${option.label} mode`}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );

}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="container-tight flex items-center justify-between h-16">
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          SM
        </a>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="mailto:mds.shakeer@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Get in Touch</span>
          </a>
        </div>
      </div>
    </nav>
  );
}


function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft glow accents only — aurora shows through */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-hero-glow)_0%,_transparent_60%)] opacity-30" />


      <div className="container-tight relative z-10 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground mb-6">
              <Zap className="w-4 h-4 text-skill-icon" />
              Available for opportunities
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Shakeer Mohammed — DevOps &amp; Cloud Engineer
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-medium text-primary">
              DevOps Engineer (Azure) | Cloud Engineer | MLOps Enthusiast
            </p>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Building scalable, secure, and automated cloud platforms that accelerate software delivery and drive operational excellence.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="mailto:mds.shakeer@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
              <a
                href="https://github.com/shakeer7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass glass-pill-hover px-6 py-3 text-base font-medium text-foreground transition-all"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass glass-pill-hover px-6 py-3 text-base font-medium text-foreground transition-all"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Hyderabad, India
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                mds.shakeer@gmail.com
              </span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-2xl" />
              <div className="absolute inset-0 rounded-full glass-strong p-2">
                <div className="w-full h-full rounded-full overflow-hidden ring-1 ring-white/40">
                  <img
                    src={profileImg.url}
                    alt="Shakeer Mohammed"
                    className="w-full h-full object-cover object-top"
                    width={320}
                    height={320}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">About Me</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Passionate about cloud, automation & reliability
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Cloud & DevOps Engineer with <strong className="text-foreground">3+ years</strong> of experience in designing, automating, and managing cloud infrastructure, CI/CD pipelines, containerized applications, and Infrastructure as Code solutions.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Experienced in <strong className="text-foreground">Azure and AWS</strong> cloud environments, with hands-on expertise in Kubernetes, Docker, Terraform, GitHub Actions, Jenkins, and automation. Currently expanding expertise in <strong className="text-foreground">MLOps, Platform Engineering, and AI-driven infrastructure automation</strong>.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Strong advocate of DevOps culture, continuous improvement, knowledge sharing, and delivering measurable business value through technology.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Github className="w-4 h-4" />
            <a
              href="https://github.com/shakeer7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              github.com/shakeer7
            </a>
            <span className="mx-2">·</span>
            <ExternalLink className="w-4 h-4" />
            <a
              href="https://github.com/Tracer-Cloud/opensre"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              OpenSRE Contributor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const skillCategories = [
  {
    title: "Cloud Platforms",
    icon: Cloud,
    skills: ["Microsoft Azure", "Amazon Web Services (AWS)"],
  },
  {
    title: "DevOps & Automation",
    icon: GitBranch,
    skills: ["Azure DevOps", "GitHub Actions", "Jenkins", "CI/CD Pipelines", "Infrastructure as Code (Terraform)"],
  },
  {
    title: "Containers & Orchestration",
    icon: Container,
    skills: ["Docker", "Kubernetes"],
  },
  {
    title: "Monitoring & Observability",
    icon: Monitor,
    skills: ["Datadog", "Prometheus", "Grafana"],
  },
  {
    title: "Programming & Scripting",
    icon: Code,
    skills: ["Python", "Bash"],
  },
  {
    title: "Version Control",
    icon: Database,
    skills: ["Git", "GitHub"],
  },
];

function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Core Skills</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Technologies & Tools
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A robust toolkit built across cloud platforms, automation, containers, and observability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="group rounded-2xl glass p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                  <cat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{cat.title}</h3>
              </div>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const experiences = [
  {
    title: "DevOps Engineer (Azure)",
    company: "London Stock Exchange Group (LSEG)",
    org: "Tata Consultancy Services (TCS)",
    location: "Hyderabad, India",
    period: "2022 – 2025",
    highlights: [
      "Supported Azure cloud infrastructure and DevOps operations",
      "Built and maintained CI/CD pipelines for application deployments",
      "Automated operational workflows and deployment processes",
      "Implemented monitoring and observability solutions",
      "Collaborated with development and operations teams to improve release efficiency and platform reliability",
    ],
  },
  {
    title: "Cloud & DevOps Engineer",
    company: "Wedbush Securities",
    org: "Tata Consultancy Services (TCS)",
    location: "",
    period: "",
    highlights: [
      "Supported migration from on-premises infrastructure to Microsoft Azure",
      "Assisted in cloud setup, deployment, and migration activities",
      "Helped ensure minimal downtime during migration initiatives",
      "Contributed to cloud adoption and modernization efforts",
    ],
  },
];

function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Professional Experience</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Work History
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering cloud and DevOps solutions for global financial institutions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-8 md:pl-0">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border" />
              <div className="hidden md:flex absolute -left-3 top-1 w-6 h-6 items-center justify-center rounded-full bg-primary/10 border-2 border-primary">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <div className="md:ml-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <p className="text-base font-medium text-primary">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.org}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                    <Clock className="w-4 h-4" />
                    {exp.period || "2022 – 2025"}
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-start gap-2.5 text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* TCS summary */}
          <div className="relative pl-8 md:pl-0">
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border" />
            <div className="hidden md:flex absolute -left-3 top-1 w-6 h-6 items-center justify-center rounded-full bg-secondary border-2 border-border">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
            </div>
            <div className="md:ml-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Cloud & DevOps Engineer</h3>
                  <p className="text-base font-medium text-primary">Tata Consultancy Services (TCS)</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                  <Clock className="w-4 h-4" />
                  June 2022 – July 2025
                </div>
              </div>
              <p className="text-muted-foreground">
                Full tenure at TCS delivering DevOps and cloud engineering solutions across multiple client engagements including LSEG and Wedbush Securities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    name: "OpenSRE",
    description:
      "Open-source Site Reliability Engineering toolkit by Tracer Cloud. Contributing to community-driven SRE tooling and best practices.",
    url: "https://github.com/Tracer-Cloud/opensre",
    tags: ["SRE", "Open Source", "Community"],
  },
  {
    name: "GitHub Portfolio",
    description:
      "Collection of DevOps automation scripts, Terraform modules, Kubernetes manifests, and CI/CD pipeline templates.",
    url: "https://github.com/shakeer7",
    tags: ["DevOps", "IaC", "Automation"],
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Projects</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Open-source contributions and infrastructure projects on GitHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl glass p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                  <Github className="w-5 h-5" />
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full glass text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/shakeer7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass glass-pill-hover px-6 py-3 text-base font-medium text-foreground transition-all"
          >
            <Github className="w-5 h-5" />
            See all on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

const education = [
  {
    degree: "Executive Program in Applied Business Analytics",
    school: "Indian School of Business (ISB)",
    period: "Expected: March 2026",
    icon: LayoutGrid,
  },
  {
    degree: "MBA (PG)",
    school: "CBIT, Hyderabad",
    period: "2025 – Present",
    icon: GraduationCap,
  },
  {
    degree: "B.Tech in Electrical and Electronics Engineering (EEE)",
    school: "SR University, Warangal",
    period: "2019 – 2022",
    icon: Cpu,
  },
];

function EducationSection() {
  return (
    <section id="education" className="py-24">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Education</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Academic Background
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="rounded-2xl glass p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <edu.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-foreground leading-snug">{edu.degree}</h3>
              <p className="mt-2 text-sm font-medium text-primary">{edu.school}</p>
              <p className="mt-1 text-sm text-muted-foreground">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const certifications = [
  { name: "Microsoft Certified: Azure Administrator Associate (AZ-104)", icon: Cloud },
  { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", icon: Server },
];

function CertificationsSection() {
  return (
    <section id="certifications" className="py-24">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Certifications</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Verified Credentials
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-4 rounded-2xl glass p-5 transition-colors"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                <cert.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">Microsoft</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const interests = [
  { label: "DevOps", icon: GitBranch },
  { label: "Cloud Engineering", icon: Cloud },
  { label: "Kubernetes", icon: Container },
  { label: "Platform Engineering", icon: Server },
  { label: "MLOps", icon: Cpu },
  { label: "AI Infrastructure", icon: Zap },
  { label: "Automation", icon: Rocket },
  { label: "Site Reliability Engineering (SRE)", icon: Shield },
];

function InterestsSection() {
  return (
    <section className="py-24">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Areas of Interest</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            What Drives Me
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {interests.map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full glass glass-pill-hover px-4 py-2.5 text-sm font-medium text-foreground transition-all"
            >
              <item.icon className="w-4 h-4 text-primary" />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-hero-glow)_0%,_transparent_60%)] opacity-50" />
      <div className="container-tight relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8">
            <Rocket className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Mission
          </h2>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            To build scalable, secure, and automated cloud platforms that enable organizations to deliver software faster, improve reliability, and drive innovation through modern engineering practices.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:mds.shakeer@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
            <a
              href="https://github.com/shakeer7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass glass-pill-hover px-8 py-4 text-base font-medium text-foreground transition-all"
            >
              <Github className="w-5 h-5" />
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisitorStats() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);
  const [yourVisits, setYourVisits] = useState<number>(0);
  const [firstVisit, setFirstVisit] = useState<string>("");
  const [lastVisit, setLastVisit] = useState<string>("");

  useEffect(() => {
    // Per-visitor stats via localStorage
    try {
      const key = "shakeer_portfolio_visits";
      const raw = localStorage.getItem(key);
      const now = new Date().toISOString();
      const data = raw
        ? (JSON.parse(raw) as { count: number; first: string; last: string })
        : { count: 0, first: now, last: now };
      const next = { count: data.count + 1, first: data.first || now, last: now };
      localStorage.setItem(key, JSON.stringify(next));
      setYourVisits(next.count);
      setFirstVisit(new Date(next.first).toLocaleDateString());
      setLastVisit(
        data.last ? new Date(data.last).toLocaleDateString() : new Date(now).toLocaleDateString(),
      );
    } catch {
      setYourVisits(1);
    }

    // Global visit counter via free public counter API
    const controller = new AbortController();
    fetch("https://api.counterapi.dev/v1/shakeer-portfolio/site-visits/up", {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data: { count?: number }) => {
        if (typeof data.count === "number") setTotalVisits(data.count);
      })
      .catch(() => {
        // Silent fallback: keep null so UI shows a dash
      });

    return () => controller.abort();
  }, []);

  const stats = [
    {
      icon: Eye,
      label: "Total visits",
      value: totalVisits !== null ? totalVisits.toLocaleString() : "—",
      hint: "Site-wide counter",
    },
    {
      icon: Zap,
      label: "Your visits",
      value: yourVisits.toLocaleString(),
      hint: "Tracked in this browser",
    },
    {
      icon: Clock,
      label: "First visit",
      value: firstVisit || "Today",
      hint: "You first landed here",
    },
    {
      icon: Rocket,
      label: "Last visit",
      value: lastVisit || "Today",
      hint: "Your previous session",
    },
  ];

  return (
    <section className="py-16 border-t border-white/10">
      <div className="container-tight">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Portfolio Stats
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Thanks for stopping by — here's a snapshot of activity.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl glass p-5 hover:shadow-xl hover:shadow-primary/10 transition-all"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-foreground tabular-nums">{s.value}</div>
              <div className="text-sm font-medium text-foreground mt-1">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-foreground">Shakeer Mohammed</p>
            <p className="text-sm text-muted-foreground">DevOps & Cloud Engineer</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:mds.shakeer@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/shakeer7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Tracer-Cloud/opensre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="OpenSRE"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Shakeer Mohammed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen aurora-bg">
      <div className="aurora-layer" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <InterestsSection />
      <MissionSection />
      <VisitorStats />
      <Footer />
    </div>
  );
}


