import { useEffect, useRef, useState } from "react";
import { ChevronDown, clinics, isActivePath, treatments } from "./shared";

type MobileNavbarProps = {
  currentPath: string;
  isOpen: boolean;
  onClose: () => void;
};

const primaryLinkClassName =
  "flex w-full items-center text-left text-3xl leading-none font-medium tracking-tight text-neutral-900 transition-colors hover:text-brand-blue";

export default function MobileNavbar({
  currentPath,
  isOpen,
  onClose,
}: MobileNavbarProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(
    isActivePath(currentPath, "/tratamientos"),
  );
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const isTreatmentsActive = isActivePath(currentPath, "/tratamientos");

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      const closeTimeout = window.setTimeout(() => dialog.close(), 500);

      return () => window.clearTimeout(closeTimeout);
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Menú principal"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`mobile-nav-dialog fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-5/6 max-w-md overflow-y-auto border-0 bg-white p-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-x-full lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute top-4 right-5 flex size-11 items-center justify-center text-neutral-800"
      >
        <span className="absolute h-0.5 w-7 rotate-45 bg-current" />
        <span className="absolute h-0.5 w-7 -rotate-45 bg-current" />
      </button>

      <div className="min-h-full">
        <nav
          aria-label="Navegación móvil"
          className="flex min-h-full flex-col px-7 pt-30 pb-8"
        >
          <div className="flex flex-col gap-7">
            <a
              href="/"
              aria-current={isActivePath(currentPath, "/") ? "page" : undefined}
              className={primaryLinkClassName}
              onClick={onClose}
            >
              Inicio
            </a>

            <div>
              <button
                type="button"
                aria-current={isTreatmentsActive ? "page" : undefined}
                aria-expanded={isTreatmentsOpen}
                onClick={() => setIsTreatmentsOpen((open) => !open)}
                className={`${primaryLinkClassName} justify-between gap-4`}
              >
                <span>Tratamientos</span>
                <ChevronDown
                  className={`size-5 shrink-0 transition-transform duration-300 ${
                    isTreatmentsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                  isTreatmentsOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-3 pt-5 pl-1">
                    {treatments.map((treatment) => (
                      <a
                        key={treatment.href}
                        href={treatment.href}
                        aria-current={
                          isActivePath(currentPath, treatment.href)
                            ? "page"
                            : undefined
                        }
                        className={`hover:text-brand-blue text-base leading-tight transition-colors ${
                          isActivePath(currentPath, treatment.href)
                            ? "text-neutral-950"
                            : "text-neutral-500"
                        }`}
                        onClick={onClose}
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
              className={primaryLinkClassName}
              onClick={onClose}
            >
              Farmacia
            </a>

            <div>
              <button
                type="button"
                aria-expanded={isClinicsOpen}
                onClick={() => setIsClinicsOpen((open) => !open)}
                className={`${primaryLinkClassName} justify-between gap-4`}
              >
                <span>Clínicas</span>
                <ChevronDown
                  className={`size-5 shrink-0 transition-transform duration-300 ${
                    isClinicsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                  isClinicsOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-4 pt-5 pl-1">
                    {clinics.map((clinic) => (
                      <a
                        key={clinic.href}
                        href={clinic.href}
                        className="group hover:text-brand-blue flex items-center gap-3 text-neutral-500 transition-colors"
                        onClick={onClose}
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center">
                          <img
                            src={clinic.logo}
                            alt=""
                            className="max-h-full max-w-full"
                          />
                        </span>
                        <span className="text-base leading-none">
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
              className={primaryLinkClassName}
              onClick={onClose}
            >
              Contacto
            </a>
          </div>

          <p className="mt-auto pt-14 text-xs leading-relaxed text-neutral-400">
            Health Institute International
          </p>
        </nav>
      </div>
    </dialog>
  );
}
