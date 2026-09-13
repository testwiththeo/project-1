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
    rotate: 0 
  },
  { 
    id: 'cypress', 
    name: 'Cypress', 
    bg: 'bg-card', 
    icon: 'https://cdn.simpleicons.org/cypress/17202C', 
    rotate: 0 
  },
  { 
    id: 'jmeter', 
    name: 'JMeter', 
    bg: 'bg-card',
    icon: 'https://cdn.simpleicons.org/apachejmeter/D22128', 
    rotate: 0 
  },
  { 
    id: 'k6', 
    name: 'k6', 
    bg: 'bg-card', 
    icon: 'https://cdn.simpleicons.org/k6/7D64FF', 
    rotate: 0 
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
    rotate: 0 
  },
  {
    id: 'sql',
    name: 'SQL',
    bg: 'bg-card',
    rotate: 0
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    bg: 'bg-card',
    icon: 'https://cdn.simpleicons.org/typescript/3178C6',
    rotate: 0
  },
  {
    id: 'archlinux',
    name: 'Arch Linux',
    bg: 'bg-card',
    icon: 'https://cdn.simpleicons.org/archlinux/1793D1',
    rotate: 0
  },
];

export function ToolsStack() {
  return (
    <section className="flex flex-col items-center justify-center overflow-visible">
      <m.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }}
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
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 px-4 max-w-5xl mx-auto"
      >
        {TOOLS.map((tool) => {
          const borderClass = tool.borderClass ?? 'border-2 border-border';
          const ThemeIcon = isThemeAwareToolIcon(tool.id) ? THEME_AWARE_TOOL_ICONS[tool.id] : null;
          const iconClassName = 'w-10 h-10 sm:w-12 sm:h-12 text-foreground';

          return (
            <m.div
              key={tool.id}
              className={`group relative w-full aspect-square rounded-xl sm:rounded-2xl ${borderClass} flex items-center justify-center cursor-pointer ${tool.bg} theme-transition hover:border-muted`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }}
            >
              <div className="flex size-12 sm:size-14 items-center justify-center rounded-xl bg-white/95">
                {ThemeIcon ? (
                  <ThemeIcon className={iconClassName} />
                ) : tool.icon ? (
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className={`${iconClassName} object-contain ${tool.imgClassName ?? ''}`.trim()}
                  />
                ) : (
                  <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1b1b1b]">
                    {tool.monogram}
                  </span>
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute -top-10 bg-foreground text-canvas text-[12px] font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {tool.name}
              </div>
            </m.div>
          );
        })}
      </m.div>
    </section>
  );
}
