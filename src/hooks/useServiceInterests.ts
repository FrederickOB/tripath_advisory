import { useServices } from "./useSanityData";

const FALLBACK = ["Policy & Regulation", "People & Inclusion", "Planet & ESG"];

// "I'm interested in" options for the contact forms, taken from the Sanity services
export function useServiceInterests() {
  const { data: services } = useServices();
  return services?.length ? services.map((s) => s.title) : FALLBACK;
}
