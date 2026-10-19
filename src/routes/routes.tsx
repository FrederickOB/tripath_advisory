import { lazy } from "react";
import { Route, Routes } from "react-router";
import Layout from "@/components/Layouts/Layout";
import Home from "@/Pages/home";

// Inner pages load on demand so the home page ships less JavaScript
const AboutUs = lazy(() => import("@/Pages/aboutus"));
const ContactPage = lazy(() => import("@/Pages/Contact"));
const ServicesPage = lazy(() => import("@/Pages/services"));
const InsightsPage = lazy(() => import("@/Pages/insights"));
const InsightPage = lazy(() => import("@/Pages/insight"));
const PrivacyPage = lazy(() => import("@/Pages/privacy"));
const TermsPage = lazy(() => import("@/Pages/terms"));
const NotFound = lazy(() => import("@/Pages/NotFound"));

export default function MyRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="insights/:slug" element={<InsightPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
