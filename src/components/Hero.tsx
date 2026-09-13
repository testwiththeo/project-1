import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bug,
  ChatCircleText,
  Code,
  GitBranch,
  ShieldCheck,
  TestTube,
} from "@phosphor-icons/react";
import { apiUrl } from "../lib/api";
import { DEFAULT_PAGE_SETTINGS, type PageSettings } from "../lib/page-settings";
import { HeroImage, HeroImageSkeleton } from "./HeroImage";
import { useContactDialog } from "./ContactDialogProvider";

const SKILLS = [
  { label: "Test Automation", icon: TestTube },
  { label: "Quality Engineering", icon: Bug },
  { label: "Test Strategy", icon: ShieldCheck },
  { label: "API Testing", icon: Code },
  { label: "CI/CD", icon: GitBranch },
] as const;

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const skillsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    },
  },
};

const skillItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export function Hero() {
  const { openContactDialog } = useContactDialog();
  const prefersReducedMotion = useReducedMotion();
  const [pageSettings, setPageSettings] = useState<PageSettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch(apiUrl("/api/page-settings"));

        if (cancelled) return;

        if (res.ok) {
          const settings = (await res.json()) as PageSettings;
          setPageSettings(settings);
        } else {
          setPageSettings(DEFAULT_PAGE_SETTINGS);
        }
      } catch {
        if (!cancelled) {
          setPageSettings(DEFAULT_PAGE_SETTINGS);
        }
      } finally {
        if (!cancelled) {
          setSettingsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <m.section
      className="-mt-2 sm:-mt-8"
      initial={prefersReducedMotion ? false : "hidden"}
      animate="show"
      variants={heroContainer}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-y-5">
          <div className="space-y-4 sm:space-y-5">
            <m.div
              className="flex items-center gap-x-3 sm:gap-x-4"
              variants={heroItem}
            >
              <m.div
                className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-card bg-orange-50/50 shadow-[0px_5px_10px_rgba(0,0,0,0.18),0px_1px_3px_rgba(0,0,0,0.14)] dark:bg-orange-950/30 sm:h-16 sm:w-16"
                whileHover={
                  prefersReducedMotion ? undefined : { rotate: -4, scale: 1.04 }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {settingsLoading || !pageSettings ? (
                  <HeroImageSkeleton />
                ) : (
                  <HeroImage
                    key={pageSettings.avatarImage}
                    src={pageSettings.avatarImage}
                    alt="Theodore Avatar"
                    imgClassName="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                )}
              </m.div>
              <h1 className="text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-[2.5rem] lg:text-[2.75rem]">
                Hi, I'm Theodore
              </h1>
            </m.div>

            <m.p
              className="flex items-center gap-x-2 text-[13px] font-medium text-muted sm:text-[14px]"
              variants={heroItem}
            >
              <span aria-hidden="true" className="text-base">
                🇮🇩
              </span>
              <span>Based in Surabaya, Indonesia</span>
            </m.p>

            <p className="sr-only">
              Theodorus Yosia Raffael Gunawan, known as Theodore, is a Software
              Engineer in Test based in Indonesia.
            </p>

            <m.h2
              className="max-w-2xl text-[1.5rem] font-medium leading-[1.28] tracking-tight text-foreground sm:text-[2.25rem]"
              variants={heroItem}
            >
              I break things so users don't have to.
              Quality Engineer crafting reliable software through smart testing.
            </m.h2>

            <m.div
              className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1"
              variants={heroItem}
            >
              <button
                type="button"
                onClick={openContactDialog}
                className="inline-flex items-center gap-x-2 rounded-full px-5 py-3.5 text-[14.5px] font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground focus:ring-offset-card btn-embossed will-change-transform"
              >
                <ChatCircleText size={18} weight="regular" />
                <span>Get in Touch</span>
              </button>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-x-1.5 rounded-full text-[14.5px] font-medium text-muted transition-colors duration-200 ease-out hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                View my work
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </Link>
            </m.div>
          </div>

          <m.div
            className="flex flex-wrap gap-2 sm:gap-2.5"
            variants={skillsContainer}
          >
            {SKILLS.map(({ label, icon: Icon }) => (
              <m.div
                key={label}
                className="flex items-center gap-x-1.5 rounded-full border border-border bg-card/50 px-3.5 py-2 text-[13px] font-medium text-foreground theme-transition hover:bg-surface hover:border-muted min-h-[44px] sm:min-h-0"
                variants={skillItem}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                <Icon size={14} className="text-muted" />
                <span>{label}</span>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </m.section>
  );
}
