import Layout from "@/components/Layouts/Layout";
import AboutUs from "@/Pages/aboutus";
import ContactPage from "@/Pages/Contact";
import Home from "@/Pages/home";
import InsightPage from "@/Pages/insight";
import InsightsPage from "@/Pages/insights";
import ServicesPage from "@/Pages/services";
import { Route, Routes } from "react-router";

export default function MyRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="insights/:id" element={<InsightPage />} />
      </Route>
      {/* <Route path="about" element={<About />} /> */}

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}

      {/* <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
    </Routes>
  );
}
