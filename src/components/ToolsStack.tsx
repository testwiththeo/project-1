import { m } from 'motion/react';
import { isThemeAwareToolIcon, THEME_AWARE_TOOL_ICONS } from './tool-icons';

type Tool = {
  id: string;
  name: string;
  bg: string;
  icon?: string;
  monogram?: string;
  rotate: number;
  borderClass?: string;
  imgClassName?: string;
};

const TOOLS: Tool[] = [
  { 
    id: 'playwright', 
    name: 'Playwright', 
    bg: 'bg-card',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg',
    rotate: -24 
  },
  { 
    id: 'cypress', 
    name: 'Cypress', 
    bg: 'bg-card', 
    icon: 'https://cdn.simpleicons.org/cypress/17202C', 
    rotate: -18 
  },
  { 
    id: 'jmeter', 
    name: 'JMeter', 
    bg: 'bg-card',
    icon: 'https://cdn.simpleicons.org/apachejmeter/D22128', 
    rotate: -12 
  },
  { 
    id: 'k6', 
    name: 'k6', 
    bg: 'bg-card', 
    icon: 'https://cdn.simpleicons.org/k6/7D64FF', 
    rotate: -6 
  },
  { 
    id: 'maestro', 
    name: 'Maestro', 
    bg: 'bg-card', 
    rotate: 0 
  },
  { 
    id: 'appium', 
    name: 'Appium', 
    bg: 'bg-card', 
    icon: 'https://cdn.simpleicons.org/appium/EE376D', 
    rotate: 6 
  },
  {
    id: 'sql',
    name: 'SQL',
    bg: 'bg-card',
    rotate: 12
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    bg: 'bg-card',
    icon: 'https://cdn.simpleicons.org/typescript/3178C6',
    rotate: 18
  },
  {
    id: 'archlinux',
    name: 'Arch Linux',
    bg: 'bg-card',
    icon: 'https://cdn.simpleicons.org/archlinux/1793D1',
    rotate: 24
  },
];

export function ToolsStack() {
  return (
    <section className="flex flex-col items-center justify-center overflow-visible">
      <m.div 
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-[2rem] sm:text-3xl font-semibold tracking-tight text-foreground mb-4">Testing Arsenal</h2>
        <p className="text-[15px] sm:text-lg text-muted px-4">Tools I use for automation, API testing, and performance validation.</p>
      </m.div>
      
      <m.div 
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
        className="flex items-center justify-center px-4 [&>*+*]:-ml-2 sm:[&>*+*]:-ml-8"
      >
        {TOOLS.map((tool, index) => {
          const borderClass = tool.borderClass ?? 'border-4 border-card';
          const ThemeIcon = isThemeAwareToolIcon(tool.id) ? THEME_AWARE_TOOL_ICONS[tool.id] : null;
          const iconClassName = 'w-12 h-12 sm:w-16 sm:h-16 text-foreground drop-shadow-sm';

          return (
            <m.div
              key={tool.id}
              className={`relative group w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl ${borderClass} shadow-elevated flex items-center justify-center cursor-pointer ${tool.bg} origin-bottom theme-transition`}
              initial={{ rotate: tool.rotate, y: 0 }}
              whileHover={{
                y: -24,
                rotate: 0,
                scale: 1.15,
                zIndex: 50,
                transition: { type: 'spring', stiffness: 400, damping: 20 },
              }}
              style={{ zIndex: TOOLS.length - Math.abs((TOOLS.length - 1) / 2 - index) }}
            >
              <div className="flex size-16 sm:size-20 items-center justify-center rounded-2xl bg-white/95 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
                {ThemeIcon ? (
                  <ThemeIcon className={iconClassName} />
                ) : tool.icon ? (
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className={`${iconClassName} object-contain ${tool.imgClassName ?? ''}`.trim()}
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1b1b1b]">
                    {tool.monogram}
                  </span>
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute -top-14 bg-foreground text-canvas text-[13px] font-medium px-3.5 py-2 rounded-xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap shadow-xl flex flex-col items-center">
                {tool.name}
                <div className="absolute -bottom-1 size-2.5 bg-foreground rotate-45 rounded-sm"></div>
              </div>
            </m.div>
          );
        })}
      </m.div>
    </section>
  );
}
