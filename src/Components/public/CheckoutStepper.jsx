import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { CHECKOUT_STEPS } from "@/config/configure";

const STEP_COUNT = CHECKOUT_STEPS.length;
const TRACK_INSET = `${100 / STEP_COUNT / 2}%`;

const StepCircle = ({ step, currentStep, size = "md" }) => {
  const isActive = step.id === currentStep;
  const isPast = step.id < currentStep;
  const sizeClass =
    size === "sm"
      ? "h-9 w-9 text-xs"
      : "h-10 w-10 text-sm xl:h-12 xl:w-12 xl:text-base";

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ring-4 ring-primary ${sizeClass} ${
        isActive || isPast
          ? "bg-btnPrimary text-white"
          : "bg-secondary text-white/70"
      }`}
    >
      {isPast ? <Check size={size === "sm" ? 16 : 18} strokeWidth={2.5} /> : step.id}
    </span>
  );
};

const CheckoutStepper = ({ currentStep = 1 }) => {
  const scrollRef = useRef(null);
  const activeRef = useRef(null);
  const activeStep = CHECKOUT_STEPS.find((step) => step.id === currentStep);

  useEffect(() => {
    if (!activeRef.current || !scrollRef.current) return;

    const container = scrollRef.current;
    const active = activeRef.current;
    const offset =
      active.offsetLeft - container.clientWidth / 2 + active.clientWidth / 2;

    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [currentStep]);

  return (
    <nav aria-label="Checkout progress" className="w-full">
      <div className="lg:hidden">
        <p className="text-center text-xs font-medium text-white/50">
          Step {currentStep} of {STEP_COUNT}
        </p>

        <div
          ref={scrollRef}
          className="mt-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ol className="mx-auto flex w-max gap-3 px-2">
            {CHECKOUT_STEPS.map((step) => {
              const isActive = step.id === currentStep;

              return (
                <li
                  key={step.id}
                  ref={isActive ? activeRef : null}
                  className="shrink-0"
                >
                  <StepCircle step={step} currentStep={currentStep} size="sm" />
                </li>
              );
            })}
          </ol>
        </div>

        {activeStep && (
          <div className="mt-4 text-center">
            <p className="text-base font-bold text-white">{activeStep.label}</p>
            <p className="mt-1 text-sm text-white/50">{activeStep.description}</p>
          </div>
        )}
      </div>

      <ol className="relative hidden w-full lg:flex">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-5 h-px bg-white/12 xl:top-6"
          style={{ left: TRACK_INSET, right: TRACK_INSET }}
        />

        {CHECKOUT_STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isPast = step.id < currentStep;

          return (
            <li
              key={step.id}
              className="relative z-10 flex min-w-0 flex-1 flex-col items-center"
            >
              <StepCircle step={step} currentStep={currentStep} />

              <div className="mt-3 w-full px-0.5 text-center">
                <p
                  className={`text-sm font-bold leading-tight xl:text-base ${
                    isActive || isPast ? "text-white" : "text-white/50"
                  }`}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-white/50 xl:text-[13px]">
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
