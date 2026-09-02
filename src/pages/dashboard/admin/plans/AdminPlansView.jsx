import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import {
  PlansHeader,
  PlanCard,
  CreatePlanModal,
  PlanDetailsView,
  INITIAL_PLANS_DATA,
} from "./sections";

const AdminPlansView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plans, setPlans] = useState(INITIAL_PLANS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Find plan by ID or Name from URL parameter (e.g. plan-2 or plus)
  const currentPlan = useMemo(() => {
    if (!id) return null;
    return (
      plans.find(
        (p) =>
          p.id.toLowerCase() === id.toLowerCase() ||
          p.name.toLowerCase() === id.toLowerCase() ||
          `${p.brand}-${p.name}`.toLowerCase() === id.toLowerCase()
      ) || plans[1] || plans[0]
    );
  }, [id, plans]);

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

  // More Details click (navigates to URL with ID)
  const handleMoreDetails = (plan) => {
    navigate(`/dashboard/admin/plans/${plan.id}`);
  };

  return (
    <div className="min-h-full space-y-8 text-slate-900">
      {/* If URL contains plan id parameter, render PlanDetailsView */}
      {id ? (
        currentPlan ? (
          <PlanDetailsView
            plan={currentPlan}
            onBack={() => navigate("/dashboard/admin/plans")}
          />
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Plan Not Found</h2>
            <p className="mt-1 text-xs text-slate-500">
              No plan was found with ID &quot;{id}&quot;.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/admin/plans")}
              className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Back to Plans
            </button>
          </div>
        )
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default AdminPlansView;
