// Netlify Forms: the form definitions Netlify detects at deploy time live in
// public/__forms.html; field names here must match the fields declared there.
export type FormName = "contact" | "newsletter";

export async function submitNetlifyForm(
  formName: FormName,
  fields: Record<string, string>
) {
  if (import.meta.env.DEV) {
    // Netlify only handles submissions on the deployed site
    console.info(`[dev] "${formName}" form submission:`, fields);
    return;
  }
  const body = new URLSearchParams({ "form-name": formName, ...fields }).toString();
  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error(`Form submission failed (${response.status})`);
}

export const whatsappLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
