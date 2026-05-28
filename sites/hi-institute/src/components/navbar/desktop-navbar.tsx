import { useEffect, useRef, useState } from "react";
import { motion, type MotionValue } from "framer-motion";
import {
  ChevronDown,
  clinics,
  isActivePath,
  linkClassName,
  navLinks,
  treatments,
  underlineClassName,
} from "./shared";

type DesktopNavbarProps = {
  currentPath: string;
  linkColor: MotionValue<string> | string;
  hasTextShadow: boolean;
};

const dropdownTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
} as const;

export default function DesktopNavbar({
  currentPath,
  linkColor,
  hasTextShadow,
}: DesktopNavbarProps) {
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const treatmentsCloseTimeout = useRef<number | undefined>(undefined);
  const clinicsCloseTimeout = useRef<number | undefined>(undefined);
  const isTreatmentsActive = isActivePath(currentPath, "/tratamientos");
  const isDesktopSubmenuOpen = isTreatmentsOpen || isClinicsOpen;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTreatmentsOpen(false);
        setIsClinicsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openTreatments = () => {
    window.clearTimeout(treatmentsCloseTimeout.current);
    setIsClinicsOpen(false);
    setIsTreatmentsOpen(true);
  };

  const closeTreatments = () => {
    treatmentsCloseTimeout.current = window.setTimeout(() => {
      setIsTreatmentsOpen(false);
    }, 120);
  };

  const openClinics = () => {
    window.clearTimeout(clinicsCloseTimeout.current);
    setIsTreatmentsOpen(false);
    setIsClinicsOpen(true);
  };

  const closeClinics = () => {
    clinicsCloseTimeout.current = window.setTimeout(() => {
      setIsClinicsOpen(false);
    }, 120);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-x-0 top-18 bottom-0 z-40 hidden bg-black/30 transition-opacity duration-400 lg:block ${
          isDesktopSubmenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <motion.div
        className="relative z-50 hidden items-center gap-0.5 lg:flex"
        style={{ color: linkColor }}
      >
        <a
          href={navLinks[0].href}
          aria-current={
            isActivePath(currentPath, navLinks[0].href) ? "page" : undefined
          }
          className={linkClassName(
            isActivePath(currentPath, navLinks[0].href),
            hasTextShadow,
          )}
        >
          {navLinks[0].label}
          <span aria-hidden="true" className={underlineClassName}></span>
        </a>

        <div
          onMouseEnter={openTreatments}
          onMouseLeave={closeTreatments}
          onFocus={openTreatments}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsTreatmentsOpen(false);
            }
          }}
        >
          <button
            type="button"
            aria-expanded={isTreatmentsOpen}
            aria-current={isTreatmentsActive ? "page" : undefined}
            className={linkClassName(isTreatmentsActive, hasTextShadow)}
            onClick={() => setIsTreatmentsOpen((isOpen) => !isOpen)}
          >
            Tratamientos
            <ChevronDown
              className={`ml-1 size-4 transition-transform duration-300 group-hover:rotate-180 ${
                hasTextShadow ? "drop-shadow-xs" : ""
              }`}
            />
            <span aria-hidden="true" className={underlineClassName}></span>
          </button>

          <motion.div
            className={`fixed inset-x-0 top-18 z-50 bg-white shadow-lg shadow-black/5 ${
              isTreatmentsOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
            initial={false}
            animate={
              isTreatmentsOpen
                ? {
                    opacity: 1,
                    clipPath: "inset(0% 0% 0% 0%)",
                  }
                : {
                    opacity: 0,
                    clipPath: "inset(0% 0% 100% 0%)",
                  }
            }
            transition={dropdownTransition}
          >
            <div className="group/dropdown mx-auto flex max-w-7xl justify-center gap-8 px-6 pt-2 pb-5 lg:px-14">
              {treatments.map((treatment) => (
                <a
                  key={treatment.href}
                  href={treatment.href}
                  className="hover:text-brand-dark-blue group/item block w-full text-(length:--step--1) leading-none font-medium text-balance text-neutral-800 transition-opacity duration-300 ease-out group-hover/dropdown:opacity-60 hover:opacity-100"
                >
                  <img
                    src={treatment.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="mb-4 aspect-square w-full object-cover"
                  />
                  {treatment.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <a
          href="/farmacia"
          aria-current={
            isActivePath(currentPath, "/farmacia") ? "page" : undefined
          }
          className={linkClassName(
            isActivePath(currentPath, "/farmacia"),
            hasTextShadow,
          )}
        >
          Farmacia
          <span aria-hidden="true" className={underlineClassName}></span>
        </a>

        <div
          onMouseEnter={openClinics}
          onMouseLeave={closeClinics}
          onFocus={openClinics}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsClinicsOpen(false);
            }
          }}
        >
          <button
            type="button"
            aria-expanded={isClinicsOpen}
            className={linkClassName(false, hasTextShadow)}
            onClick={() => setIsClinicsOpen((isOpen) => !isOpen)}
          >
            Clínicas
            <ChevronDown
              className={`ml-1 size-4 transition-transform duration-300 group-hover:rotate-180 ${
                hasTextShadow ? "drop-shadow-xs" : ""
              }`}
            />
            <span aria-hidden="true" className={underlineClassName}></span>
          </button>

          <motion.div
            className={`fixed inset-x-0 top-18 z-50 origin-top bg-white shadow-lg shadow-black/5 ${
              isClinicsOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
            initial={false}
            animate={
              isClinicsOpen
                ? { opacity: 1, scaleY: 1, filter: "blur(0px)" }
                : { opacity: 0, scaleY: 0.82, filter: "blur(6px)" }
            }
            transition={dropdownTransition}
          >
            <div className="group/dropdown mx-auto flex max-w-4xl justify-center gap-8 px-6 pt-2 pb-5 lg:px-14">
              {clinics.map((clinic) => (
                <a
                  key={clinic.href}
                  href={clinic.href}
                  className="hover:text-brand-dark-blue group/item block w-full text-(length:--step--1) leading-none font-medium text-balance text-neutral-800 transition-opacity duration-300 ease-out group-hover/dropdown:opacity-60 hover:opacity-100"
                >
                  <span className="mb-4 flex aspect-square w-full items-center justify-center bg-neutral-100 p-10">
                    <img
                      src={clinic.logo}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full"
                    />
                  </span>
                  <span className="block text-neutral-800">{clinic.label}</span>
                  <span className="mt-1 block text-xs font-normal text-neutral-500">
                    {clinic.description}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {navLinks.slice(2).map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={
              isActivePath(currentPath, link.href) ? "page" : undefined
            }
            className={linkClassName(
              isActivePath(currentPath, link.href),
              hasTextShadow,
            )}
          >
            {link.label}
            <span aria-hidden="true" className={underlineClassName}></span>
          </a>
        ))}
      </motion.div>
    </>
  );
}
