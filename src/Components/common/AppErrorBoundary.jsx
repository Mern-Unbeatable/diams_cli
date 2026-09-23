import { Component } from "react";
import ErrorState from "@/Components/common/ErrorState";

/**
 * Catches render errors so the SPA does not go blank.
 */
export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("AppErrorBoundary caught:", error, info);
    }
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-6">
          <ErrorState
            title="Something went wrong"
            message={
              this.state.error?.message ||
              "An unexpected error occurred while rendering this page."
            }
            onRetry={this.handleRetry}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
