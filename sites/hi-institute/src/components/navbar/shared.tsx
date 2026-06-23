export const logo = "/assets/logos/brand/logo.svg";
export const whiteLogo = "/assets/logos/brand/logo-white.svg";

export const navLinks = [
  { href: "/farmacia", label: "Farmacia" },
  { href: "/contacto", label: "Contacto" },
];

export const treatments = [
  {
    href: "/tratamientos/metabolismo-peso",
    label: "Metabolismo & Peso",
    image: "/assets/images/treatments/navigation/metabolismo.jpg",
  },
  {
    href: "/tratamientos/fertilidad-reproduccion",
    label: "Fertilidad & Reproducción",
    image: "/assets/images/treatments/navigation/fertilidad.jpg",
  },
  {
    href: "/tratamientos/salud-femenina-ginecologica",
    label: "Salud Femenina & Ginecológica",
    image: "/assets/images/treatments/navigation/ginecologia.jpg",
  },
  {
    href: "/tratamientos/balance-hormonal",
    label: "Balance Hormonal",
    image: "/assets/images/treatments/navigation/balance-hormonal.jpg",
  },
  {
    href: "/tratamientos/diabetes",
    label: "Diabetes",
    image: "/assets/images/treatments/navigation/diabetes.jpg",
  },
];

export const clinics = [
  {
    href: "https://hiskinbeauty.com/",
    label: "HI Skin & Beauty",
    description: "Dermatología y estética médica",
    logo: "/assets/logos/clinics/skin.svg",
  },
  {
    href: "https://femcare.hiinstitute.com/",
    label: "HI Fem Care",
    description: "Ginecología y salud íntima",
    logo: "/assets/logos/clinics/femcare.svg",
  },
  {
    href: "https://initiafertilitycenter.com/",
    label: "initia",
    description: "Fertilidad accesible",
    logo: "/assets/logos/clinics/initia.svg",
  },
];

export type NavbarProps = {
  currentPath: string;
};

const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";

export const isActivePath = (currentPath: string, href: string) => {
  const normalizedPath = normalizePath(currentPath);
  const normalizedHref = normalizePath(href);

  return normalizedHref === "/"
    ? normalizedPath === normalizedHref
    : normalizedPath === normalizedHref ||
        normalizedPath.startsWith(`${normalizedHref}/`);
};

export const linkClassName = (isActive: boolean, hasTextShadow = false) =>
  `group relative inline-flex h-navbar items-center pl-2 pr-3 text-sm text-current transition-colors duration-150 ${hasTextShadow ? "text-shadow-sm/0" : ""}`;

export const underlineClassName =
  "from-brand-blue to-brand-green absolute bottom-0 left-1/2 h-0.5 w-full origin-center -translate-x-1/2 scale-x-0 bg-black bg-linear-to-r transition-all duration-200 ease-out group-hover:scale-x-100";

export function ChevronDown({ className = "" }: { className?: string }) {
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
