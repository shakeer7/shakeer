import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Cloud,
  Server,
  Container,
  GitBranch,
  Code,
  Monitor,
  Award,
  MapPin,
  Mail,
  Phone,
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
  Home,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import heroAnimeBg from "../assets/hero-anime-bg.jpg.asset.json";
import isbLogo from "../assets/isb-logo.png.asset.json";
import cbitLogo from "../assets/cbit-logo.png.asset.json";
import sruLogo from "../assets/sru-logo.png.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState, type ReactNode } from "react";


function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: React.ElementType;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const delayClass = delay ? ` reveal-delay-${delay}` : "";
  return <Tag ref={ref as never} className={`reveal${delayClass} ${className}`}>{children}</Tag>;
}

const SITE_URL = "https://shakeer.online";
const PERSON_ID = `${SITE_URL}/#person`;

const MONTHS: Record<string, string> = {
  January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
  July: "07", August: "08", September: "09", October: "10", November: "11", December: "12",
};

function toIsoMonth(value: string): string | undefined {
  const m = value.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return undefined;
  const month = MONTHS[m[1]];
  return month ? `${m[2]}-${month}` : undefined;
}

function parsePeriod(period: string): { startDate?: string; endDate?: string } {
  const [rawStart, rawEnd] = period.split(/[–-]/).map((p) => p.trim());
  return { startDate: toIsoMonth(rawStart ?? ""), endDate: toIsoMonth(rawEnd ?? "") };
}

const SKILL_KEYWORDS: Record<string, string> = {
  azure: "Microsoft Azure",
  "ci/cd": "CI/CD",
  pipeline: "CI/CD Pipelines",
  datadog: "Datadog",
  monitoring: "Monitoring & Observability",
  observability: "Monitoring & Observability",
  automat: "Automation",
  migration: "Cloud Migration",
  "on-premises": "Cloud Migration",
  deployment: "Deployment Automation",
};

function skillsFrom(highlights: string[]): string[] {
  const found = new Set<string>();
  for (const h of highlights) {
    const lower = h.toLowerCase();
    for (const [needle, skill] of Object.entries(SKILL_KEYWORDS)) {
      if (lower.includes(needle)) found.add(skill);
    }
  }
  return [...found];
}

function buildExperienceJsonLd() {
  const roles = experiences.flatMap((exp) => {
    const { startDate, endDate } = parsePeriod(exp.period);
    const employer = {
      "@type": "Organization",
      name: exp.company,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressCountry: "IN",
      },
    };

    return exp.clients.map((client) => ({
      "@type": "OrganizationRole",
      roleName: client.title,
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {}),
      description: client.highlights.join(". ") + ".",
      skills: skillsFrom(client.highlights),
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: exp.location.split(",")[0]?.trim(),
          addressCountry: "IN",
        },
      },
      worksFor: {
        ...employer,
        member: {
          "@type": "Organization",
          name: client.client,
          description: `Client engagement delivered through ${exp.company}`,
        },
      },
    }));
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: `${SITE_URL}/`,
        name: "Shakeer Mohammed — DevOps / Cloud Engineer",
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Shakeer Mohammed",
        url: `${SITE_URL}/`,
        jobTitle: "DevOps / Cloud Engineer",
        worksFor: experiences.map((exp) => ({
          "@type": "Organization",
          name: exp.company,
        })),
        hasOccupation: roles,
      },
    ],
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shakeer Mohammed — DevOps / Cloud Engineer (Azure, Kubernetes)" },
      {
        name: "description",
        content:
          "Portfolio of Shakeer Mohammed — Azure DevOps & Cloud Engineer with 4+ years in CI/CD, Kubernetes, Terraform and MLOps across Azure and AWS.",
      },
      { property: "og:title", content: "Shakeer Mohammed — DevOps / Cloud Engineer" },
      {
        property: "og:description",
        content:
          "Azure DevOps & Cloud Engineer: CI/CD pipelines, Kubernetes, Terraform, observability and MLOps.",
      },
      { property: "og:url", content: "https://shakeer.online/" },
    ],
    links: [{ rel: "canonical", href: "https://shakeer.online/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildExperienceJsonLd()),
      },
    ],
  }),
  component: Index,
});


const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/shakeer-mohammed-384b741a2/";
const SUBSTACK_URL = "https://open.substack.com/pub/shakeer7";

function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22.539 8.242H2.095V5.25h20.444v2.992ZM2.095 10.738h20.444v2.992H2.095v-2.992ZM2.095 15.734h20.444v5.25L12.317 17.5l-10.222 3.484v-5.25Z" />
    </svg>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const ratios = new Map<string, number>();
    const update = () => {
      let maxId = "";
      let maxRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxId = id;
        }
      });
      setActive(maxId);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.intersectionRatio);
        });
        update();
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-10% 0px -45% 0px",
      },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const DISPLAY_NAME = "Shakeer Mohammed";


type Theme = "light" | "dark" | "system";

const themeOptions: { value: Theme; label: string; icon: ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun className="w-3 h-3" /> },
  { value: "dark", label: "Dark", icon: <Moon className="w-3 h-3" /> },
  { value: "system", label: "System", icon: <Laptop className="w-3 h-3" /> },
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
    const onExternal = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener("shakeer-theme-change", onExternal);
    return () => window.removeEventListener("shakeer-theme-change", onExternal);
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
      className="inline-flex items-center rounded-full glass glass-edge glass-shine p-0.5 gap-0.5"
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
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-white/20"
            }`}
            title={`${option.label} mode`}
          >
            {option.icon}
            <span className="sr-only">{option.label} mode</span>
          </button>
        );
      })}
    </div>
  );

}

function Navbar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [draggedNavIndex, setDraggedNavIndex] = useState<number | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const navDraggingRef = useRef(false);
  const draggedNavIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMoreOpen(false);
  };

  const isHome = activeSection === "home" || activeSection === "";

  // WhatsApp-style bottom nav: 4 primary items + More
  const mobileNavLinks = [
    { label: "Home", href: "#home", icon: Home },
    { label: "About", href: "#about", icon: User },
    { label: "Skills", href: "#skills", icon: Zap },
    { label: "Experience", href: "#experience", icon: Briefcase },
  ];

  const moreLinks = navLinks.filter(
    (l) => !mobileNavLinks.some((m) => m.href === l.href),
  );

  const isMoreActive = moreLinks.some(
    (l) => activeSection === l.href.replace("#", ""),
  );

  const activeMobileIndex = draggedNavIndex ?? (
    isMoreActive || moreOpen
      ? 4
      : Math.max(0, mobileNavLinks.findIndex((link) => activeSection === link.href.replace("#", "")))
  );

  const indicatorColumns = ["col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5"];

  const updateDraggedItem = (clientX: number) => {
    const nav = mobileNavRef.current;
    if (!nav) return;
    const bounds = nav.getBoundingClientRect();
    const relativeX = Math.min(Math.max(clientX - bounds.left, 0), bounds.width - 1);
    const nextIndex = Math.min(4, Math.floor((relativeX / bounds.width) * 5));
    draggedNavIndexRef.current = nextIndex;
    setDraggedNavIndex(nextIndex);
  };

  const finishNavDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const selectedIndex = draggedNavIndexRef.current;
    if (selectedIndex === null) return;
    navDraggingRef.current = false;
    draggedNavIndexRef.current = null;
    setDraggedNavIndex(null);
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (selectedIndex === 4) {
      setMoreOpen((value) => !value);
      return;
    }
    const selected = mobileNavLinks[selectedIndex];
    if (!selected) return;
    const section = document.getElementById(selected.href.replace("#", ""));
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMoreOpen(false);
  };

  return (
    <>
      {/* Theme toggle — top right, mobile-first */}
      <div className="fixed top-3 right-3 z-[60] md:hidden">
        <ThemeToggle />
      </div>

      {/* Desktop / top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 hidden md:block">
        <div
          className={`mx-auto max-w-6xl rounded-2xl glass-edge glass-shine transition-all duration-300 ${
            scrolled
              ? "bg-[var(--glass-bg-strong)] shadow-[var(--glass-shadow)]"
              : "bg-[var(--glass-bg)] shadow-[0_4px_20px_-12px_rgba(15,23,42,0.25)]"
          }`}
          style={{ backdropFilter: "blur(24px) saturate(180%)" }}
        >
          <div className="flex items-center justify-between gap-3 px-4 sm:px-5 h-14">
            <div className="flex min-w-0 items-center gap-4">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className={`shrink-0 text-base font-bold tracking-tight transition-colors ${
                  isHome
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                SM
              </a>
              <div className="flex min-w-0 items-center gap-0.5">
                {navLinks.map((link) => {
                  const active = activeSection === link.href.replace("#", "");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`px-2.5 py-1.5 text-[13px] font-medium rounded-full transition-colors ${
                        active
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/15"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />
              <a
                href="tel:+919441793387"
                className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--glass-border)] text-muted-foreground hover:text-primary hover:bg-white/15 transition-colors"
                aria-label="Call +91 94417 93387"
                title="Call +91 94417 93387"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:mds.shakeer@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Get in Touch</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav — liquid glass pill */}
      <nav className="mobile-nav-safe fixed left-0 right-0 z-50 px-2.5 sm:px-4 md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto w-full max-w-sm rounded-full glass-liquid glass-edge glass-noise">
          <div
            ref={mobileNavRef}
            className="relative grid min-h-16 touch-none select-none grid-cols-5 items-stretch gap-0.5 p-1.5"
            onPointerDown={(event) => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              navDraggingRef.current = true;
              updateDraggedItem(event.clientX);
            }}
            onPointerMove={(event) => {
              if (navDraggingRef.current) updateDraggedItem(event.clientX);
            }}
            onPointerUp={finishNavDrag}
            onPointerCancel={() => {
              navDraggingRef.current = false;
              draggedNavIndexRef.current = null;
              setDraggedNavIndex(null);
            }}
          >
            <div className="pointer-events-none absolute inset-0 grid grid-cols-5 gap-0.5 p-1.5" aria-hidden="true">
              <span
                className={`mobile-liquid-indicator ${indicatorColumns[activeMobileIndex] ?? "col-start-1"} ${
                  draggedNavIndex !== null ? "scale-[1.06]" : "scale-100"
                }`}
              />
            </div>
            {mobileNavLinks.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (e.detail !== 0) {
                      e.preventDefault();
                      return;
                    }
                    handleNavClick(e, link.href);
                  }}
                  className={`relative z-10 flex min-w-0 flex-col items-center justify-center gap-1 rounded-full px-0.5 py-1 transition-[color,transform] duration-200 active:scale-95 ${
                    active || draggedNavIndex === mobileNavLinks.indexOf(link)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.4 : 2} />
                  <span className="max-w-full truncate text-[clamp(0.5rem,2.5vw,0.625rem)] font-semibold leading-none">
                    {link.label}
                  </span>
                </a>
              );
            })}
            <button
              onClick={(event) => {
                if (event.detail !== 0) return;
                setMoreOpen((value) => !value);
              }}
              className={`relative z-10 flex min-w-0 flex-col items-center justify-center gap-1 rounded-full px-0.5 py-1 transition-[color,transform] duration-200 active:scale-95 ${
                isMoreActive || moreOpen || draggedNavIndex === 4
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="More sections"
              aria-expanded={moreOpen}
            >
              <LayoutGrid className="h-5 w-5 shrink-0" strokeWidth={isMoreActive || moreOpen ? 2.4 : 2} />
              <span className="max-w-full truncate text-[clamp(0.5rem,2.5vw,0.625rem)] font-semibold leading-none">More</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile "More" menu */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-[45] bg-foreground/30 backdrop-blur-sm md:hidden"
          onClick={() => setMoreOpen(false)}
          aria-hidden="true"
        />
      )}
      {moreOpen && (
        <div className="mobile-more-safe fixed left-2.5 right-2.5 z-[46] mx-auto max-w-sm sm:left-4 sm:right-4 md:hidden">
          <div className="rounded-2xl glass-liquid glass-edge glass-noise overflow-hidden">
            <div className="grid grid-cols-2 gap-1 p-2">
              {moreLinks.map((link) => {
                const active = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                      active
                        ? "text-primary bg-primary/15"
                        : "text-foreground/75 hover:text-foreground hover:bg-foreground/10"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


function HeroSection() {
  return (
    <section id="home" className="hero-shell relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      {/* Backdrop — dimmed artwork with a clean vertical fade */}
      <div className="hero-backdrop pointer-events-none absolute inset-0 -z-10">
        <img
          src={heroAnimeBg.url}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="hidden h-full w-full object-cover opacity-25 dark:opacity-[0.16] md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Hairline column guides */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="container-tight grid h-full grid-cols-4">
          <div className="border-l border-foreground/[0.05]" />
          <div className="border-l border-foreground/[0.05]" />
          <div className="border-l border-foreground/[0.05]" />
          <div className="border-x border-foreground/[0.05]" />
        </div>
      </div>

      <div className="container-tight relative z-10 px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:pb-28">
        <div className="relative grid grid-cols-[minmax(0,1fr)_72px] items-start gap-3 min-[381px]:grid-cols-[minmax(0,1fr)_96px] min-[420px]:grid-cols-[minmax(0,1fr)_128px] min-[420px]:gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-16 lg:gap-24">
          {/* Left — identity */}
          <div className="relative z-10 max-w-xl pr-4 text-left md:pr-0">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-background/40 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to opportunities
            </div>

            <p className="mt-7 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs sm:tracking-[0.34em]">
              DevOps Engineer <span className="text-primary">·</span> Cloud <span className="text-primary">·</span> MLOps
            </p>

            <h1 className="mt-4 max-w-[10ch] font-display text-[clamp(1.9rem,8vw,6.6rem)] font-bold tracking-[-0.055em] text-foreground leading-[0.92] sm:text-[clamp(3.2rem,8vw,6.6rem)]">
              {DISPLAY_NAME}
              <span className="text-primary">.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-[0.88rem] leading-[1.25] text-muted-foreground sm:mt-7 sm:text-lg sm:leading-relaxed md:mx-0">
              Building scalable, secure, and automated cloud platforms — Azure, Kubernetes, and CI/CD done right.
            </p>

            <p className="mt-6 font-mono text-[0.72rem] text-muted-foreground/80 max-[360px]:hidden sm:text-sm">
              <span className="text-primary">❯</span> 4+ yrs · Terraform · Docker · GitHub Actions · MLOps
            </p>

            <div className="mt-0 flex flex-wrap items-center justify-start gap-2 sm:mt-6 md:mt-10 md:gap-3">
              <a
                href="mailto:mds.shakeer@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary max-[360px]:hidden"
              >
                View experience
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground max-[360px]:hidden md:justify-start">
              <a href="https://github.com/shakeer7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <span className="text-foreground/20">/</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <span className="text-foreground/20">/</span>
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                <SubstackIcon className="h-4 w-4" />
                Substack
              </a>
              <span className="text-foreground/20">/</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                Hyderabad, India
              </span>
            </div>
          </div>

          {/* Right — editorial portrait card */}
          <div className="relative mt-14 block justify-self-end md:mt-0 md:justify-self-end">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-primary/20 blur-3xl" />
            <div className="relative w-[72px] min-[381px]:w-24 min-[420px]:w-28 sm:w-44 md:w-80 overflow-hidden rounded-[1.25rem] border border-white/20 bg-background/60 shadow-2xl shadow-black/30">
              <img
                src="/images/shakeer-profile.jpeg"
                alt="" aria-hidden="true"
                className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                width={640}
                height={853}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent px-5 pb-5 pt-16 text-white">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em]">Profile / 01</span>
                <span className="text-xs text-white/70">Hyderabad</span>
              </div>
            </div>
            <div className="absolute -right-5 -top-5 hidden rounded-full border border-border/70 bg-background/90 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground shadow-lg md:block">
              Cloud · MLOps
            </div>
            <p className="mt-5 hidden text-center font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground md:block">
              shakeer.online
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-24 flex justify-center">
          <a href="#about" className="group flex flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-primary">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em]">Scroll</span>
            <span className="scroll-line" />
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
        <div className="max-w-3xl mx-auto">
          <div className="glass-card glass-noise glass-edge glass-shine p-8 sm:p-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">About Me</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Passionate about cloud, automation & reliability
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Cloud & DevOps Engineer with <strong className="text-foreground">4+ years</strong> of experience in designing, automating, and managing cloud infrastructure, CI/CD pipelines, containerized applications, and Infrastructure as Code solutions.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Experienced in <strong className="text-foreground">Azure and AWS</strong> cloud environments, with hands-on expertise in Kubernetes, Docker, Terraform, GitHub Actions, Argo CD, Helm, and automation. Currently expanding expertise in <strong className="text-foreground">MLOps, Platform Engineering, and AI-driven infrastructure automation</strong>.
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
      </div>
    </section>
  );
}

const skillCategories: {
  title: string;
  icon: typeof Cloud;
  skills: { name: string; slug?: string }[];
}[] = [
  {
    title: "Cloud Platforms",
    icon: Cloud,
    skills: [
      { name: "Microsoft Azure", slug: "microsoftazure" },
      { name: "Amazon Web Services (AWS)", slug: "amazonwebservices" },
    ],
  },
  {
    title: "DevOps & Automation",
    icon: GitBranch,
    skills: [
      { name: "Azure DevOps", slug: "azuredevops" },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "Ansible", slug: "ansible" },
      { name: "CI/CD Pipelines" },
      { name: "Terraform (IaC)", slug: "terraform" },
      { name: "Azure Bicep" },
    ],
  },
  {
    title: "Containers & Orchestration",
    icon: Container,
    skills: [
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Helm", slug: "helm" },
      { name: "Argo CD", slug: "argocd" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    skills: [
      { name: "SonarQube", slug: "sonar" },
      { name: "Trivy", slug: "trivy" },
      { name: "OWASP ZAP", slug: "owasp" },
      { name: "Nuclei" },
    ],
  },
  {
    title: "Monitoring & Observability",
    icon: Monitor,
    skills: [
      { name: "Datadog", slug: "datadog" },
      { name: "Prometheus", slug: "prometheus" },
      { name: "Grafana", slug: "grafana" },
    ],
  },
  {
    title: "MLOps & Machine Learning",
    icon: Cpu,
    skills: [
      { name: "Python", slug: "python" },
      { name: "Pandas", slug: "pandas" },
      { name: "Scikit-learn", slug: "scikitlearn" },
      { name: "MLflow", slug: "mlflow" },
      { name: "DVC", slug: "dvc" },
      { name: "FastAPI", slug: "fastapi" },
    ],
  },
  {
    title: "Programming & Scripting",
    icon: Code,
    skills: [
      { name: "Python", slug: "python" },
      { name: "Bash", slug: "gnubash" },
    ],
  },
  {
    title: "Version Control",
    icon: Database,
    skills: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
    ],
  },
];

function ToolIcon({ slug, name }: { slug?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!slug || failed) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary">
        <ArrowRight className="w-3.5 h-3.5" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10 shrink-0">
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={`${name} logo`}
        loading="lazy"
        width={16}
        height={16}
        className="w-4 h-4"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="container-tight">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Core Skills</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Technologies & Tools
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A robust toolkit built across cloud platforms, automation, containers, and observability.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
              <div className="group rounded-2xl glass glass-noise glass-edge glass-card-hover p-6 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{cat.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <ToolIcon slug={skill.slug} name={skill.name} />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const experiences = [
  {
    title: "Cloud & DevOps Engineer",
    company: "Tata Consultancy Services (TCS)",
    location: "Hyderabad, India",
    period: "June 2022 – July 2025",
    clients: [
      {
        title: "DevOps Engineer (Azure)",
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
        title: "Cloud & DevOps Engineer",
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
            Delivering cloud and DevOps solutions for global enterprises.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-8 md:pl-0">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px glass" />
              <div className="hidden md:flex absolute -left-3 top-1 w-6 h-6 items-center justify-center rounded-full glass-strong border border-primary/60">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <div className="md:ml-12">
                {/* Company header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 glass-card glass-noise glass-edge glass-shine px-5 py-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <p className="text-base font-medium text-primary">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                    <Clock className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>

                {/* Client accordion */}
                <Accordion type="single" collapsible defaultValue={exp.clients[0]?.client.toLowerCase().replace(/\s+/g, "-")} className="space-y-4">
                  {exp.clients.map((client, ci) => {
                    const value = client.client.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <AccordionItem
                        key={ci}
                        value={value}
                        className="rounded-2xl glass-strong glass-noise glass-edge border-l-4 border-primary/60 border-b-0 px-5 overflow-hidden"
                      >
                        <AccordionTrigger className="py-4 hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="text-left">
                              <h4 className="text-lg font-bold text-foreground">{client.client}</h4>
                              <p className="text-sm text-muted-foreground">{client.title}</p>
                            </div>
                            <span className="inline-flex items-center rounded-full glass px-2.5 py-1 text-xs font-medium text-primary">
                              {client.highlights.length}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-5">
                          <ul className="space-y-2">
                            {client.highlights.map((h, hi) => (
                              <li key={hi} className="flex items-start gap-2.5 text-muted-foreground">
                                <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

              </div>
            </div>
          ))}
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
              className="group rounded-2xl glass glass-noise glass-edge glass-card-hover p-6 transition-all duration-300"
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
    period: "Expected: July 2026",
    logo: isbLogo.url,
    logoAlt: "ISB logo",
    credentialUrl: "https://www.credential.net/85d1e385-706c-40fb-9f88-f51cd2a15145#acc.PphVAMtc",
  },

  {
    degree: "MBA (PG) — Business Operations & Analytics",
    school: "CBIT, Hyderabad",
    period: "2025 – Present",
    logo: cbitLogo.url,
    logoAlt: "CBIT logo",
  },
  {
    degree: "B.Tech in Electrical and Electronics Engineering (EEE)",
    school: "SR University, Warangal",
    period: "2019 – 2022",
    logo: sruLogo.url,
    logoAlt: "SRU logo",
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
              className="rounded-2xl glass glass-noise glass-edge glass-card-hover p-6 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden ring-1 ring-white/20 flex items-center justify-center">
                  <img
                    src={edu.logo}
                    alt={edu.logoAlt}
                    className="w-full h-full object-contain"
                    width={56}
                    height={56}
                  />
                </div>
              <div>
                <div className="flex items-start gap-2">
                  <h3 className="text-base font-semibold text-foreground leading-snug">{edu.degree}</h3>
                  {(edu as { credentialUrl?: string }).credentialUrl && (
                    <a
                      href={(edu as { credentialUrl?: string }).credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center justify-center rounded-lg p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      aria-label="Verify credential"
                      title="Verify credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-primary">{edu.school}</p>
                <p className="mt-1 text-sm text-muted-foreground">{edu.period}</p>
              </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const certifications = [
  { name: "McKinsey.org Forward Program", issuer: "McKinsey & Company", date: "Jun 2026", icon: Globe },
  { name: "Microsoft Certified: Azure Administrator Associate (AZ-104)", issuer: "Microsoft", date: "", icon: Cloud },
  { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft", date: "", icon: Server },
  { name: "Python", issuer: "HackerRank", date: "Mar 2022", icon: FileCode },
  { name: "Claude 101", issuer: "Anthropic", date: "Apr 2026", icon: Zap },
  { name: "SQL", issuer: "Udemy", date: "Jan 2026", icon: Database },
  { name: "Scrum Fundamentals Certified (SFC)", issuer: "SCRUMstudy", date: "Apr 2026", icon: LayoutGrid },
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
              className="flex items-center gap-4 rounded-2xl glass glass-noise glass-edge glass-shine p-5 transition-colors"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                <cert.icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {cert.issuer}
                  {cert.date ? ` · Issued ${cert.date}` : ""}
                </p>
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
              className="inline-flex items-center gap-2 rounded-full glass glass-pill-hover glass-edge glass-shine px-4 py-2.5 text-sm font-medium text-foreground transition-all"
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
  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: "mds.shakeer@gmail.com",
      href: "mailto:mds.shakeer@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "Tap to call",
      href: "tel:+919441793387",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "shakeer-mohammed",
      href: LINKEDIN_URL,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "shakeer7",
      href: "https://github.com/shakeer7",
    },
    {
      icon: SubstackIcon,
      label: "Substack",
      value: "shakeer7.substack.com",
      href: SUBSTACK_URL,
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-hero-glow)_0%,_transparent_60%)] opacity-50" />
      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass glass-noise glass-edge glass-shine rounded-3xl p-8 sm:p-12">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Rocket className="w-3.5 h-3.5 text-primary" />
                  Open to opportunities
                </div>
                <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Let&apos;s build something reliable
                </h2>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Scalable, secure and automated cloud platforms — helping teams ship faster with
                  modern DevOps and MLOps practices. Reach out for roles, collaborations or a quick chat.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:mds.shakeer@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  >
                    <Mail className="w-4 h-4" />
                    Email me
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass glass-pill-hover px-6 py-3 text-sm font-medium text-foreground transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:w-[24rem]">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-2xl glass glass-pill-hover px-4 py-3 transition-all"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl glass-strong text-primary">
                      <c.icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">{c.label}</span>
                      <span className="block truncate text-sm font-medium text-foreground">
                        {c.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisitorStats() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);
  const [yourVisits, setYourVisits] = useState<number>(0);

  useEffect(() => {
    // Per-visitor stats via localStorage
    try {
      const key = "shakeer_portfolio_visits";
      const raw = localStorage.getItem(key);
      const data = raw
        ? (JSON.parse(raw) as { count: number; first: string; last: string })
        : { count: 0 };
      const next = { count: data.count + 1 };
      localStorage.setItem(key, JSON.stringify(next));
      setYourVisits(next.count);
    } catch {
      setYourVisits(1);
    }

    // Global visit counter via free public counter API
    const controller = new AbortController();
    fetch("https://abacus.jasoncameron.dev/hit/shakeer-portfolio/site-visits", {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data: { value?: number; count?: number }) => {
        const n = typeof data.value === "number" ? data.value : data.count;
        if (typeof n === "number") setTotalVisits(n);
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
  ];

  return (
    <section className="py-10 border-t border-white/10">
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Portfolio Stats
            </h2>
            <p className="text-xs text-muted-foreground">
              A quick snapshot of your activity.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="inline-flex items-center gap-2.5 rounded-full glass glass-edge glass-shine px-3.5 py-2 hover:shadow-md hover:shadow-primary/10 transition-all"
                title={s.hint}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary shrink-0">
                  <s.icon className="w-3.5 h-3.5" />
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-foreground tabular-nums">{s.value}</span>
                  <span className="text-[10px] text-muted-foreground">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-10 pb-32 lg:pb-10 border-t border-white/10">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-foreground">Shakeer Mohammed</p>
            <p className="text-sm text-muted-foreground">DevOps / Cloud Engineer | MLOps Enthusiast</p>
            <Link
              to="/azure-devops-vs-github-actions"
              className="mt-1 inline-block text-sm text-primary hover:underline"
            >
              Guide: Azure DevOps vs GitHub Actions
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {[
              { href: "mailto:mds.shakeer@gmail.com", label: "Email", icon: Mail },
              { href: "https://github.com/shakeer7", label: "GitHub", icon: Github },
              { href: LINKEDIN_URL, label: "LinkedIn", icon: Linkedin },
              { href: SUBSTACK_URL, label: "Substack", icon: SubstackIcon },
              { href: "tel:+919441793387", label: "Call +91 94417 93387", icon: Phone },
              { href: "https://github.com/Tracer-Cloud/opensre", label: "OpenSRE", icon: Globe },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border/60 bg-card/60 backdrop-blur-md text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
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
  const activeSection = useActiveSection([
    "home",
    "about",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
    "contact",
  ]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = document.querySelectorAll<HTMLElement>(
      "main [data-auto-reveal] > *",
    );
    // Skip the hero (first child) so it renders immediately without a fade.
    const targets = Array.from(nodes).slice(1);
    targets.forEach((n) => n.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen aurora-bg">
      <div className="aurora-layer" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>
      {/* Global glass grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
      <Navbar activeSection={activeSection} />
      <main data-auto-reveal className="relative z-10 pb-24 md:pb-0">
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
      </main>
      <Footer />
    </div>
  );
}



