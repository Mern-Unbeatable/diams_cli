import { useState } from "react";
import {
  PlansHeader,
  PlanCard,
  CreatePlanModal,
  INITIAL_PLANS_DATA,
} from "./sections";

const AdminPlansView = () => {
  const [plans, setPlans] = useState(INITIAL_PLANS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Open Create Plan modal
  const handleOpenCreate = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  // Open Edit Plan modal
  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  // Delete Plan
  const handleDeletePlan = (planToDelete) => {
    if (
      window.confirm(
        `Are you sure you want to delete the plan "${planToDelete.brand} ${planToDelete.name}"?`
      )
    ) {
      setPlans((prev) => prev.filter((p) => p.id !== planToDelete.id));
    }
  };

  // Save (Create or Update) Plan
  const handleSavePlan = (savedPlan) => {
    setPlans((prev) => {
      const exists = prev.some((p) => p.id === savedPlan.id);
      if (exists) {
        return prev.map((p) => (p.id === savedPlan.id ? savedPlan : p));
      }
      return [...prev, savedPlan];
    });
  };

  // More Details click
  const handleMoreDetails = (plan) => {
    console.log("View plan details:", plan);
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Plans Management Header */}
      <PlansHeader onCreatePlan={handleOpenCreate} />

      {/* 2. 3 Premium Plan Cards Grid with Middle Card Featured Elevation */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-center py-4 lg:py-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={handleOpenEdit}
            onDelete={handleDeletePlan}
            onMoreDetails={handleMoreDetails}
          />
        ))}
      </div>

      {/* Create / Edit Plan Modal */}
      <CreatePlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planToEdit={editingPlan}
        onSave={handleSavePlan}
      />
    </div>
  );
};

export default AdminPlansView;
