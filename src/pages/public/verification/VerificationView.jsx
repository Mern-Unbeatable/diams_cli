import { Navigate, useParams } from "react-router";
import { getPlanById } from "@/config/plans";
import CheckoutStepper from "@/Components/public/CheckoutStepper";
import CheckoutSidebar from "@/Components/public/CheckoutSidebar";
import NeedHelpCard from "@/Components/public/NeedHelpCard";
import VerificationFormSection from "./sections/VerificationFormSection";

const VerificationView = () => {
  const { planId } = useParams();
  const plan = getPlanById(planId);

  if (!plan) {
    return <Navigate to="/plans" replace />;
  }

  return (
    <>
      <section className="overflow-x-hidden bg-primary pb-8 pt-6 sm:pt-8">
        <div className="mx-auto container px-5 sm:px-6 lg:px-10">
          <CheckoutStepper currentStep={3} />
        </div>
      </section>

      <section className="overflow-x-hidden bg-white pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mx-auto container px-5 sm:px-6 lg:px-10">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">
            <VerificationFormSection planId={plan.id} />

            <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <CheckoutSidebar plan={plan} />
              <NeedHelpCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerificationView;
