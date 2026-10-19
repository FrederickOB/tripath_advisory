import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import ErrorBoundary from "../ErrorBoundary";
import Footer from "../Footer";
import Navbar from "../Navbar";
import WhatsAppButton from "../WhatsAppButton";

// Scrolls to `#section` targets (waiting briefly for Sanity-driven sections
// to render) and back to the top on page changes.
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let tries = 0;
    const seek = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 120) {
        frame = requestAnimationFrame(seek);
      }
    };
    seek();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

const PageLoading = () => (
  <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
    <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
  </div>
);

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <div>
      <a
        href="#main"
        className="tp tp-black fixed left-4 top-3 z-[70] -translate-y-24 rounded-xl bg-primary px-5 py-3 text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
