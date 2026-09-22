import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import ErrorState from "@/Components/common/ErrorState";
/**
 * React Router errorElement — chunk load failures, loader errors, etc.
 */
export default function RouteErrorPage() {
  const error = useRouteError();

  let title = "Page error";
  let message = "Something went wrong while loading this page.";

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "Page not found" : `Error ${error.status}`;
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message || message;
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <ErrorState
          title={title}
          message={message}
          onRetry={() => window.location.reload()}
          retryLabel="Reload page"
        />
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-sky-700 hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
