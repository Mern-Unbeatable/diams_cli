import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ErrorState from "@/Components/common/ErrorState";
import {
  useCollaboratorActivation,
  useCollaboratorActivations,
  useUpdateCollaboratorActivation,
} from "@/features/dash/collaborator/activations";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import { isNotFoundError } from "@/lib/api/errors";
import {
  CollaboratorActivationHeader,
  CollaboratorActivationTable,
  CollaboratorActivationDetailsView,
} from "./sections";

const CollaboratorActivationsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const listFilters = status !== "All" ? { status } : {};
  const activationsQuery = useCollaboratorActivations(listFilters);
  const activationQuery = useCollaboratorActivation(id);
  const updateActivation = useUpdateCollaboratorActivation();

  useMutationFeedback(updateActivation, {
    successMessage: "Activation updated.",
    errorTitle: "Update failed",
  });

  const activationsList = useMemo(
    () => unwrapList(activationsQuery.data),
    [activationsQuery.data],
  );

  const currentActivation = id ? activationQuery.data : null;
  const detailLoading = Boolean(id) && activationQuery.isLoading;
  const detailError = Boolean(id) && activationQuery.isError;
  const detailMissing =
    Boolean(id) &&
    !activationQuery.isLoading &&
    (isNotFoundError(activationQuery.error) ||
      (!activationQuery.isError &&
        !currentActivation &&
        activationQuery.isFetched));

  const handleStartActivation = (actId) => {
    if (updateActivation.isPending) return;
    const row =
      activationsList.find((item) => item.id === actId) || currentActivation;
    updateActivation.mutate({
      id: actId,
      payload: {
        status: "Activated",
        timeline: (row?.timeline || []).map((t) => ({
          ...t,
          completed: true,
        })),
      },
    });
  };

  if (id) {
    if (detailLoading) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <CollaboratorActivationTable activations={[]} isLoading />
        </div>
      );
    }

    if (detailError && !isNotFoundError(activationQuery.error)) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
            <ErrorState
              title="Unable to load activation"
              error={activationQuery.error}
              onRetry={() => activationQuery.refetch()}
            />
          </div>
        </div>
      );
    }

    if (detailMissing || !currentActivation) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
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
        </div>
      );
    }

    return (
      <div className="min-h-full space-y-6 text-slate-900">
        <CollaboratorActivationDetailsView
          activation={currentActivation}
          onBack={() => navigate("/dashboard/collaborator/activations")}
          onStartActivation={handleStartActivation}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <CollaboratorActivationHeader
        status={status}
        setStatus={(val) => {
          setStatus(val);
          setCurrentPage(1);
        }}
      />

      <CollaboratorActivationTable
        activations={activationsList}
        onViewActivation={(act) =>
          navigate(
            `/dashboard/collaborator/activations/${
              act.activationId || act.id
            }`,
          )
        }
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        isLoading={activationsQuery.isLoading}
        isFetching={
          activationsQuery.isFetching && !activationsQuery.isLoading
        }
        error={activationsQuery.isError ? activationsQuery.error : null}
        onRetry={() => activationsQuery.refetch()}
      />
    </div>
  );
};

export default CollaboratorActivationsView;
