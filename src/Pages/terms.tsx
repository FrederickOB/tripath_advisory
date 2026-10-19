import LegalPage from "@/components/LegalPage";
import { Accent } from "@/components/ui/SectionTitle";
import { contactDetails } from "@/constants";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function TermsPage() {
  usePageMeta({
    title: "Terms of service",
    description: "The terms that apply when you use the TriPath Advisory website.",
    path: "/terms",
  });

  return (
    <LegalPage
      breadcrumb="Terms of service"
      title={
        <>
          Terms of <Accent>service.</Accent>
        </>
      }
      intro="The terms that apply when you use this website."
      updated="19 October 2026"
      sections={[
        {
          id: "about",
          heading: "About these terms",
          body: (
            <p>
              These terms apply to your use of tripathadvisory.org, run by TriPath Advisory
              of {contactDetails.address.join(", ")}. By using the site you accept them.
            </p>
          ),
        },
        {
          id: "information-only",
          heading: "Information, not advice",
          body: (
            <p>
              Articles and other content on this site are general information. They aren't
              professional advice for your situation. Any engagement with TriPath Advisory
              is governed by the terms we agree with you in writing.
            </p>
          ),
        },
        {
          id: "content",
          heading: "Our content",
          body: (
            <p>
              The text, images, logo and design of this site belong to TriPath Advisory or
              are used with permission. You're welcome to link to our pages and quote short
              extracts with credit to TriPath Advisory. Please ask before reusing anything
              else.
            </p>
          ),
        },
        {
          id: "acceptable-use",
          heading: "Using the site",
          body: (
            <p>
              Please don't misuse the site, for example by trying to break its security,
              overloading it, or using the forms to send unlawful, abusive or spam content.
            </p>
          ),
        },
        {
          id: "other-sites",
          heading: "Links to other sites",
          body: (
            <p>
              We link to other websites for convenience. We aren't responsible for their
              content or how they handle your data.
            </p>
          ),
        },
        {
          id: "liability",
          heading: "Liability",
          body: (
            <p>
              We work to keep the site accurate and available, but it's provided as it is.
              To the extent the law allows, we aren't liable for losses arising from use of,
              or reliance on, the site.
            </p>
          ),
        },
        {
          id: "law",
          heading: "Governing law",
          body: <p>These terms are governed by the laws of the Republic of Ghana.</p>,
        },
        {
          id: "contact",
          heading: "Contact",
          body: (
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
