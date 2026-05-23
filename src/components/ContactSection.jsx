import { ArrowUpRight, Code2, FileDown, Mail, Network } from "lucide-react";
import { contactLinks, profile, sectionContent } from "../data/portfolioData";

const OPTIONAL_ICONS = {
  linkedin: Network,
  github: Code2,
  cv: FileDown,
};

export default function ContactSection() {
  const optionalLinks = Object.entries(sectionContent.contact.optionalActions)
    .map(([key, label]) => ({
      key,
      label,
      href: contactLinks[key],
      Icon: OPTIONAL_ICONS[key],
    }))
    .filter((link) => link.href);

  return (
    <section id="contact" className="lab-section pb-10">
      <div className="lab-container">
        <div className="hud-frame relative overflow-hidden p-6 md:p-10 lg:p-14">
          <div className="absolute right-[-12%] top-[-28%] h-[440px] w-[440px] rounded-full bg-[var(--lab-royal-2)]/18 blur-3xl" />
          <div className="absolute bottom-[-22%] left-[-12%] h-[340px] w-[340px] rounded-full bg-[var(--lab-cyan)]/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="lab-kicker text-[var(--lab-gold)]">{sectionContent.contact.eyebrow}</p>
              <h2 className="heading mt-6 max-w-4xl text-[clamp(3.3rem,8vw,7.2rem)] font-black leading-[0.84] text-white">
                {profile.fullName}
              </h2>
              <p className="lab-body mt-7 max-w-2xl">{profile.intro}</p>
            </div>

            <div className="grid gap-3">
              <a
                href={contactLinks.email}
                className="hud-label hud-primary group flex items-center justify-between px-5 py-4 font-black uppercase tracking-[0.08em] text-white transition duration-200 hover:border-[var(--lab-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)]"
              >
                <span className="flex items-center gap-3">
                  <Mail aria-hidden="true" size={18} />
                  {sectionContent.contact.primaryAction}
                </span>
                <ArrowUpRight aria-hidden="true" size={19} />
              </a>

              {optionalLinks.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {optionalLinks.map(({ key, label, href, Icon }) => {
                    const isCv = key === "cv";
                    const opensNewTab = href.startsWith("http");

                    return (
                      <a
                        key={key}
                        href={href}
                        target={opensNewTab ? "_blank" : undefined}
                        rel={opensNewTab ? "noreferrer" : undefined}
                        className={`hud-label flex items-center justify-center gap-2 px-4 py-4 text-sm font-black uppercase tracking-[0.08em] text-white/78 transition duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                          isCv
                            ? "hover:border-[var(--lab-gold)]/45 focus-visible:outline-[var(--lab-gold)]"
                            : "hover:border-[var(--lab-cyan)]/35 focus-visible:outline-[var(--lab-cyan)]"
                        }`}
                      >
                        <Icon aria-hidden="true" size={17} />
                        {label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="relative mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-sm text-white/42 md:flex-row">
            <p>{profile.fullName}</p>
            <p>{profile.location}</p>
            <p>{profile.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
