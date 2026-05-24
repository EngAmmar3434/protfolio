import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigationContent, navigationLinks } from "../data/portfolioData";

const MOBILE_QUERY = "(max-width: 767px)";
const NAVBAR_SHOW_SCROLL_Y = 4508.7998046875;

function scrollToSection(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const visible = mediaQuery.matches || window.scrollY >= NAVBAR_SHOW_SCROLL_Y;

      setNavVisible(visible);
      setScrolled(window.scrollY > 42);
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

      if (!visible) setMobileOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    mediaQuery.addEventListener("change", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mediaQuery.removeEventListener("change", onScroll);
    };
  }, []);

  const handleLink = (event, href) => {
    event.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={navVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 top-0 z-50 w-full px-4 py-4 ${
          navVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`hud-navbar mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4 ${
            scrolled ? "hud-navbar-scrolled" : ""
          }`}
        >
          <span aria-hidden="true" className="hud-nav-accent hud-nav-accent-left" />
          <span aria-hidden="true" className="hud-nav-accent hud-nav-accent-right" />

          <a
            href="#home"
            onClick={(event) => handleLink(event, "#home")}
            className="heading hud-nav-brand lab-interactive lab-clickable flex min-w-0 items-center text-[0.72rem] font-black uppercase tracking-[0.16em] text-white sm:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)]"
          >
            <span className="truncate">{navigationContent.brand}</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleLink(event, link.href)}
                className="hud-nav-link lab-interactive lab-clickable inline-flex items-center px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/58 transition duration-200 hover:text-[var(--lab-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              <div className="hud-navbar-progress h-px w-20 overflow-hidden">
                <div
                  className="hud-navbar-progress-fill h-full transition-[width] duration-200"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <span className="mono text-[0.62rem] font-bold text-white/42">
                {String(Math.round(progress * 100)).padStart(2, "0")}%
              </span>
            </div>

            <a
              href="#contact"
              onClick={(event) => handleLink(event, "#contact")}
              className="hud-nav-cta lab-interactive lab-clickable lab-button lab-hover-scan hidden px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)] md:inline-flex"
            >
              <span aria-hidden="true" className="lab-scan-line" />
              <span className="relative z-10">{navigationContent.contactLabel}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="hud-nav-toggle lab-interactive lab-clickable grid h-10 w-10 place-items-center text-white transition duration-200 hover:text-[var(--lab-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)] lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && navVisible && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-4 top-[82px] z-40 lg:hidden"
          >
            <div className="hud-navbar-panel max-h-[calc(100svh-96px)] overflow-y-auto p-3">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleLink(event, link.href)}
                  className="hud-nav-link hud-nav-panel-link lab-interactive lab-clickable flex items-center justify-between px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white/66 transition duration-200 hover:text-[var(--lab-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)]"
                >
                  <span>{link.label}</span>
                  <span className="mono text-[0.62rem] text-white/32">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              ))}
              <div className="lab-divider my-2" />
              <a
                href="#contact"
                onClick={(event) => handleLink(event, "#contact")}
                className="hud-nav-cta lab-interactive lab-clickable lab-button lab-hover-scan block px-4 py-3 text-center text-sm font-black uppercase tracking-[0.14em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)]"
              >
                <span aria-hidden="true" className="lab-scan-line" />
                <span className="relative z-10">{navigationContent.mobileContactLabel}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
