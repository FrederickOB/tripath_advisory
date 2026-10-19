import PageHeader from "@/components/PageHeader";

export interface LegalSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  breadcrumb: string;
  title: React.ReactNode;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export default function LegalPage({ breadcrumb, title, intro, updated, sections }: LegalPageProps) {
  return (
    <div className="relative antialiased text-dark">
      <PageHeader breadcrumb={breadcrumb} eyebrow="Legal" title={title} description={intro}>
        <p className="text-sm text-muted">Last updated {updated}</p>
      </PageHeader>
      <section className="tp pb-20 md:pb-28">
        <div className="tp-container grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-28 flex flex-col gap-2 border-l border-dark/10 pl-5 text-[15px]">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-muted hover:text-primary">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex max-w-[760px] flex-col gap-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="flex scroll-mt-28 flex-col gap-4">
                <h2 className="tp-sans tp-black text-2xl">{section.heading}</h2>
                <div className="flex flex-col gap-4 text-lg leading-[1.7] text-muted [&_a]:text-primary [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-dark">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
