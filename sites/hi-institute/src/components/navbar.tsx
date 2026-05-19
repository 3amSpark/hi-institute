import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import balanceHormonal from "../assets/tratamientos/balance-hormonal.jpg";
import fertilidad from "../assets/tratamientos/fertilidad.jpg";
import ginecologia from "../assets/tratamientos/ginecologia.jpg";
import metabolismo from "../assets/tratamientos/metabolismo.jpg";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tratamientos", label: "Tratamientos" },
  { href: "/farmacia", label: "Farmacia" },
  { href: "/clinicas", label: "Clínicas" },
  { href: "/contacto", label: "Contacto" },
];

const treatments = [
  {
    href: "/tratamientos/metabolismo-peso",
    label: "Metabolismo & Peso",
    image: metabolismo,
  },
  {
    href: "/tratamientos/fertilidad-reproduccion",
    label: "Fertilidad & Reproducción",
    image: fertilidad,
  },
  {
    href: "/tratamientos/salud-femenina-ginecologica",
    label: "Salud Femenina & Ginecológica",
    image: ginecologia,
  },
  {
    href: "/tratamientos/balance-hormonal",
    label: "Balance Hormonal",
    image: balanceHormonal,
  },
];

type NavbarProps = {
  currentPath: string;
};

const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";

const isActivePath = (currentPath: string, href: string) => {
  const normalizedPath = normalizePath(currentPath);
  const normalizedHref = normalizePath(href);

  return normalizedHref === "/"
    ? normalizedPath === normalizedHref
    : normalizedPath === normalizedHref ||
        normalizedPath.startsWith(`${normalizedHref}/`);
};

const linkClassName = (isActive: boolean) =>
  `group relative inline-flex items-center px-3 py-1.5 font-sans font-medium transition-colors duration-150 hover:text-neutral-800 ${
    isActive ? "text-neutral-900" : "text-neutral-500/80"
  }`;

const underlineClassName =
  "from-brand-blue to-brand-green absolute top-5/6 left-1/2 h-0.5 w-3/4 origin-left -translate-x-1/2 scale-x-0 bg-black bg-linear-to-r transition-all duration-200 ease-out group-hover:scale-x-100";

const mobileLinkClassName = (isActive: boolean, isChild = false) =>
  `flex min-h-18 items-center border-b border-brand-blue/10 px-6 font-sans text-lg font-medium transition-colors hover:text-brand-blue ${
    isActive ? "text-neutral-900" : "text-neutral-700"
  } ${isChild ? "bg-brand-blue/5 pl-10 text-base" : ""}`;

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar({ currentPath }: NavbarProps) {
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileTreatmentsOpen, setIsMobileTreatmentsOpen] = useState(
    isActivePath(currentPath, "/tratamientos"),
  );
  const closeTimeout = useRef<number | undefined>(undefined);
  const isTreatmentsActive = isActivePath(currentPath, "/tratamientos");

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileOpen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  const openTreatments = () => {
    window.clearTimeout(closeTimeout.current);
    setIsTreatmentsOpen(true);
  };

  const closeTreatments = () => {
    closeTimeout.current = window.setTimeout(() => {
      setIsTreatmentsOpen(false);
    }, 120);
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setIsMobileOpen(false)}
        className={`fixed inset-0 top-14 z-40 transition-all duration-200 md:top-[4.125rem] lg:hidden ${
          isMobileOpen
            ? "pointer-events-auto bg-black/30"
            : "pointer-events-none bg-black/0"
        }`}
      />

      <div
        className={`fixed inset-x-0 top-14 z-40 h-[calc(100dvh-3.5rem)] overflow-y-auto bg-linear-to-t from-neutral-100 to-white transition-all duration-200 md:top-[4.125rem] md:h-[calc(100dvh-4.125rem)] lg:hidden ${
          isMobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col">
          <a
            href="/"
            aria-current={isActivePath(currentPath, "/") ? "page" : undefined}
            className={mobileLinkClassName(isActivePath(currentPath, "/"))}
            onClick={() => setIsMobileOpen(false)}
          >
            Inicio
          </a>

          <div>
            <div className="relative">
              <a
                href="/tratamientos"
                aria-current={isTreatmentsActive ? "page" : undefined}
                className={mobileLinkClassName(isTreatmentsActive)}
                onClick={() => setIsMobileOpen(false)}
              >
                Tratamientos
              </a>
              <button
                type="button"
                aria-label="Mostrar tratamientos"
                aria-expanded={isMobileTreatmentsOpen}
                onClick={() => setIsMobileTreatmentsOpen((isOpen) => !isOpen)}
                className="absolute top-1/2 right-3 z-10 -translate-y-1/2 p-3 text-neutral-500/80"
              >
                <ChevronDown
                  className={`size-8 transition-transform duration-300 ${
                    isMobileTreatmentsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isMobileTreatmentsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isMobileTreatmentsOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0"
                  }`}
                >
                  {treatments.map((treatment) => (
                    <a
                      key={treatment.href}
                      href={treatment.href}
                      aria-current={
                        isActivePath(currentPath, treatment.href)
                          ? "page"
                          : undefined
                      }
                      className={mobileLinkClassName(
                        isActivePath(currentPath, treatment.href),
                        true,
                      )}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {treatment.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {navLinks.slice(2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                isActivePath(currentPath, link.href) ? "page" : undefined
              }
              className={mobileLinkClassName(
                isActivePath(currentPath, link.href),
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <header className="fixed top-0 right-0 left-0 z-50 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="/" aria-label="HI Institute International home">
            <img
              src={logo.src}
              alt="HI Health Institute International"
              className="h-auto w-45 max-w-full md:w-50"
            />
          </a>

          <div className="hidden items-center gap-1.5 text-sm lg:flex">
            <a
              href={navLinks[0].href}
              aria-current={
                isActivePath(currentPath, navLinks[0].href) ? "page" : undefined
              }
              className={linkClassName(
                isActivePath(currentPath, navLinks[0].href),
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
              <a
                href="/tratamientos"
                aria-expanded={isTreatmentsOpen}
                aria-current={isTreatmentsActive ? "page" : undefined}
                className={linkClassName(isTreatmentsActive)}
              >
                Tratamientos
                <ChevronDown className="mt-0.5 ml-1 size-4 text-neutral-500/80 transition-transform duration-300 group-hover:rotate-180 group-hover:text-neutral-950" />
                <span aria-hidden="true" className={underlineClassName}></span>
              </a>

              <div
                className={`absolute top-full left-0 w-screen bg-white shadow-lg shadow-black/5 transition-opacity duration-200 ease-out ${
                  isTreatmentsOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <div className="mx-auto flex max-w-7xl justify-center gap-8 px-6 pt-2 pb-5 lg:px-14">
                  {treatments.map((treatment) => (
                    <a
                      key={treatment.href}
                      href={treatment.href}
                      className="hover:text-brand-blue block w-50 text-center font-sans text-sm leading-none font-medium text-neutral-600 transition-colors"
                    >
                      <img
                        src={treatment.image.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="mb-4 aspect-square w-full object-cover"
                      />
                      {treatment.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={
                  isActivePath(currentPath, link.href) ? "page" : undefined
                }
                className={linkClassName(isActivePath(currentPath, link.href))}
              >
                {link.label}
                <span aria-hidden="true" className={underlineClassName}></span>
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((isOpen) => !isOpen)}
            className="group relative flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-0.5 w-6 origin-center bg-neutral-700 transition-all duration-300 ${
                isMobileOpen ? "translate-y-[8px] rotate-45" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-neutral-700 transition-all duration-300 ${
                isMobileOpen ? "scale-0 opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 origin-center bg-neutral-700 transition-all duration-300 ${
                isMobileOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            ></span>
          </button>
        </nav>
      </header>
    </>
  );
}
