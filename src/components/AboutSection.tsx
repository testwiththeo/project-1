import { Briefcase, MapPin, PaperPlaneTilt } from "@phosphor-icons/react";
import { m } from "motion/react";
import { useContactDialog } from "./ContactDialogProvider";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export function AboutSection() {
  const { openContactDialog } = useContactDialog();

  return (
    <m.section
      id="about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <m.div
        className="bg-canvas rounded-[3rem] p-8 sm:p-12 lg:p-16 border border-border/50 theme-transition"
      >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left */}
            <div>
              <m.p
                variants={itemVariants}
                className="text-[11px] font-semibold text-muted tracking-wider uppercase mb-6"
              >
                ABOUT ME
              </m.p>
              <m.h2
                variants={itemVariants}
                className="text-[2rem] sm:text-[2.25rem] leading-[1.2] font-semibold text-foreground mb-6 tracking-tight"
              >
                I find bugs before users do.
              </m.h2>
              <m.p
                variants={itemVariants}
                className="text-[16px] leading-relaxed text-muted mb-10 max-w-lg"
              >
                I'm{" "}
                <strong className="font-semibold text-foreground">
                  Theodorus Yosia Raffael Gunawan
                </strong>{" "}
                — most people call me Theo. As a Quality Engineer, I help teams
                ship reliable software through smart test automation and thorough
                quality strategies. I believe great testing is invisible: when it
                works, users never notice.
              </m.p>
              <m.div variants={itemVariants}>
                <button
                  type="button"
                  onClick={openContactDialog}
                  className="inline-block text-white px-8 py-3.5 rounded-full font-medium text-[15px] btn-embossed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground focus:ring-offset-card"
                >
                  Get in Touch
                </button>
              </m.div>
            </div>

            {/* Right */}
            <div className="space-y-6 sm:space-y-10 lg:pl-8">
              <m.div
                variants={itemVariants}
                className="flex items-center gap-x-4 sm:gap-x-6 p-3 sm:p-0 rounded-xl hover:bg-surface/50 sm:hover:bg-transparent transition-colors min-h-[44px] sm:min-h-0"
              >
                <div className="shrink-0">
                  <Briefcase
                    size={24}
                    className="text-foreground"
                    weight="regular"
                  />
                </div>
                <div>
                  <p className="text-[16px] sm:text-[17px] font-medium text-foreground">
                    1+ year experience
                  </p>
                </div>
              </m.div>
              <m.div
                variants={itemVariants}
                className="flex items-center gap-x-4 sm:gap-x-6 p-3 sm:p-0 rounded-xl hover:bg-surface/50 sm:hover:bg-transparent transition-colors min-h-[44px] sm:min-h-0"
              >
                <div className="shrink-0">
                  <MapPin
                    size={24}
                    className="text-foreground"
                    weight="regular"
                  />
                </div>
                <div>
                  <p className="text-[16px] sm:text-[17px] font-medium text-foreground">
                    Based in Indonesia
                  </p>
                </div>
              </m.div>
              <m.div
                variants={itemVariants}
                className="flex items-center gap-x-4 sm:gap-x-6 p-3 sm:p-0 rounded-xl hover:bg-surface/50 sm:hover:bg-transparent transition-colors min-h-[44px] sm:min-h-0"
              >
                <div className="shrink-0">
                  <PaperPlaneTilt
                    size={24}
                    className="text-foreground"
                    weight="regular"
                  />
                </div>
                <div>
                  <p className="text-[16px] sm:text-[17px] font-medium text-foreground">
                    Open to freelance & collaborations
                  </p>
                </div>
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </m.section>
  );
}
