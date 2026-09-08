import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, SectionLabel } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryCta, RonakSection } from "@/components/site/Sections";
import { assets } from "@/data/site";
import { categories } from "@/data/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Nayaab | A Pharmaceutical Brand of Ronak Group" },
      {
        name: "description",
        content:
          "Learn about Dr. Nayaab — a pharmaceutical brand of Ronak Group presenting oral suspensions, syrups, tablets and nutritional care products for international B2B partners.",
      },
      { property: "og:title", content: "About Dr. Nayaab | A Brand of Ronak Group" },
      {
        property: "og:description",
        content:
          "Committed to Care: our portfolio, our approach to international business and our partnership philosophy.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Committed to"
        highlight="Care"
        intro="Dr. Nayaab is a pharmaceutical brand of Ronak Group, presenting a portfolio built for importers, distributors, wholesalers, institutional buyers and healthcare businesses."
      />

      <section className="py-24 md:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>Introduction</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              A Pharmaceutical Brand Built for{" "}
              <span className="text-brand-red">International Business</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Dr. Nayaab presents a focused pharmaceutical portfolio across oral suspensions,
                syrups, tablets and nutritional care presentations. The brand is designed around the
                practical needs of professional buyers: clear product information, consistent
                packaging and direct commercial communication.
              </p>
              <p>
                Our website is not a consumer store. It is a business surface — a place to review
                the portfolio, shortlist the products relevant to your market, and open a
                conversation with our team.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <picture>
              <source media="(min-width: 768px)" srcSet={assets.portfolioDesktop} />
              <img
                src={assets.portfolioMobile}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="w-full rounded-3xl border border-border object-cover"
              />
            </picture>
          </Reveal>
        </Container>
      </section>

      <section className="bg-brand-mist py-24 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>Philosophy</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              The &ldquo;Committed to Care&rdquo; <span className="text-brand-red">Philosophy</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Care in Presentation",
                c: "Every pack, label and carton is treated as part of how the brand is experienced in the market.",
              },
              {
                t: "Care in Communication",
                c: "Accurate, measured information — no overstated claims, no invented credentials.",
              },
              {
                t: "Care in Partnership",
                c: "Relationships built to last, with consistent commercial support over time.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 90}>
                <div className="h-full rounded-3xl border border-border bg-white p-7">
                  <span className="inline-block h-1 w-10 bg-brand-red" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold">{x.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{x.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>Portfolio Overview</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Categories Across the <span className="text-brand-red">Range</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-5 transition-colors hover:border-brand-red/40"
                >
                  <h3 className="text-base font-semibold">{c.name}</h3>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red">
                    View
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-mist py-24 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>International Approach</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Working with <span className="text-brand-red">Global Partners</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We welcome enquiries from businesses evaluating the Dr. Nayaab portfolio for their
              markets. Conversations typically begin with a shortlist of products, followed by a
              discussion of pack presentations and commercial arrangements.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SectionLabel>Partnership Philosophy</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Clarity Before <span className="text-brand-red">Commitment</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We prefer to be precise about what we offer today rather than promise what has not yet
              been established. That approach is the foundation of a partnership our clients can
              rely on.
            </p>
          </Reveal>
        </Container>
      </section>

      <RonakSection />
      <EnquiryCta />
    </>
  );
}
