import { useEffect, useRef, useState } from "react";

const logo = "/assets/logo.svg";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/farmacia", label: "Farmacia" },
  { href: "/contacto", label: "Contacto" },
];

const treatments = [
  {
    href: "/tratamientos/metabolismo-peso",
    label: "Metabolismo & Peso",
    image: "/assets/tratamientos/metabolismo.jpg",
  },
  {
    href: "/tratamientos/fertilidad-reproduccion",
    label: "Fertilidad & Reproducción",
    image: "/assets/tratamientos/fertilidad.jpg",
  },
  {
    href: "/tratamientos/salud-femenina-ginecologica",
    label: "Salud Femenina & Ginecológica",
    image: "/assets/tratamientos/ginecologia.jpg",
  },
  {
    href: "/tratamientos/balance-hormonal",
    label: "Balance Hormonal",
    image: "/assets/tratamientos/balance-hormonal.jpg",
  },
  {
    href: "/tratamientos/diabetes",
    label: "Diabetes",
    image: "/assets/tratamientos/diabetes.jpg",
  },
];

const clinics = [
  {
    href: "https://hiskinbeauty.com/",
    label: "HI Skin & Beauty",
    description: "Dermatología y estética médica",
    logo: "/assets/clinicas/skin.svg",
  },
  {
    href: "https://femcare.hiinstitute.com/",
    label: "HI Fem Care",
    description: "Ginecología y salud íntima",
    logo: "/assets/clinicas/femcare.svg",
  },
  {
    href: "https://initiafertilitycenter.com/",
    label: "initia",
    description: "Fertilidad accesible",
    logo: "/assets/clinicas/initia.svg",
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
  `group relative inline-flex items-center font-[480]  px-2 py-1.5 text-(length:--step--1) transition-colors duration-150 hover:text-neutral-800
`;

const underlineClassName =
  "from-brand-blue to-brand-green absolute top-5/6 left-1/2 h-0.5 w-3/4 origin-left -translate-x-1/2 scale-x-0 bg-black bg-linear-to-r transition-all duration-200 ease-out group-hover:scale-x-100";

const mobileLinkClassName = (isActive: boolean, isChild = false) =>
  `flex min-h-18 items-center border-b border-brand-blue/10 px-6 text-lg font-medium transition-colors hover:text-brand-blue ${
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
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileTreatmentsOpen, setIsMobileTreatmentsOpen] = useState(
    isActivePath(currentPath, "/tratamientos"),
  );
  const [isMobileClinicsOpen, setIsMobileClinicsOpen] = useState(false);
  const treatmentsCloseTimeout = useRef<number | undefined>(undefined);
  const clinicsCloseTimeout = useRef<number | undefined>(undefined);
  const isTreatmentsActive = isActivePath(currentPath, "/tratamientos");
  const isDesktopSubmenuOpen = isTreatmentsOpen || isClinicsOpen;

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileOpen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
        setIsTreatmentsOpen(false);
        setIsClinicsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

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
        onClick={() => setIsMobileOpen(false)}
        className={`fixed inset-0 top-18 z-40 transition-all duration-200 lg:hidden ${
          isMobileOpen
            ? "pointer-events-auto bg-black/30"
            : "pointer-events-none bg-black/0"
        }`}
      />

      <div
        className={`fixed inset-x-0 top-18 z-40 h-[calc(100dvh-4.5rem)] overflow-y-auto bg-linear-to-t from-neutral-100 to-white transition-all duration-200 lg:hidden ${
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
            <button
              type="button"
              aria-current={isTreatmentsActive ? "page" : undefined}
              aria-expanded={isMobileTreatmentsOpen}
              onClick={() => setIsMobileTreatmentsOpen((isOpen) => !isOpen)}
              className={`${mobileLinkClassName(isTreatmentsActive)} w-full justify-between`}
            >
              <span>Tratamientos</span>
              <ChevronDown
                className={`size-8 transition-transform duration-300 ${
                  isMobileTreatmentsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
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

          <a
            href="/farmacia"
            aria-current={
              isActivePath(currentPath, "/farmacia") ? "page" : undefined
            }
            className={mobileLinkClassName(
              isActivePath(currentPath, "/farmacia"),
            )}
            onClick={() => setIsMobileOpen(false)}
          >
            Farmacia
          </a>

          <div>
            <button
              type="button"
              aria-expanded={isMobileClinicsOpen}
              onClick={() => setIsMobileClinicsOpen((isOpen) => !isOpen)}
              className={`${mobileLinkClassName(false)} w-full justify-between`}
            >
              <span>Clínicas</span>
              <ChevronDown
                className={`size-8 transition-transform duration-300 ${
                  isMobileClinicsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isMobileClinicsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`bg-brand-blue/5 grid gap-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isMobileClinicsOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0"
                  }`}
                >
                  {clinics.map((clinic) => (
                    <a
                      key={clinic.href}
                      href={clinic.href}
                      className="hover:text-brand-blue border-brand-blue/10 flex min-h-16 items-center gap-4 border-b px-10 py-3 text-neutral-700 transition-colors last:border-b-0"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center">
                        <img
                          src={clinic.logo}
                          alt=""
                          className="max-h-full max-w-full"
                        />
                      </span>
                      <span className="block text-base font-medium">
                        {clinic.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a
            href="/contacto"
            aria-current={
              isActivePath(currentPath, "/contacto") ? "page" : undefined
            }
            className={mobileLinkClassName(
              isActivePath(currentPath, "/contacto"),
            )}
            onClick={() => setIsMobileOpen(false)}
          >
            Contacto
          </a>
        </div>
      </div>
      {/**/}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 hidden bg-black/30 transition-opacity duration-200 lg:block ${
          isDesktopSubmenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />
      <header className="fixed top-0 right-0 left-0 z-50 h-18 bg-white">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <div className="hidden items-center gap-0.5 lg:flex lg:justify-self-start">
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
              <button
                type="button"
                aria-expanded={isTreatmentsOpen}
                aria-current={isTreatmentsActive ? "page" : undefined}
                className={linkClassName(isTreatmentsActive)}
                onClick={() => setIsTreatmentsOpen((isOpen) => !isOpen)}
              >
                Tratamientos
                <ChevronDown className="ml-1 size-4 text-neutral-800 transition-transform duration-300 group-hover:rotate-180 group-hover:text-neutral-950" />
                <span aria-hidden="true" className={underlineClassName}></span>
              </button>

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
                      className="hover:text-brand-dark-blue block w-full text-(length:--step--1) leading-none font-medium text-balance text-neutral-800 transition-colors"
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
              </div>
            </div>
          </div>

          <a
            href="/"
            aria-label="HI Institute International home"
            className="lg:justify-self-center"
          >
            <img
              src={logo}
              alt="HI Health Institute International"
              className="h-auto w-45 max-w-full md:w-45"
            />
          </a>

          <div className="hidden items-center gap-0.5 lg:flex lg:justify-self-end">
            <a
              href="/farmacia"
              aria-current={
                isActivePath(currentPath, "/farmacia") ? "page" : undefined
              }
              className={linkClassName(isActivePath(currentPath, "/farmacia"))}
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
                className={linkClassName(false)}
                onClick={() => setIsClinicsOpen((isOpen) => !isOpen)}
              >
                Clínicas
                <ChevronDown className="ml-1 size-4 transition-transform duration-300 group-hover:rotate-180 group-hover:text-neutral-950" />
                <span aria-hidden="true" className={underlineClassName}></span>
              </button>

              <div
                className={`absolute top-full left-0 w-screen bg-white shadow-lg shadow-black/5 transition-opacity duration-200 ease-out ${
                  isClinicsOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <div className="mx-auto flex max-w-4xl justify-center gap-8 px-6 pt-2 pb-5 lg:px-14">
                  {clinics.map((clinic) => (
                    <a
                      key={clinic.href}
                      href={clinic.href}
                      className="hover:text-brand-dark-blue block w-full text-(length:--step--1) leading-none font-medium text-balance text-neutral-800 transition-colors"
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
                      <span className="block text-neutral-800">
                        {clinic.label}
                      </span>
                      <span className="mt-1 block text-xs font-normal text-neutral-500">
                        {clinic.description}
                      </span>
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
