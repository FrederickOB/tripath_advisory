import { Component } from "react";
import ActionButton from "@/components/ui/ActionButton";
import { contactDetails } from "@/constants";

interface Props {
  children: React.ReactNode;
}

// Keeps a crash in one page from blanking the whole site
export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Page crashed:", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="tp flex min-h-[70vh] items-center pb-20 pt-36">
        <div className="tp-container flex max-w-[640px] flex-col gap-6">
          <span className="tp-eyebrow">Something went wrong</span>
          <h1 className="tp-h2">This page didn't load properly.</h1>
          <p className="tp-lead text-lg">
            Please refresh the page. If it keeps happening, email us at{" "}
            <a href={`mailto:${contactDetails.email}`} className="text-primary underline">
              {contactDetails.email}
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <ActionButton onClick={() => window.location.reload()} arrow>
              Refresh
            </ActionButton>
            <ActionButton href="/" variant="soft">
              Back to home
            </ActionButton>
          </div>
        </div>
      </section>
    );
  }
}
