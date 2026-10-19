import LegalPage from "@/components/LegalPage";
import { Accent } from "@/components/ui/SectionTitle";
import { contactDetails } from "@/constants";
import { usePageMeta } from "@/hooks/usePageMeta";

const email = <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>;

export default function PrivacyPage() {
  usePageMeta({
    title: "Privacy policy",
    description: "How TriPath Advisory collects, uses and protects personal data shared through this website.",
    path: "/privacy",
  });

  return (
    <LegalPage
      breadcrumb="Privacy policy"
      title={
        <>
          Privacy <Accent>policy.</Accent>
        </>
      }
      intro="How we collect, use and protect the personal data you share with us through this website."
      updated="19 October 2026"
      sections={[
        {
          id: "who-we-are",
          heading: "Who we are",
          body: (
            <p>
              TriPath Advisory ("we", "us") is a consultancy based at{" "}
              {contactDetails.address.join(", ")}. We are responsible for the personal data
              collected through this website. You can reach us about privacy at {email}.
            </p>
          ),
        },
        {
          id: "what-we-collect",
          heading: "What we collect",
          body: (
            <>
              <p>We only collect what you choose to send us:</p>
              <ul>
                <li>
                  <strong>Contact and consultation forms:</strong> your name, email address,
                  organisation, the services you're interested in, your message and, for
                  consultation requests, your preferred date, time and meeting format.
                </li>
                <li>
                  <strong>Newsletter sign-up:</strong> your email address.
                </li>
                <li>
                  <strong>Technical data:</strong> our hosting provider keeps standard server
                  logs (such as IP address and browser type) to run and secure the site.
                </li>
              </ul>
              <p>Please don't include sensitive personal information in your messages.</p>
            </>
          ),
        },
        {
          id: "how-we-use-it",
          heading: "How we use it",
          body: (
            <p>
              We use your details to reply to your enquiry, arrange and prepare for
              consultations, and send the newsletter you asked for. We rely on your consent
              and on our legitimate interest in responding to people who contact us. We
              don't sell your data or use it for advertising.
            </p>
          ),
        },
        {
          id: "who-we-share-it-with",
          heading: "Who we share it with",
          body: (
            <>
              <p>We use a small number of service providers to run the site:</p>
              <ul>
                <li>Netlify, which hosts the website and receives form submissions;</li>
                <li>Microsoft, which provides our email;</li>
                <li>Sanity, which delivers the site's articles and page content;</li>
                <li>Google Fonts, which serves the typefaces used on the site;</li>
                <li>Google Maps, which shows our office location on the contact page.</li>
              </ul>
              <p>
                Some of these providers process data outside Ghana. We only use providers
                that protect data to a recognised standard.
              </p>
            </>
          ),
        },
        {
          id: "how-long-we-keep-it",
          heading: "How long we keep it",
          body: (
            <p>
              We keep enquiry details only for as long as we need them to respond to you and
              to manage any work that follows. Newsletter addresses are kept until you
              unsubscribe or ask us to remove them.
            </p>
          ),
        },
        {
          id: "your-rights",
          heading: "Your rights",
          body: (
            <p>
              Under Ghana's Data Protection Act, 2012 (Act 843) you can ask to see the
              personal data we hold about you, have it corrected or deleted, object to how we
              use it, or withdraw your consent at any time. Email {email} and we'll respond
              promptly. You can also complain to the Data Protection Commission of Ghana.
            </p>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies",
          body: (
            <p>
              This website doesn't use advertising or analytics cookies. The map on our
              contact page is provided by Google Maps, which may set its own cookies when
              it loads. Links to WhatsApp, LinkedIn and other sites take you to services
              with their own privacy policies. If we start using analytics we'll update
              this page first.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          body: (
            <p>
              We may update this policy from time to time. The date at the top of the page
              shows when it last changed.
            </p>
          ),
        },
      ]}
    />
  );
}
