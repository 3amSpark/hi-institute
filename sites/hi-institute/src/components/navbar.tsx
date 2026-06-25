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
  const [hasPassedThreshold, setHasPassedThreshold] = useState(false);
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
  const backgroundOpacity = useTransform(scrollProgress, [0, 1], [0, 1]);
  const gradientOpacity = useTransform(scrollProgress, [0, 1], [0.5, 0]);
  const defaultLogoOpacity = useTransform(
    desktopScrollProgress,
    [0, 1],
    [0, 1],
  );
  const whiteLogoOpacity = useTransform(desktopScrollProgress, [0, 1], [1, 0]);
  const desktopLinkColor = useTransform(
    desktopScrollProgress,
    [0, 1],
    ["rgb(255,255,255)", "rgb(38,38,38)"],
  );

  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    setHasPassedThreshold(latestScrollY > DESKTOP_SCROLL_THRESHOLD);
    setHasDesktopPassedThreshold(
      isDesktop && latestScrollY > DESKTOP_SCROLL_THRESHOLD,
    );
  });

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const updateScrollState = () => {
      setIsDesktop(desktopQuery.matches);
      setHasPassedThreshold(window.scrollY > DESKTOP_SCROLL_THRESHOLD);
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
    document.body.classList.toggle("mobile-nav-open", isMobileOpen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("mobile-nav-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  const hasMobileWhiteChrome =
    !isDesktop && !hasPassedThreshold && !isMobileOpen;
  const hasDesktopWhiteChrome =
    isDesktop && !hasDesktopPassedThreshold && !isDesktopHovered;

  return (
    <>
      <MobileNavbar
        currentPath={currentPath}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      <motion.header
        className={`h-navbar fixed top-0 right-0 left-0 z-50 ${(hasPassedThreshold || isDesktopHovered) && `border-b-[0.5px] border-neutral-300/80`}`}
        onMouseEnter={() => {
          if (isDesktop) setIsDesktopHovered(true);
        }}
        onMouseLeave={() => {
          if (isDesktop) setIsDesktopHovered(false);
        }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white"
          style={{ opacity: backgroundOpacity }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white"
          animate={{ opacity: isDesktop && isDesktopHovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          aria-hidden="true"
          className="navbar-gradient pointer-events-none absolute top-0 right-0 left-0 h-32"
          style={{ opacity: isDesktopHovered ? 0 : gradientOpacity }}
        />
        <nav className="max-w-xxl h-navbar mx-auto flex items-center justify-between px-6 lg:px-10">
          <a
            href="/"
            data-astro-prefetch="hover"
            aria-label="HI Institute International home"
            className="relative z-10 block w-41 max-w-full"
          >
            <motion.img
              src={logo}
              alt="HI Health Institute International"
              className="h-auto w-full"
              style={{
                opacity: !isDesktop
                  ? hasMobileWhiteChrome
                    ? 0
                    : 1
                  : isDesktopHovered
                    ? 1
                    : defaultLogoOpacity,
              }}
            />
            <motion.img
              src={whiteLogo}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-auto w-full"
              style={{
                opacity: !isDesktop
                  ? hasMobileWhiteChrome
                    ? 1
                    : 0
                  : isDesktopHovered
                    ? 0
                    : whiteLogoOpacity,
              }}
            />
          </a>

          <DesktopNavbar
            currentPath={currentPath}
            linkColor={isDesktopHovered ? "rgb(64,64,64)" : desktopLinkColor}
            hasTextShadow={hasDesktopWhiteChrome}
          />

          <button
            type="button"
            aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((isOpen) => !isOpen)}
            className="group relative flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-0.5 w-6 origin-center transition-all duration-300 ${
                hasMobileWhiteChrome ? "bg-white" : "bg-neutral-700"
              } ${isMobileOpen ? "translate-y-[8px] rotate-45" : ""}`}
            ></span>
            <span
              className={`h-0.5 w-6 transition-all duration-300 ${
                hasMobileWhiteChrome ? "bg-white" : "bg-neutral-700"
              } ${isMobileOpen ? "scale-0 opacity-0" : ""}`}
            ></span>
            <span
              className={`h-0.5 w-6 origin-center transition-all duration-300 ${
                hasMobileWhiteChrome ? "bg-white" : "bg-neutral-700"
              } ${isMobileOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
            ></span>
          </button>
        </nav>
      </motion.header>
    </>
  );
}
