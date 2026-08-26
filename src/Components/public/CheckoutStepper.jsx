import { useEffect, useRef } from "react";
import { CHECKOUT_STEPS } from "@/config/configure";

const STEP_COUNT = CHECKOUT_STEPS.length;
const TRACK_INSET = `${100 / STEP_COUNT / 2}%`;

const CheckoutStepper = ({ currentStep = 1 }) => {
  const activeRef = useRef(null);
  const activeStep = CHECKOUT_STEPS.find((step) => step.id === currentStep);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentStep]);

  return (
    <nav aria-label="Checkout progress" className="w-full">
      {/* Mobile & tablet: horizontal scroll */}
      <div className="lg:hidden">
        <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ol className="flex w-max min-w-full gap-0.5">
            {CHECKOUT_STEPS.map((step) => {
              const isActive = step.id === currentStep;

              return (
                <li
                  key={step.id}
                  ref={isActive ? activeRef : null}
                  className="flex w-[4.75rem] shrink-0 flex-col items-center sm:w-20"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ring-2 ring-primary ${
                      isActive
                        ? "bg-btnPrimary text-white"
                        : "bg-secondary text-white/70"
                    }`}
                  >
                    {step.id}
                  </span>
                  <p
                    className={`mt-2 w-full truncate px-0.5 text-center text-[10px] font-bold leading-tight ${
                      isActive ? "text-white" : "text-white/50"
                    }`}
                  >
                    {step.label}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {activeStep && (
          <p className="mt-3 text-center text-xs text-white/50">
            {activeStep.description}
          </p>
        )}
      </div>

      {/* Desktop: full stepper */}
      <ol className="relative hidden w-full lg:flex">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[22px] h-px bg-white/12"
          style={{ left: TRACK_INSET, right: TRACK_INSET }}
        />

        {CHECKOUT_STEPS.map((step) => {
          const isActive = step.id === currentStep;

          return (
            <li
              key={step.id}
              className="relative z-10 flex min-w-0 flex-1 flex-col items-center"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-4 ring-primary ${
                  isActive
                    ? "bg-btnPrimary text-white"
                    : "bg-secondary text-white/70"
                }`}
              >
                {step.id}
              </span>

              <div className="mt-3 w-full px-0.5 text-center">
                <p className="text-sm font-bold leading-tight text-white">
                  {step.label}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/50">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CheckoutStepper;
