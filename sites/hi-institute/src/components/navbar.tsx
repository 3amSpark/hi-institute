import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import DesktopNavbar from "./navbar/desktop-navbar";
import MobileNavbar from "./navbar/mobile-navbar";
import { logo, whiteLogo, type NavbarProps } from "./navbar/shared";

const DESKTOP_SCROLL_THRESHOLD = 48;

export default function Navbar({ currentPath }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDesktopHovered, setIsDesktopHovered] = useState(false);
  const [hasDesktopPassedThreshold, setHasDesktopPassedThreshold] =
    useState(false);
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(
    scrollY,
    [0, DESKTOP_SCROLL_THRESHOLD],
    [0, 1],
  );
  const desktopScrollProgress = useTransform(scrollProgress, (value) =>
    isDesktop ? value : 0,
  );
  const gradientOpacity = useTransform(
    desktopScrollProgress,
    [0, 1],
    [0, 0.356],
  );
  // Uncomment this with the white logo image below if we want the logo crossfade back.
  const defaultLogoOpacity = useTransform(
    desktopScrollProgress,
    [0, 0.7, 1],
    [1, 0, 0],
  );
  const whiteLogoOpacity = useTransform(
    desktopScrollProgress,
    [0, 0.7, 1],
    [0, 1, 1],
  );
  const desktopLinkColor = useTransform(
    desktopScrollProgress,
    [0, 1],
    ["rgb(64,64,64)", "rgb(255,255,255)"],
  );

  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    setHasDesktopPassedThreshold(
      isDesktop && latestScrollY > DESKTOP_SCROLL_THRESHOLD,
    );
  });

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const updateScrollState = () => {
      setIsDesktop(desktopQuery.matches);
      setHasDesktopPassedThreshold(
        desktopQuery.matches && window.scrollY > DESKTOP_SCROLL_THRESHOLD,
      );
    };

    updateScrollState();
    desktopQuery.addEventListener("change", updateScrollState);

    return () => {
      desktopQuery.removeEventListener("change", updateScrollState);
    };
  }, []);

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

      <motion.header
        className="fixed top-0 right-0 left-0 z-50 h-19"
        onMouseEnter={() => setIsDesktopHovered(true)}
        onMouseLeave={() => setIsDesktopHovered(false)}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-white"
          animate={{ opacity: isDesktop && isDesktopHovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          aria-hidden="true"
          className="gradient navbar-gradient absolute inset-0 to-transparent"
          style={{ opacity: isDesktopHovered ? 0 : gradientOpacity }}
        />
        <nav className="max-w-desktop mx-auto flex h-19 items-center justify-between px-6 lg:px-10">
          <a
            href="/"
            aria-label="HI Institute International home"
            className="relative z-10 block w-40 max-w-full md:w-45"
          >
            <motion.img
              src={logo}
              alt="HI Health Institute International"
              className="h-auto w-full"
              style={{ opacity: isDesktopHovered ? 1 : defaultLogoOpacity }}
            />
            <motion.img
              src={whiteLogo}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-auto w-full"
              style={{ opacity: isDesktopHovered ? 0 : whiteLogoOpacity }}
            />
          </a>

          <DesktopNavbar
            currentPath={currentPath}
            linkColor={isDesktopHovered ? "rgb(64,64,64)" : desktopLinkColor}
            hasTextShadow={hasDesktopPassedThreshold && !isDesktopHovered}
          />

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
      </motion.header>
    </>
  );
}
