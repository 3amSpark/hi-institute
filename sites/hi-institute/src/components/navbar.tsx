import logo from "../assets/logo.svg";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tratamientos", label: "Tratamientos" },
  { href: "/farmacia", label: "Farmacia" },
  { href: "/clinicas", label: "Clínicas" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white">
      <nav className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-4 md:flex-row md:items-center md:justify-between lg:px-10">
        <a href="/" aria-label="HI Institute International home">
          <img
            src={logo.src}
            alt="HI Health Institute International"
            className="h-auto w-30 max-w-full md:w-50"
          />
        </a>

        <div className="flex items-center gap-1.5 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-3 py-1.5 font-sans font-medium text-neutral-500/80 transition-colors duration-150 hover:text-neutral-800"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="from-brand-blue to-brand-green absolute top-5/6 left-1/2 h-0.5 w-3/4 -translate-x-1/2 scale-x-0 bg-black bg-linear-to-r transition-all ease-out group-hover:scale-x-100"
              ></span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
