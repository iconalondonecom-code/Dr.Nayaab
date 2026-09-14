import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, Store, Building2, Stethoscope, PackageSearch, ArrowRight } from "lucide-react";
import { Container, SectionLabel } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { RonakSection } from "@/components/site/Sections";
import { visibleCategories as categories } from "@/data/products";
import { assets } from "@/data/site";

export const Route = createFileRoute("/global-business")({
  head: () => ({
    meta: [
      { title: "Global Business & Partnerships | Dr. Nayaab" },
      {
        name: "description",
        content:
          "Distribution, import, wholesale and institutional partnership opportunities with Dr. Nayaab — a pharmaceutical brand of Ronak Group.",
      },
      { property: "og:title", content: "Global Healthcare Business Opportunities | Dr. Nayaab" },
      {
        property: "og:description",
        content:
          "Work with Dr. Nayaab as an importer, distributor, wholesaler, institutional buyer or healthcare business.",
      },
      { property: "og:url", content: "/global-business" },
    ],
    links: [{ rel: "canonical", href: "/global-business" }],
  }),
  component: GlobalBusiness,
});

const audience = [
  { icon: Ship, t: "Importers", c: "Bringing the portfolio into new markets." },
  { icon: Store, t: "Distributors", c: "Building regional coverage and reach." },
  { icon: PackageSearch, t: "Wholesalers", c: "Supplying pharmacy and trade networks." },
  { icon: Building2, t: "Institutional Buyers", c: "Structured procurement requirements." },
  { icon: Stethoscope, t: "Healthcare Businesses", c: "Clinics, groups and healthcare operators." },
];

function GlobalBusiness() {
  return (
    <>
      <PageHero
        label="Global Business"
        title="Global Healthcare Business"
        highlight="Opportunities"
        intro="We welcome enquiries from importers, distributors, wholesalers, institutional buyers and healthcare businesses seeking Dr. Nayaab product and partnership opportunities."
      />

      <section className="py-24 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>Who We Work With</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Built for Professional <span className="text-brand-red">Buyers</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {audience.map((a, i) => (
              <Reveal key={a.t} delay={i * 70}>
                <div className="h-full rounded-3xl border border-border bg-white p-6">
                  <a.icon className="h-6 w-6 text-brand-red" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold">{a.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-navy py-24 text-white md:py-28">
        <picture>
          <source media="(min-width: 768px)" srcSet={assets.globalDesktop} />
          <img
            src={assets.globalMobile}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        </picture>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,var(--brand-navy)_5%,color-mix(in_oklab,var(--brand-navy)_55%,transparent)_70%,transparent_100%)]"
        />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel tone="light">Product Portfolio</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
              A Portfolio Ready for <span className="text-brand-red">Discussion</span>
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/categories/$slug"
                    params={{ slug: c.slug }}
                    className="group flex items-center justify-between rounded-2xl border border-white/20 px-5 py-4 text-sm font-semibold text-white transition-colors hover:border-brand-red hover:bg-white/5"
                  >
                    {c.name}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60">
              Map imagery is conceptual and does not indicate confirmed market presence.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>How to Enquire</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Three Simple <span className="text-brand-red">Steps</span>
            </h2>
            <ol className="mt-8 list-none space-y-5 pl-0">
              {[
                { t: "Shortlist products", c: "Browse the portfolio and add items to your enquiry list." },
                { t: "Send your enquiry", c: "Tell us your market, business type and requirements." },
                { t: "Speak with our team", c: "We respond with the relevant portfolio and commercial details." },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4 rounded-2xl border border-border bg-white p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{s.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.c}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mb-6 text-2xl font-bold">Business Partnership Form</h2>
            <EnquiryForm compact />
          </Reveal>
        </Container>
      </section>

      <RonakSection />
    </>
  );
}
