import { useState } from "react";
import { ChevronDown, clinics, isActivePath, treatments } from "./shared";

type MobileNavbarProps = {
  currentPath: string;
  isOpen: boolean;
  onClose: () => void;
};

const mobileLinkClassName = (isActive: boolean, isChild = false) =>
  `flex min-h-18 items-center border-b border-brand-blue/10 px-6 text-lg font-medium transition-colors hover:text-brand-blue ${
    isActive ? "text-neutral-900" : "text-neutral-700"
  } ${isChild ? "bg-brand-blue/5 pl-10 text-base" : ""}`;

export default function MobileNavbar({
  currentPath,
  isOpen,
  onClose,
}: MobileNavbarProps) {
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(
    isActivePath(currentPath, "/tratamientos"),
  );
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const isTreatmentsActive = isActivePath(currentPath, "/tratamientos");

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 top-18 z-40 transition-all duration-200 lg:hidden ${
          isOpen
            ? "pointer-events-auto bg-black/30"
            : "pointer-events-none bg-black/0"
        }`}
      />

      <div
        className={`fixed inset-x-0 top-18 z-40 h-[calc(100dvh-4.5rem)] overflow-y-auto bg-linear-to-t from-neutral-100 to-white transition-all duration-200 lg:hidden ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col">
          <a
            href="/"
            aria-current={isActivePath(currentPath, "/") ? "page" : undefined}
            className={mobileLinkClassName(isActivePath(currentPath, "/"))}
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
              className={`${mobileLinkClassName(isTreatmentsActive)} w-full justify-between`}
            >
              <span>Tratamientos</span>
              <ChevronDown
                className={`size-8 transition-transform duration-300 ${
                  isTreatmentsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isTreatmentsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isTreatmentsOpen
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
            className={mobileLinkClassName(
              isActivePath(currentPath, "/farmacia"),
            )}
            onClick={onClose}
          >
            Farmacia
          </a>

          <div>
            <button
              type="button"
              aria-expanded={isClinicsOpen}
              onClick={() => setIsClinicsOpen((open) => !open)}
              className={`${mobileLinkClassName(false)} w-full justify-between`}
            >
              <span>Clínicas</span>
              <ChevronDown
                className={`size-8 transition-transform duration-300 ${
                  isClinicsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isClinicsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`bg-brand-blue/5 grid gap-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isClinicsOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0"
                  }`}
                >
                  {clinics.map((clinic) => (
                    <a
                      key={clinic.href}
                      href={clinic.href}
                      className="hover:text-brand-blue border-brand-blue/10 flex min-h-16 items-center gap-4 border-b px-10 py-3 text-neutral-700 transition-colors last:border-b-0"
                      onClick={onClose}
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
            onClick={onClose}
          >
            Contacto
          </a>
        </div>
      </div>
    </>
  );
}
