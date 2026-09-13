import { Link } from "react-router-dom";
import { m } from "motion/react";
import { resolveProjectBgClass } from "../lib/project-bg-presets";
import { getProjectPreviewVideo } from "../lib/project-media";
import { Skeleton } from "./Skeleton";

const TAG_TO_ICON: Record<string, string> = {
  "Android": "https://cdn.simpleicons.org/android/3DDC84",
  "Kotlin": "https://cdn.simpleicons.org/kotlin/7F52FF",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/white", // Using white for Next.js since it sits on a dark gradient
  "FastAPI": "https://cdn.simpleicons.org/fastapi/009688",
  "React": "https://cdn.simpleicons.org/react/61DAFB",
  "Playwright": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
};

export interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  bgClass: string;
  imagePosition?: string;
  index: number;
}

export function ProjectCard({
  slug,
  title,
  description,
  image,
  tags,
  bgClass,
  imagePosition = "object-top",
  index,
}: ProjectCardProps) {
  const previewVideo = getProjectPreviewVideo({ slug, title, image });

  return (
    <m.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1] as const,
        delay: index * 0.1,
      }}
    >
      <Link
        to={`/project/${slug}`}
        className="group block h-full rounded-[2rem] border border-border bg-card p-3 sm:p-4 theme-transition hover:shadow-subtle hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
      >
        <div
          className={`overflow-hidden ${resolveProjectBgClass(bgClass)} aspect-[4/3] rounded-2xl relative transition-transform duration-500 ease-out`}
        >
          {previewVideo ? (
            <video
              src={previewVideo}
              className={`h-full w-full object-cover ${imagePosition} transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={`${title} video preview`}
            />
          ) : (
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover ${imagePosition} transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]`}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100" />
          
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 opacity-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            {tags.slice(0, 3).map((tag) => {
              const iconUrl = TAG_TO_ICON[tag];
              if (iconUrl) {
                return (
                  <div
                    key={`${slug}-${tag}`}
                    className="flex size-8 items-center justify-center rounded-full bg-white/10 p-1.5 backdrop-blur-md ring-1 ring-white/20 shadow-sm"
                    title={tag}
                  >
                    <img src={iconUrl} alt={tag} className="size-full object-contain" />
                  </div>
                );
              }
              return (
                <span
                  key={`${slug}-${tag}`}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white backdrop-blur-md ring-1 ring-white/20 shadow-sm"
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        
        <div className="mt-5 px-2 pb-2">
          <h3 className="text-[20px] font-semibold tracking-tight text-foreground transition-colors duration-200">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">
            {description}
          </p>
        </div>
      </Link>
    </m.div>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
      {[0, 1].map((k) => (
        <div key={k}>
          <Skeleton
            className="aspect-[4/3] sm:aspect-[16/11] rounded-[24px]"
            style={{ animationDelay: `${k * 80}ms` }}
          />
          <div className="mt-5 space-y-3 px-1">
            <Skeleton
              variant="text"
              className="h-5 w-3/4"
              style={{ animationDelay: `${k * 80}ms` }}
            />
            <Skeleton
              variant="text"
              muted
              className="h-4 w-1/2"
              style={{ animationDelay: `${k * 80}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
