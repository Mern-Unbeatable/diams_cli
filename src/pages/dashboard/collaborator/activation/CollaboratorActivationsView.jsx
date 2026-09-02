import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import {
  CollaboratorActivationHeader,
  CollaboratorActivationTable,
  CollaboratorActivationDetailsView,
  COLLABORATOR_ACTIVATIONS_DATA,
} from "./sections";

const CollaboratorActivationsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activationsList, setActivationsList] = useState(
    COLLABORATOR_ACTIVATIONS_DATA
  );
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Find activation by ID (e.g. act-3 or ACT-003)
  const currentActivation = useMemo(() => {
    if (!id) return null;
    return (
      activationsList.find(
        (a) =>
          a.id.toLowerCase() === id.toLowerCase() ||
          (a.activationId && a.activationId.toLowerCase() === id.toLowerCase())
      ) || null
    );
  }, [id, activationsList]);

  // Filter Activations by Status
  const filteredData = useMemo(() => {
    return activationsList.filter((item) => {
      if (status !== "All" && item.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [activationsList, status]);

  const handleStartActivation = (actId) => {
    setActivationsList((prev) =>
      prev.map((item) =>
        item.id === actId
          ? {
              ...item,
              status: "Activated",
              timeline: item.timeline.map((t) => ({ ...t, completed: true })),
            }
          : item
      )
    );
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* If URL contains activation ID, render details view */}
      {id ? (
        currentActivation ? (
          <CollaboratorActivationDetailsView
            activation={currentActivation}
            onBack={() => navigate("/dashboard/collaborator/activations")}
            onStartActivation={handleStartActivation}
          />
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Activation Record Not Found
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              No activation was found with ID &quot;{id}&quot;.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/collaborator/activations")}
              className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700 cursor-pointer"
            >
              Back to Activations List
            </button>
          </div>
        )
      ) : (
        <>
          {/* 1. Header with STATUS dropdown */}
          <CollaboratorActivationHeader
            status={status}
            setStatus={(val) => {
              setStatus(val);
              setCurrentPage(1);
            }}
          />

          {/* 2. Activations Table */}
          <CollaboratorActivationTable
            activations={filteredData}
            onViewActivation={(act) =>
              navigate(
                `/dashboard/collaborator/activations/${
                  act.activationId || act.id
                }`
              )
            }
            currentPage={currentPage}
            pageSize={10}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default CollaboratorActivationsView;
