import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Radar } from "lucide-react";
import { heroActions, heroModules, profile, sectionContent } from "../data/portfolioData";
import ring1 from "../assets/1.png";
import ring2 from "../assets/2.png";
import ring3 from "../assets/3.png";
import ring4 from "../assets/4.png";
import ring5 from "../assets/5.png";
import ring6 from "../assets/6.png";

const ICONS = {
  ArrowRight,
  Radar,
};

const RING_IMAGES = [ring1, ring2, ring3, ring4, ring5, ring6];

function getRingImage(activeModule) {
  const moduleIndex = heroModules.findIndex((module) => module.id === activeModule?.id);

  return RING_IMAGES[moduleIndex] ?? activeModule?.image ?? ring1;
}

const MOBILE_QUERY = "(max-width: 767px)";
const SWIPE_THRESHOLD = 40;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function getInitialIsMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getInitialIsMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  return isMobile;
}

function SideRail({ activeModule, direction, reduceMotion, side, mobile = false }) {
  const isLeft = side === "left";
  const enterX = mobile ? (direction > 0 ? 18 : -18) : isLeft ? -24 : 24;
  const exitX = mobile ? (direction > 0 ? -18 : 18) : isLeft ? 24 : -24;
  const sideRailClass = mobile
    ? "hud-card relative overflow-hidden p-4"
    : "hud-card relative min-h-[104px] overflow-hidden p-2.5 sm:min-h-[136px] sm:p-4 lg:min-h-[300px] lg:p-4 xl:min-h-[320px] xl:p-5";
  const motionInitial = reduceMotion
    ? false
    : mobile
      ? { opacity: 0, x: enterX }
      : { opacity: 0, x: enterX, filter: "blur(10px)" };
  const motionAnimate = mobile
    ? { opacity: 1, x: 0 }
    : { opacity: 1, x: 0, filter: "blur(0px)" };
  const motionExit = reduceMotion
    ? undefined
    : mobile
      ? { opacity: 0, x: exitX }
      : { opacity: 0, x: exitX, filter: "blur(10px)" };

  return (
    <aside className={sideRailClass}>
      <div
        className={`absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--lab-cyan)]/45 to-transparent ${
          isLeft ? "right-0" : "left-0"
        }`}
      />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${side}-${activeModule.id}`}
          custom={direction}
          initial={motionInitial}
          animate={motionAnimate}
          exit={motionExit}
          transition={{ duration: reduceMotion ? 0.08 : mobile ? 0.26 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex h-full flex-col ${isLeft ? "text-left" : "text-left lg:text-right"}`}
        >
          {isLeft ? (
            <>
              <p className="lab-kicker">{activeModule.eyebrow}</p>
              <h2 className="heading mt-2 text-[clamp(1.35rem,7vw,2.1rem)] font-black leading-[0.94] sm:mt-2 lg:mt-4 lg:text-[clamp(1.12rem,4.2vw,3.2rem)] lg:leading-[0.9]">
                {activeModule.title}
              </h2>
              <p className="lab-body mt-2 max-w-md text-sm leading-6 sm:mt-2 lg:mt-4 lg:text-sm xl:text-base">
                {activeModule.description}
              </p>
            </>
          ) : (
            <>
              <p className="mono text-[0.62rem] font-black uppercase tracking-[0.2em] text-[var(--lab-gold)] sm:text-[0.68rem] sm:tracking-[0.24em]">
                {sectionContent.hero.activeEvidenceLabel}
              </p>
              <p className="mt-2 text-sm font-black text-white lg:mt-3 lg:text-base">{activeModule.railTitle}</p>
              <p className="mt-2 text-sm leading-6 text-white/58 lg:mt-3">{activeModule.proof}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 lg:mt-auto lg:gap-3 lg:pt-5">
                <div className="hud-readout p-2 lg:p-3">
                  <p className="heading text-xl font-black text-white sm:text-2xl lg:text-3xl">{activeModule.metric}</p>
                  <p className="mono mt-1.5 text-[0.56rem] font-bold uppercase tracking-[0.14em] text-white/42 sm:text-[0.62rem] sm:tracking-[0.18em]">
                    {activeModule.metricLabel}
                  </p>
                </div>
                <div className="hud-readout p-2 lg:p-3">
                  <p className="heading text-xl font-black text-[var(--lab-cyan)] sm:text-2xl lg:text-3xl">
                    {String(heroModules.findIndex((item) => item.id === activeModule.id) + 1).padStart(2, "0")}
                  </p>
                  <p className="mono mt-1.5 text-[0.56rem] font-bold uppercase tracking-[0.14em] text-white/42 sm:text-[0.62rem] sm:tracking-[0.18em]">
                    {sectionContent.hero.ringIndexLabel}
                  </p>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

/*
function GlassRingCSS({ activeModule, direction, reduceMotion, motionAxis = "vertical", mobile = false }) {
  const Icon = ICONS[activeModule.icon] ?? Atom;
  const offsetKey = motionAxis === "horizontal" ? "x" : "y";
  const motionDistance = mobile ? 118 : 260;
  const enterOffset =
    motionAxis === "horizontal"
      ? direction > 0
        ? motionDistance
        : -motionDistance
      : direction > 0
        ? -motionDistance
        : motionDistance;
  const exitOffset =
    motionAxis === "horizontal"
      ? direction > 0
        ? -motionDistance
        : motionDistance
      : direction > 0
        ? motionDistance
        : -motionDistance;
  const ringInitial = reduceMotion
    ? false
    : mobile
      ? { [offsetKey]: enterOffset, opacity: 0, scale: 0.96 }
      : { [offsetKey]: enterOffset, opacity: 0, scale: 0.82, filter: "blur(20px)" };
  const ringAnimate = mobile
    ? { [offsetKey]: 0, opacity: 1, scale: 1 }
    : { [offsetKey]: 0, opacity: 1, scale: 1, filter: "blur(0px)" };
  const ringExit = reduceMotion
    ? undefined
    : mobile
      ? { [offsetKey]: exitOffset, opacity: 0, scale: 0.96 }
      : { [offsetKey]: exitOffset, opacity: 0, scale: 0.82, filter: "blur(20px)" };
  const ringShellClass = mobile
    ? "relative isolate grid h-[176px] w-[176px] place-items-center rounded-full min-[390px]:h-[190px] min-[390px]:w-[190px] sm:h-[230px] sm:w-[230px]"
    : "relative isolate grid h-[180px] w-[180px] place-items-center rounded-full sm:h-[230px] sm:w-[230px] md:h-[270px] md:w-[270px] lg:h-[340px] lg:w-[340px] xl:h-[370px] xl:w-[370px]";
  const outerGlowClass = mobile
    ? "absolute inset-[-8%] rounded-full opacity-70 blur-xl"
    : "absolute inset-[-12%] rounded-full blur-3xl";
  const baseRingShadow = mobile
    ? `
      0 0 22px rgba(86,215,255,0.22),
      0 0 58px ${activeModule.energy},
      inset 0 0 24px rgba(255,255,255,0.12),
      inset 0 0 42px rgba(86,215,255,0.12),
      inset 0 -28px 62px rgba(1,6,24,0.86)
    `
    : `
      0 0 42px rgba(86,215,255,0.36),
      0 0 126px ${activeModule.energy},
      inset 0 0 32px rgba(255,255,255,0.16),
      inset 0 0 72px rgba(86,215,255,0.16),
      inset 0 -38px 84px rgba(1,6,24,0.9)
    `;

  return (
    <div className="relative grid min-h-[210px] place-items-center min-[390px]:min-h-[224px] sm:min-h-[270px] md:min-h-[310px] lg:min-h-[410px] xl:min-h-[440px]">
      <AnimatePresence mode={mobile ? "sync" : "wait"} custom={direction}>
        <motion.div
          key={activeModule.id}
          custom={direction}
          initial={ringInitial}
          animate={ringAnimate}
          exit={ringExit}
          transition={{ duration: reduceMotion ? 0.08 : mobile ? 0.28 : 0.76, ease: [0.2, 0.9, 0.2, 1] }}
          className={ringShellClass}
        >
          <div
            className="absolute bottom-[-12%] left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-full opacity-75 blur-xl lg:bottom-[-16%] lg:h-24 lg:w-[78%] lg:opacity-100 lg:blur-2xl xl:h-28"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(86,215,255,0.58), rgba(37,99,235,0.24) 42%, transparent 72%)",
            }}
          />
          <div
            className={outerGlowClass}
            style={{
              background: `radial-gradient(circle, ${activeModule.energy}, rgba(37,99,235,0.14) 36%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 31% 24%, rgba(255,255,255,0.56), rgba(156,236,255,0.18) 21%, transparent 43%),
                conic-gradient(from 215deg, rgba(255,255,255,0.88), rgba(86,215,255,0.16) 13%, rgba(2,18,73,0.34) 29%, rgba(0,195,255,0.82) 43%, rgba(2,18,73,0.22) 57%, rgba(203,213,225,0.76) 73%, rgba(0,195,255,0.9) 88%, rgba(255,255,255,0.72)),
                radial-gradient(circle at 50% 54%, rgba(16,56,155,0.62) 0 52%, rgba(2,11,42,0.82) 63%, rgba(4,35,111,0.74) 78%, rgba(9,68,177,0.48) 100%)
              `,
              border: "1px solid rgba(220, 242, 255, 0.5)",
              boxShadow: baseRingShadow,
              backdropFilter: mobile ? "blur(12px) saturate(125%)" : "blur(30px) saturate(165%)",
              WebkitBackdropFilter: mobile ? "blur(12px) saturate(125%)" : "blur(30px) saturate(165%)",
            }}
          />
          <div
            className="absolute inset-[10%] rounded-full border border-[rgba(156,236,255,0.52)]"
            style={{
              boxShadow:
                "0 0 28px rgba(86,215,255,0.58), inset 0 0 26px rgba(86,215,255,0.26)",
            }}
          />
          <div
            className="absolute inset-[15.5%] rounded-full"
            style={{
              background: `
                radial-gradient(circle at 31% 25%, rgba(156,236,255,0.42), rgba(37,99,235,0.28) 28%, transparent 46%),
                radial-gradient(circle at 54% 58%, rgba(37,99,235,0.34), rgba(3,12,45,0.72) 62%, rgba(1,6,24,0.88))
              `,
              border: "1px solid rgba(180,232,255,0.44)",
              boxShadow: `
                0 0 20px rgba(86,215,255,0.5),
                inset 0 0 36px rgba(86,215,255,0.2),
                inset 0 -24px 58px rgba(0,0,0,0.58)
              `,
            }}
          />
          <div className="absolute left-[14%] top-[12%] h-[24%] w-[66%] -rotate-[16deg] rounded-[50%] bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.06)_52%,transparent)] blur-[1px] mix-blend-screen" />
          <div className="absolute right-[7%] top-[23%] h-[23%] w-[20%] rotate-[38deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(156,236,255,0.54),transparent)] blur-[0.5px] mix-blend-screen" />
          <div className="absolute bottom-[2.5%] left-[18%] h-[3.5%] w-[64%] rounded-full bg-[rgba(156,236,255,0.76)] blur-[2px]" />
          <div className="absolute inset-[0.8%] rounded-full border border-white/24" />

          <motion.div
            className="relative z-20 grid h-[72px] w-[72px] place-items-center rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 xl:h-36 xl:w-36"
            animate={reduceMotion || mobile ? false : { y: [0, -8, 0] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle, rgba(156,236,255,0.18), ${activeModule.energy} 42%, transparent 70%)`,
              filter: mobile
                ? "drop-shadow(0 0 12px rgba(156,236,255,0.36))"
                : "drop-shadow(0 0 24px rgba(156,236,255,0.62))",
            }}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.55}
              className="h-12 w-12 text-[var(--lab-white)] sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
              style={{
                filter: mobile
                  ? `drop-shadow(0 0 12px rgba(156,236,255,0.56))`
                  : `drop-shadow(0 0 16px rgba(156,236,255,0.92)) drop-shadow(0 0 36px ${activeModule.energy})`,
              }}
            />
            <span className="sr-only">{activeModule.label}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function GlassRingImage({ activeModule, direction, reduceMotion, motionAxis = "vertical", mobile = false }) {
  const Icon = ICONS[activeModule.icon] ?? Atom;
  const offsetKey = motionAxis === "horizontal" ? "x" : "y";
  const motionDistance = mobile ? 116 : 260;
  const enterOffset =
    motionAxis === "horizontal"
      ? direction > 0
        ? motionDistance
        : -motionDistance
      : direction > 0
        ? -motionDistance
        : motionDistance;
  const exitOffset =
    motionAxis === "horizontal"
      ? direction > 0
        ? -motionDistance
        : motionDistance
      : direction > 0
        ? motionDistance
        : -motionDistance;
  const rotateKey = motionAxis === "horizontal" ? "rotateY" : "rotateX";
  const enterRotation = mobile
    ? direction > 0
      ? -7
      : 7
    : direction > 0
      ? -11
      : 11;
  const exitRotation = mobile
    ? direction > 0
      ? -7
      : 7
    : direction > 0
      ? 13
      : -13;
  const ringInitial = reduceMotion
    ? false
    : {
        [offsetKey]: enterOffset,
        [rotateKey]: enterRotation,
        opacity: 0,
        rotateZ: mobile ? 0 : direction > 0 ? -2.5 : 2.5,
        scale: mobile ? 0.94 : 0.82,
      };
  const ringAnimate = {
    [offsetKey]: 0,
    [rotateKey]: 0,
    opacity: 1,
    rotateZ: 0,
    scale: 1,
  };
  const ringExit = reduceMotion
    ? undefined
    : {
        [offsetKey]: exitOffset,
        [rotateKey]: exitRotation,
        opacity: 0,
        rotateZ: mobile ? 0 : direction > 0 ? 2.5 : -2.5,
        scale: mobile ? 0.94 : 0.78,
      };
  const ringShellClass = mobile
    ? "relative isolate grid h-[184px] w-[184px] place-items-center min-[390px]:h-[198px] min-[390px]:w-[198px] sm:h-[238px] sm:w-[238px]"
    : "relative isolate grid h-[184px] w-[184px] place-items-center sm:h-[238px] sm:w-[238px] md:h-[280px] md:w-[280px] lg:h-[350px] lg:w-[350px] xl:h-[380px] xl:w-[380px]";
  const iconShellClass = mobile
    ? "absolute left-1/2 top-1/2 z-20 grid h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
    : "absolute left-1/2 top-1/2 z-20 grid h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full";

  return (
    <div className="relative grid min-h-[214px] place-items-center min-[390px]:min-h-[230px] sm:min-h-[284px] md:min-h-[324px] lg:min-h-[430px] xl:min-h-[456px]">
      <AnimatePresence mode={mobile ? "sync" : "wait"} custom={direction}>
        <motion.div
          key={activeModule.id}
          custom={direction}
          initial={ringInitial}
          animate={ringAnimate}
          exit={ringExit}
          transition={{ duration: reduceMotion ? 0.08 : mobile ? 0.3 : 0.72, ease: [0.2, 0.9, 0.2, 1] }}
          className={ringShellClass}
          style={{
            transformPerspective: mobile ? 720 : 980,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute bottom-[3%] left-1/2 h-[15%] w-[66%] -translate-x-1/2 rounded-full blur-xl lg:blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(86,215,255,0.58), rgba(37,99,235,0.28) 42%, transparent 72%)",
              opacity: mobile ? 0.62 : 0.88,
            }}
          />

          <img
            src={ringImage}
            alt=""
            aria-hidden="true"
            draggable="false"
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
            style={{
              filter: mobile
                ? "drop-shadow(0 0 18px rgba(86,215,255,0.2)) saturate(1.05)"
                : "drop-shadow(0 0 28px rgba(86,215,255,0.3)) drop-shadow(0 0 54px rgba(37,99,235,0.18)) saturate(1.08)",
              opacity: mobile ? 0.92 : 0.98,
              transform: "scale(1.36)",
              transformOrigin: "50% 50%",
            }}
          />

          <div
            aria-hidden="true"
            className={iconShellClass}
            style={{
              background: `
                radial-gradient(circle at 32% 24%, rgba(247,251,255,0.22), transparent 28%),
                radial-gradient(circle at 50% 56%, rgba(37,99,235,0.5), rgba(2,11,42,0.94) 66%, rgba(1,6,24,0.98))
              `,
              border: "1px solid rgba(156,236,255,0.52)",
              boxShadow: mobile
                ? `
                  0 0 20px rgba(86,215,255,0.2),
                  inset 0 0 18px rgba(86,215,255,0.16),
                  inset 0 -18px 34px rgba(0,0,0,0.58)
                `
                : `
                  0 0 28px rgba(86,215,255,0.28),
                  0 0 58px ${activeModule.energy},
                  inset 0 0 26px rgba(86,215,255,0.2),
                  inset 0 -22px 48px rgba(0,0,0,0.62)
                `,
            }}
          />

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-30 h-[31%] w-[31%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${activeModule.energy}, rgba(86,215,255,0.12) 48%, transparent 72%)`,
              opacity: mobile ? 0.3 : 0.42,
            }}
          />

          <motion.div
            className="relative z-40 grid h-[68px] w-[68px] place-items-center rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 xl:h-36 xl:w-36"
            animate={reduceMotion || mobile ? false : { y: [0, -5, 0], scale: [1, 1.015, 1] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-11 w-11 text-[var(--lab-white)] sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
              style={{
                filter: mobile
                  ? "drop-shadow(0 0 10px rgba(156,236,255,0.58))"
                  : `drop-shadow(0 0 16px rgba(156,236,255,0.9)) drop-shadow(0 0 34px ${activeModule.energy})`,
              }}
            />
            <span className="sr-only">{activeModule.label}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function GlassRing(props) {
  return USE_IMAGE_RING ? <GlassRingImage {...props} /> : <GlassRingCSS {...props} />;
}
*/

function GlassRing({ activeModule, direction, reduceMotion, motionAxis = "vertical", mobile = false }) {
  const offsetKey = motionAxis === "horizontal" ? "x" : "y";
  const rotateKey = motionAxis === "horizontal" ? "rotateY" : "rotateX";
  const motionDistance = mobile ? 116 : 260;
  const enterOffset =
    motionAxis === "horizontal"
      ? direction > 0
        ? motionDistance
        : -motionDistance
      : direction > 0
        ? -motionDistance
        : motionDistance;
  const exitOffset =
    motionAxis === "horizontal"
      ? direction > 0
        ? -motionDistance
        : motionDistance
      : direction > 0
        ? motionDistance
        : -motionDistance;
  const enterRotation = mobile
    ? direction > 0
      ? -5
      : 5
    : direction > 0
      ? -10
      : 10;
  const exitRotation = mobile
    ? direction > 0
      ? -5
      : 5
    : direction > 0
      ? 12
      : -12;
  const ringInitial = reduceMotion
    ? false
    : {
        [offsetKey]: enterOffset,
        [rotateKey]: enterRotation,
        opacity: 0,
        rotateZ: mobile ? 0 : direction > 0 ? -2 : 2,
        scale: mobile ? 0.96 : 0.84,
      };
  const ringAnimate = {
    [offsetKey]: 0,
    [rotateKey]: 0,
    opacity: 1,
    rotateZ: 0,
    scale: 1,
  };
  const ringExit = reduceMotion
    ? undefined
    : {
        [offsetKey]: exitOffset,
        [rotateKey]: exitRotation,
        opacity: 0,
        rotateZ: mobile ? 0 : direction > 0 ? 2 : -2,
        scale: mobile ? 0.96 : 0.82,
      };
  const ringShellClass = mobile
    ? "relative isolate grid h-[224px] w-[224px] place-items-center min-[390px]:h-[244px] min-[390px]:w-[244px] sm:h-[292px] sm:w-[292px]"
    : "relative isolate grid h-[224px] w-[224px] place-items-center sm:h-[292px] sm:w-[292px] md:h-[340px] md:w-[340px] lg:h-[430px] lg:w-[430px] xl:h-[468px] xl:w-[468px]";
  const activeRingImage = getRingImage(activeModule);

  return (
    <div className="relative grid min-h-[236px] place-items-center min-[390px]:min-h-[258px] sm:min-h-[318px] md:min-h-[360px] lg:min-h-[456px] xl:min-h-[488px]">
      <AnimatePresence mode={mobile ? "sync" : "wait"} custom={direction}>
        <motion.div
          key={activeModule.id}
          custom={direction}
          initial={ringInitial}
          animate={ringAnimate}
          exit={ringExit}
          transition={{ duration: reduceMotion ? 0.08 : mobile ? 0.3 : 0.72, ease: [0.2, 0.9, 0.2, 1] }}
          className={ringShellClass}
          style={{
            transformPerspective: mobile ? 720 : 980,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={activeRingImage}
            alt=""
            aria-hidden="true"
            draggable="false"
            className="pointer-events-none h-full w-full select-none object-contain"
            style={{
              filter: mobile
                ? "drop-shadow(0 0 16px rgba(86,215,255,0.18))"
                : "drop-shadow(0 0 26px rgba(86,215,255,0.28)) drop-shadow(0 0 48px rgba(37,99,235,0.18))",
            }}
          />
          <span className="sr-only">{activeModule.label}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function RingControls({ activeIndex, onSelect }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      {heroModules.map((module, index) => (
        <button
          key={module.id}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Activate ${module.label}`}
          aria-current={index === activeIndex ? "true" : undefined}
          className={`lab-interactive lab-clickable lab-dot-button grid h-9 place-items-center rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-cyan)] ${
            index === activeIndex ? "w-14" : "w-9"
          }`}
        >
          <span
            className={`block h-2.5 rounded-full transition-all duration-200 ${
              index === activeIndex ? "w-11 bg-[var(--lab-cyan)]" : "w-2.5 bg-white/24"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function HeroActions({ compact = false }) {
  return (
    <div className={compact ? "flex flex-wrap items-center justify-center gap-2" : "hidden items-center gap-3 md:flex"}>
      {heroActions.map((action) => {
        const Icon = ICONS[action.icon] ?? ArrowRight;
        const isPrimary = action.variant === "primary";

        return (
          <a
            key={action.href}
            href={action.href}
            className={`hud-label lab-interactive lab-clickable lab-button lab-hover-scan inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.1em] text-white transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
              compact ? "min-h-11 min-w-[136px] px-4 py-3 text-[0.68rem]" : "px-5 py-3 text-sm"
            } ${
              isPrimary
                ? "hud-primary hover:border-[var(--lab-cyan)] focus-visible:outline-[var(--lab-cyan)]"
                : "text-white/80 hover:border-[var(--lab-gold)]/50 hover:text-white focus-visible:outline-[var(--lab-gold)]"
            }`}
          >
            <span aria-hidden="true" className="lab-scan-line" />
            <span className="relative z-10">{action.label}</span>
            <Icon aria-hidden="true" className="relative z-10" size={17} />
          </a>
        );
      })}
    </div>
  );
}

export default function HeroLab() {
  const wrapperRef = useRef(null);
  const frameRef = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const activeModule = heroModules[activeIndex] ?? heroModules[0];

  const updateActiveIndex = useCallback((nextIndex) => {
    const clampedIndex = clamp(nextIndex, 0, heroModules.length - 1);

    setActiveIndex((currentIndex) => {
      if (clampedIndex === currentIndex) return currentIndex;

      setDirection(clampedIndex > currentIndex ? 1 : -1);
      return clampedIndex;
    });
  }, []);

  useEffect(() => {
    if (isMobile) return undefined;

    const updateFromScroll = () => {
      if (!wrapperRef.current) return;

      const wrapper = wrapperRef.current;
      const rect = wrapper.getBoundingClientRect();
      const scrollRange = Math.max(1, wrapper.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollRange, 0, 1);

      // The hero wrapper is intentionally one viewport taller than the number of modules.
      // This gives the final glass ring a full readable moment before the page exits the pinned hero.
      const nextIndex = clamp(
        Math.floor(progress * heroModules.length),
        0,
        heroModules.length - 1
      );

      updateActiveIndex(nextIndex);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isMobile, updateActiveIndex]);

  const scrollToModule = useCallback(
    (nextIndex) => {
      if (!wrapperRef.current || nextIndex < 0 || nextIndex >= heroModules.length) return;

      updateActiveIndex(nextIndex);

      const wrapperTop = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollRange = wrapperRef.current.offsetHeight - window.innerHeight;
      const moduleProgress = nextIndex / heroModules.length;

      window.scrollTo({
        top: wrapperTop + scrollRange * moduleProgress,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion, updateActiveIndex]
  );

  const selectMobileModule = useCallback(
    (nextIndex) => {
      updateActiveIndex(nextIndex);
    },
    [updateActiveIndex]
  );

  const handleTouchStart = useCallback((event) => {
    const touch = event.touches[0];
    if (!touch) return;

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      updateActiveIndex(activeIndex + (deltaX < 0 ? 1 : -1));
    },
    [activeIndex, updateActiveIndex]
  );

  if (isMobile) {
    return (
      <section
        ref={wrapperRef}
        id="home"
        className="relative min-h-[100svh] overflow-x-hidden px-4 pb-12 pt-[5.75rem] text-white min-[430px]:pt-24"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-3 min-[430px]:gap-4">
          <div className="text-center">
            <p className="lab-kicker text-[var(--lab-gold)]">{sectionContent.hero.eyebrow}</p>
            <h1 className="heading mx-auto mt-2 max-w-[22rem] text-[clamp(2.15rem,12.5vw,3.6rem)] font-black leading-[0.9]">
              {profile.displayName}
            </h1>
            <p className="lab-glow-text mono mx-auto mt-2 max-w-[19rem] text-[0.62rem] font-black uppercase tracking-[0.14em] text-[var(--lab-cyan-soft)]">
              {profile.title}
            </p>
          </div>

          <div
            className="grid gap-3 [touch-action:pan-y]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <GlassRing
              activeModule={activeModule}
              direction={direction}
              reduceMotion={reduceMotion}
              motionAxis="horizontal"
              mobile
            />

            <RingControls activeIndex={activeIndex} onSelect={selectMobileModule} />

            <HeroActions compact />

            <SideRail
              activeModule={activeModule}
              direction={direction}
              reduceMotion={reduceMotion}
              side="left"
              mobile
            />

            <SideRail
              activeModule={activeModule}
              direction={direction}
              reduceMotion={reduceMotion}
              side="right"
              mobile
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapperRef}
      id="home"
      className="relative text-white"
      style={{ height: `${(heroModules.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 grid h-screen place-items-center px-4 py-2 sm:px-5 sm:py-3 lg:px-6">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-1.5 sm:gap-3 lg:grid-cols-[0.78fr_1.1fr_0.78fr] lg:gap-4 xl:grid-cols-[0.82fr_1.12fr_0.82fr] xl:gap-5">
          <div className="order-1 lg:order-1">
            <SideRail
              activeModule={activeModule}
              direction={direction}
              reduceMotion={reduceMotion}
              side="left"
            />
          </div>

          <div className="order-2 lg:order-2">
            <div className="mb-1 text-center sm:mb-2 lg:mb-3">
              <p className="lab-kicker text-[var(--lab-gold)]">{sectionContent.hero.eyebrow}</p>
              <h1 className="heading mx-auto mt-1.5 max-w-4xl text-[clamp(2rem,5.6vw,5.7rem)] font-black leading-[0.84] sm:mt-2">
                {profile.displayName}
              </h1>
              <p className="lab-glow-text mono mt-1.5 text-[0.56rem] font-black uppercase tracking-[0.14em] text-[var(--lab-cyan-soft)] sm:mt-2 sm:text-[0.66rem] sm:tracking-[0.2em]">
                {profile.title}
              </p>
            </div>

            <GlassRing
              activeModule={activeModule}
              direction={direction}
              reduceMotion={reduceMotion}
            />

            <div className="mt-1 flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
              <RingControls activeIndex={activeIndex} onSelect={scrollToModule} />
              <HeroActions />
            </div>
          </div>

          <div className="order-3">
            <SideRail
              activeModule={activeModule}
              direction={direction}
              reduceMotion={reduceMotion}
              side="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
