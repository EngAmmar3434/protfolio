import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigationContent, navigationLinks } from "../data/portfolioData";

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
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const visible = window.scrollY >= NAVBAR_SHOW_SCROLL_Y;

      setNavVisible(visible);
      setScrolled(window.scrollY > 42);
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

      if (!visible) setMobileOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-[var(--lab-radius)] border px-4 py-3 backdrop-blur-2xl transition duration-300 ${
            scrolled
              ? "border-[var(--lab-border)] bg-[var(--lab-panel-strong)] shadow-[0_12px_60px_rgba(0,0,0,0.28)]"
              : "border-white/10 bg-[rgba(3,8,24,0.46)]"
          }`}
        >
          <a
            href="#home"
            onClick={(event) => handleLink(event, "#home")}
            className="heading flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em] text-white"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--lab-cyan)]/34 bg-[var(--lab-royal)]/18 text-[var(--lab-cyan)] shadow-[0_0_28px_rgba(86,215,255,0.18)]">
              <span className="mono text-[0.68rem]">{navigationContent.mark}</span>
            </span>
            <span className="hidden sm:inline">{navigationContent.brand}</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleLink(event, link.href)}
                className="rounded-full px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/52 transition duration-200 hover:bg-white/[0.055] hover:text-[var(--lab-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              <div className="h-px w-20 overflow-hidden bg-white/12">
                <div
                  className="h-full bg-[var(--lab-cyan)] transition-[width] duration-200"
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
              className="hidden rounded-full bg-[var(--lab-royal-2)] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-[var(--lab-royal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)] md:inline-flex"
            >
              {navigationContent.contactLabel}
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white transition duration-200 hover:border-[var(--lab-cyan)]/38 hover:text-[var(--lab-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)] lg:hidden"
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
            <div className="lab-panel p-3">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleLink(event, link.href)}
                  className="flex items-center justify-between rounded-[var(--lab-radius)] px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white/62 transition duration-200 hover:bg-white/[0.055] hover:text-[var(--lab-cyan)]"
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
                className="block rounded-[var(--lab-radius)] bg-[var(--lab-royal-2)] px-4 py-3 text-center text-sm font-black uppercase tracking-[0.14em] text-white"
              >
                {navigationContent.mobileContactLabel}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
