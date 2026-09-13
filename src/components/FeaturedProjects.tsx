import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { ProjectCard, ProjectsGridSkeleton } from "./ProjectCard";

export function FeaturedProjects() {
  const { projects, loading, error, retry } = useProjects({
    featuredOnly: true,
  });

  return (
    <section>
      <div className="max-w-3xl mx-auto mb-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-muted uppercase">
          Projects.
        </p>
        <h2 className="mt-2 text-[2rem] sm:text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-foreground">
          Selected work.
        </h2>
      </div>

      <div className="mb-6 flex justify-end">
        <Link
          to="/projects"
          className="flex items-center gap-x-2 text-[14px] font-medium text-muted hover:text-foreground theme-transition group"
        >
          <span>View all work</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 ease-out group-hover:translate-x-1"
          />
        </Link>
      </div>

      {loading && <ProjectsGridSkeleton />}

      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50/80 px-5 py-4 text-[15px] text-red-800">
          <p className="font-medium">Could not load projects.</p>
          <p className="text-red-700/90 mt-1">{error.message}</p>
          <button
            type="button"
            onClick={() => retry()}
            className="mt-3 text-[14px] font-semibold underline decoration-red-800/40 hover:decoration-red-900"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-[15px] text-muted">No featured projects yet.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {projects.slice(0, 2).map((project, index) => (
            <ProjectCard
              key={project.slug}
              index={index}
              slug={project.slug}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              bgClass={project.bgClass}
              imagePosition={project.imagePosition}
            />
          ))}
        </div>
      )}
    </section>
  );
}
