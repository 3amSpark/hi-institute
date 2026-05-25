import { useEffect, useState } from "react";
import DesktopNavbar from "./navbar/desktop-navbar";
import MobileNavbar from "./navbar/mobile-navbar";
import { logo, type NavbarProps } from "./navbar/shared";

export default function Navbar({ currentPath }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileOpen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  return (
    <>
      <MobileNavbar
        currentPath={currentPath}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      <header className="fixed top-0 right-0 left-0 z-50 h-18 bg-white">
        <nav className="max-w-desktop mx-auto flex h-18 items-center justify-between px-6 lg:px-10">
          <a href="/" aria-label="HI Institute International home">
            <img
              src={logo}
              alt="HI Health Institute International"
              className="h-auto w-40 max-w-full md:w-45"
            />
          </a>

          <DesktopNavbar currentPath={currentPath} />

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
