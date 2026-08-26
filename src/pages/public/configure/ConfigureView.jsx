import { useState } from "react";
import { Navigate, useParams } from "react-router";
import { getPlanById } from "@/config/plans";
import CheckoutStepper from "@/Components/public/CheckoutStepper";
import OrderSummary from "@/Components/public/OrderSummary";
import ConfigureFormSection from "./sections/ConfigureFormSection";

const ConfigureView = () => {
  const { planId } = useParams();
  const plan = getPlanById(planId);

  const [simType, setSimType] = useState("esim");
  const [numberOption, setNumberOption] = useState("new");
  const [activationDate, setActivationDate] = useState("asap");

  if (!plan) {
    return <Navigate to="/plans" replace />;
  }

  return (
    <section className="overflow-x-hidden bg-primary pb-12 pt-6 sm:pb-20 sm:pt-8">
      <div className="mx-auto container px-5 sm:px-6 lg:px-10">
        <CheckoutStepper currentStep={1} />

        <div className="mt-8 grid items-start gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_320px]">
          <ConfigureFormSection
            planId={plan.id}
            simType={simType}
            numberOption={numberOption}
            activationDate={activationDate}
            onSimChange={setSimType}
            onNumberChange={setNumberOption}
            onActivationChange={setActivationDate}
          />

          <OrderSummary plan={plan} simType={simType} />
        </div>
      </div>
    </section>
  );
};

export default ConfigureView;
