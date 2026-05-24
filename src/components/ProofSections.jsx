import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Award,
  Bot,
  Brain,
  CircuitBoard,
  Cpu,
  FileCheck2,
  Gauge,
  Layers3,
  LockKeyhole,
  Medal,
  Milestone,
  Trophy,
} from "lucide-react";
import {
  achievementSignals,
  certificates,
  proofMetrics,
  sectionContent,
  selectedProjects,
  technicalDomains,
  trajectory,
} from "../data/portfolioData";

const proofIcons = [Gauge, Award, Trophy, Activity];
const domainIcons = [Brain, Bot, CircuitBoard, Activity, Cpu];
const achievementIcons = [Trophy, Medal, Award, Gauge, Activity];

function SectionHeader({ content }) {
  return (
    <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div>
        <p className="lab-kicker">{content.eyebrow}</p>
        <h2 className="lab-heading mt-5">{content.title}</h2>
      </div>
      <p className="lab-body max-w-2xl lg:justify-self-end">{content.intro}</p>
    </div>
  );
}

function ProofMetrics({ reduceMotion }) {
  return (
    <section id="proof" className="lab-section">
      <div className="lab-container">
        <SectionHeader content={sectionContent.proof} />

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {proofMetrics.map((metric, index) => {
            const Icon = proofIcons[index] ?? Gauge;

            return (
              <motion.article
                key={metric.label}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
                viewport={{ once: true, margin: "-80px" }}
                className="hud-card relative min-h-[245px] overflow-hidden p-5"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--lab-cyan)]/45 to-transparent" />
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="mono text-[0.68rem] font-black uppercase tracking-[0.22em] text-white/38">
                      {metric.label}
                    </p>
                    <p className="heading mt-5 text-6xl font-black text-white">{metric.value}</p>
                  </div>
                  <div className="hud-readout grid h-12 w-12 place-items-center text-[var(--lab-cyan)]">
                    <Icon aria-hidden="true" size={21} strokeWidth={1.55} />
                  </div>
                </div>
                <div className="lab-divider my-7" />
                <p className="text-sm leading-7 text-white/58">{metric.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({ reduceMotion }) {
  return (
    <section id="projects" className="lab-section">
      <div className="lab-container">
        <SectionHeader content={sectionContent.projects} />

        <div className="space-y-4">
          {selectedProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: index * 0.07 }}
              viewport={{ once: true, margin: "-100px" }}
              className="hud-frame project-hover group relative overflow-hidden p-5 md:p-7"
            >
              <div className="project-hover-glow absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_60%_30%,rgba(37,99,235,0.16),transparent_54%)] opacity-80" />
              <div className="relative grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
                <div className="flex min-h-[260px] flex-col justify-between border-b border-white/10 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
                  <div>
                    <p className="mono text-[0.68rem] font-black uppercase tracking-[0.24em] text-[var(--lab-cyan)]">
                      {project.code}
                    </p>
                    <h3 className="heading mt-5 text-4xl font-black leading-[0.9] text-white md:text-6xl">
                      {project.title}
                    </h3>
                  </div>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <p className="mono text-[0.68rem] uppercase tracking-[0.2em] text-white/42">
                      {project.status}
                    </p>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="project-hover-arrow text-white/38 transition duration-200 group-hover:text-[var(--lab-cyan)]"
                      size={22}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="hud-readout project-hover-readout p-5">
                    <div className="mb-4 flex items-center gap-3 text-[var(--lab-cyan)]">
                      <Layers3 aria-hidden="true" size={18} />
                      <p className="mono text-[0.65rem] font-black uppercase tracking-[0.2em]">
                        {sectionContent.projects.problemLabel}
                      </p>
                    </div>
                    <p className="leading-7 text-white/66">{project.problem}</p>
                  </div>
                  <div className="hud-readout project-hover-readout p-5">
                    <div className="mb-4 flex items-center gap-3 text-[var(--lab-cyan)]">
                      <Cpu aria-hidden="true" size={18} />
                      <p className="mono text-[0.65rem] font-black uppercase tracking-[0.2em]">
                        {sectionContent.projects.systemLabel}
                      </p>
                    </div>
                    <p className="leading-7 text-white/66">{project.system}</p>
                  </div>
                  <div className="hud-readout project-hover-readout p-5 md:col-span-2">
                    <p className="mono text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--lab-gold)]">
                      {sectionContent.projects.stackLabel}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="hud-label project-hover-chip px-3 py-1.5 text-xs font-bold text-white/68"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="mt-5 leading-7 text-white/62">{project.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Domains({ reduceMotion }) {
  return (
    <section id="domains" className="lab-section">
      <div className="lab-container">
        <SectionHeader content={sectionContent.domains} />

        <div className="grid gap-3 lg:grid-cols-5">
          {technicalDomains.map((domain, index) => {
            const Icon = domainIcons[index] ?? Brain;

            return (
              <motion.article
                key={domain.title}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-80px" }}
                className="hud-card relative min-h-[330px] overflow-hidden p-5"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--lab-cyan)]/40 to-transparent" />
                <div className="hud-readout grid h-14 w-14 place-items-center text-[var(--lab-cyan)]">
                  <Icon aria-hidden="true" size={24} strokeWidth={1.45} />
                </div>
                <p className="mono mt-8 text-[0.64rem] font-black uppercase tracking-[0.22em] text-white/38">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="heading mt-4 text-3xl font-black leading-[0.95] text-white">
                  {domain.title}
                </h3>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-[var(--lab-gold)]">
                  {domain.signal}
                </p>
                <p className="mt-5 text-sm leading-7 text-white/58">{domain.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Achievements({ reduceMotion }) {
  return (
    <section id="achievements" className="lab-section">
      <div className="lab-container">
        <SectionHeader content={sectionContent.achievements} />

        <div className="grid gap-4 md:grid-cols-2">
          {achievementSignals.map((signal, index) => {
            const Icon = achievementIcons[index] ?? Trophy;
            const isGold = signal.type === "Award" || signal.type === "Hackathon";

            return (
              <motion.article
                key={signal.label}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.46, delay: index * 0.06 }}
                viewport={{ once: true, margin: "-80px" }}
                className={`hud-card relative overflow-hidden p-6 ${isGold ? "hud-gold" : ""}`}
              >
                <div
                  className={`absolute right-0 top-0 h-44 w-44 rounded-full blur-3xl ${
                    isGold ? "bg-[var(--lab-gold)]/12" : "bg-[var(--lab-cyan)]/12"
                  }`}
                />
                <div className="relative flex items-start gap-5">
                  <div
                    className={`hud-readout grid h-14 w-14 shrink-0 place-items-center ${
                      isGold
                        ? "hud-gold text-[var(--lab-gold)]"
                        : "text-[var(--lab-cyan)]"
                    }`}
                  >
                    <Icon aria-hidden="true" size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="mono text-[0.66rem] font-black uppercase tracking-[0.22em] text-white/40">
                      {signal.type}
                    </p>
                    <h3 className="heading mt-4 text-4xl font-black leading-none text-white">
                      {signal.label}
                    </h3>
                    <p className="mt-5 leading-7 text-white/60">{signal.detail}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Certificates({ reduceMotion }) {
  return (
    <section id="certificates" className="lab-section">
      <div className="lab-container">
        <SectionHeader content={sectionContent.certificates} />

        <div className="hud-frame overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.42fr_1fr]">
            <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
              <div className="hud-readout grid h-16 w-16 place-items-center text-[var(--lab-cyan)]">
                <LockKeyhole aria-hidden="true" size={28} strokeWidth={1.45} />
              </div>
              <p className="mono mt-8 text-[0.66rem] font-black uppercase tracking-[0.22em] text-white/40">
                {sectionContent.certificates.panelEyebrow}
              </p>
              <h3 className="heading mt-4 text-4xl font-black leading-none text-white">
                {sectionContent.certificates.panelTitle}
              </h3>
            </div>

            <div className="grid md:grid-cols-2">
              {certificates.map((certificate, index) => {
                const hasCredentialUrl = Boolean(certificate.credentialUrl);
                const CertificateFrame = hasCredentialUrl ? motion.a : motion.div;

                return (
                  <CertificateFrame
                    key={certificate.name}
                    href={hasCredentialUrl ? certificate.credentialUrl : undefined}
                    target={hasCredentialUrl ? "_blank" : undefined}
                    rel={hasCredentialUrl ? "noreferrer" : undefined}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`hud-readout block border-b border-white/10 p-6 md:border-r md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 ${
                      hasCredentialUrl
                        ? "lab-interactive lab-clickable hud-hover transition duration-200 hover:border-[var(--lab-cyan)]/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)]"
                        : ""
                    }`}
                  >
                    <div className="mb-7 flex items-center justify-between gap-4">
                      <FileCheck2
                        aria-hidden="true"
                        className="text-[var(--lab-cyan)]"
                        size={22}
                        strokeWidth={1.55}
                      />
                      <span className="hud-label mono px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/48">
                        {certificate.issueDate}
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-white">{certificate.name}</h4>
                    <p className="mt-3 text-sm text-white/48">{certificate.issuer}</p>
                    <p className="mono mt-4 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--lab-cyan)]">
                      {certificate.platform}
                      {certificate.credentialId ? ` / ${certificate.credentialId}` : ""}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-black text-white/58">
                      {hasCredentialUrl ? "Open credential" : "No credential URL shown"}
                      {hasCredentialUrl && <ArrowUpRight aria-hidden="true" size={16} />}
                    </p>
                  </CertificateFrame>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trajectory({ reduceMotion }) {
  return (
    <section id="trajectory" className="lab-section">
      <div className="lab-container">
        <SectionHeader content={sectionContent.trajectory} />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--lab-cyan)]/0 via-[var(--lab-cyan)]/38 to-[var(--lab-cyan)]/0 md:block" />
          <div className="space-y-4">
            {trajectory.map((item, index) => (
              <motion.article
                key={item.phase}
                initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.44, delay: index * 0.07 }}
                viewport={{ once: true, margin: "-80px" }}
                className="grid gap-4 md:grid-cols-[56px_1fr]"
              >
                <div className="relative hidden md:grid">
                  <div className="hud-readout grid h-9 w-9 place-items-center text-[var(--lab-cyan)]">
                    <Milestone aria-hidden="true" size={18} strokeWidth={1.55} />
                  </div>
                </div>
                <div className="hud-card p-6">
                  <p className="mono text-[0.68rem] font-black uppercase tracking-[0.22em] text-[var(--lab-gold)]">
                    {item.phase}
                  </p>
                  <h3 className="heading mt-4 text-4xl font-black leading-none text-white">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-3xl leading-7 text-white/60">{item.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProofSections() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <ProofMetrics reduceMotion={reduceMotion} />
      <Projects reduceMotion={reduceMotion} />
      <Domains reduceMotion={reduceMotion} />
      <Achievements reduceMotion={reduceMotion} />
      <Certificates reduceMotion={reduceMotion} />
      <Trajectory reduceMotion={reduceMotion} />
    </>
  );
}
