import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Package,
  Globe2,
  Handshake,
  Layers,
  Sparkles,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Container, SectionLabel, GridBackdrop, CurveFlow } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";
import { Hero } from "@/components/site/Hero";
import { ProductCard } from "@/components/site/ProductCard";
import { EnquiryCta, RonakSection } from "@/components/site/Sections";
import { visibleCategories as categories, products, rangePackshot, imgSrc } from "@/data/products";
import { latestPosts } from "@/data/blog";
import { assets, site, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Nayaab | Pharmaceutical Products for Global Business Markets" },
      {
        name: "description",
        content:
          "Explore Dr. Nayaab pharmaceutical products and connect with our team for international distribution, importer, wholesaler and business enquiries. A brand of Ronak Group.",
      },
      { property: "og:title", content: "Dr. Nayaab | Pharmaceutical Products for Global Markets" },
      {
        property: "og:description",
        content:
          "Oral suspensions, syrups, tablets and nutritional care products for importers, distributors, wholesalers and institutional buyers.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const trust = [
  { icon: ShieldCheck, title: "Quality Focused", copy: "A carefully presented pharmaceutical portfolio." },
  { icon: Package, title: "Professional Packaging", copy: "Considered cartons, labels and pack presentations." },
  { icon: Globe2, title: "Global Business Approach", copy: "Built for international B2B conversations." },
  { icon: Handshake, title: "Reliable Partnerships", copy: "Long-term, transparent working relationships." },
];

function Home() {
  const featured = [
    "amoxicillin-oral-suspension-bp-125mg",
    "carbocisteine-2-syrup",
    "diclofenac-sodium-tablets-50mg",
    "cyproheptadine-with-vitamins-minerals-syrup",
    "paracetamol-oral-suspension-125mg",
    "multivitamin-syrup",
    "metronidazole-oral-suspension-bp-125mg-5ml",
    "vitamin-b-complex-tablets",
  ]
    .map((s) => products.find((p) => p.slug === s)!)
    .filter(Boolean);

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="relative z-10 -mt-14 pb-4">
        <Container>
          <Reveal className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-[0_30px_60px_-45px_rgba(16,32,64,0.6)] sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <div key={t.title} className="group bg-white p-6 md:p-7">
                <t.icon className="h-6 w-6 text-brand-navy" strokeWidth={1.5} aria-hidden="true" />
                <h2 className="mt-4 flex items-center gap-2 text-base font-semibold text-brand-navy">
                  <span className="h-3 w-0.5 bg-brand-red" aria-hidden="true" />
                  {t.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{t.copy}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Categories */}
      <section className="relative overflow-hidden py-24 md:py-28">
        <GridBackdrop />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel>Our Portfolio</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Explore Our Product <span className="text-brand-red">Categories</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-[0_28px_60px_-40px_rgba(16,32,64,0.5)]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-brand-mist">
                    <img
                      src={c.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold">{c.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
                      View category
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio */}
      <section className="relative overflow-hidden bg-brand-mist py-24 md:py-28">
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <SectionLabel>Selected Products</SectionLabel>
              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Explore the Dr. Nayaab <span className="text-brand-red">Portfolio</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Oral suspensions, syrups, tablets and nutritional care presentations. Shortlist the
                products relevant to your market and send one combined business enquiry.
              </p>
              <Link
                to="/products"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-soft"
              >
                View All Products
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
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
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality */}
      <section className="relative overflow-hidden py-24 md:py-28">
        <CurveFlow className="top-0 opacity-70" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Precision in Every <span className="text-brand-red">Detail</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Dr. Nayaab is built around a clearly presented portfolio, professional packaging and
              a business approach designed for international partners. Our focus is on clarity,
              consistency and reliability in every commercial conversation.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { icon: Layers, t: "Diverse Portfolio", c: "Multiple dosage forms and pack presentations." },
                { icon: Sparkles, t: "Professional Presentation", c: "Consistent artwork and packaging quality." },
                { icon: Globe2, t: "Global Outlook", c: "Structured for international business enquiries." },
                { icon: Handshake, t: "Partnership Focus", c: "Long-term relationships over one-off deals." },
              ].map((p) => (
                <div key={p.t} className="rounded-2xl border border-border bg-white p-5">
                  <p.icon className="h-5 w-5 text-brand-red" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-3 text-base font-semibold">{p.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.c}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <picture>
              <source media="(min-width: 768px)" srcSet={assets.qualityDesktop} />
              <img
                src={assets.qualityMobile}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="w-full rounded-3xl border border-border object-cover"
              />
            </picture>
            <p className="mt-3 text-xs text-muted-foreground">
              Conceptual brand visual. Not a depiction of a specific facility.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Global business */}
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
          className="absolute inset-0 bg-[linear-gradient(90deg,var(--brand-navy)_5%,color-mix(in_oklab,var(--brand-navy)_60%,transparent)_60%,transparent_100%)]"
        />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel tone="light">Global Business</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
              Partnering for Global Healthcare{" "}
              <span className="text-brand-red">Opportunities</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/80">
              We welcome enquiries from importers, distributors, wholesalers, institutional buyers
              and healthcare businesses seeking Dr. Nayaab product and partnership opportunities.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/global-business"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
              >
                Explore Partnership Opportunities
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Business Enquiry
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/60">
              Map imagery is conceptual and does not indicate confirmed market presence.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Partnerships */}
      <section className="relative overflow-hidden py-24 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="relative">
            <img
              src={assets.partnership}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-full rounded-3xl border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <SectionLabel>Partnerships</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Let&rsquo;s Build Stronger Healthcare{" "}
              <span className="text-brand-red">Partnerships</span>
            </h2>
            <ul className="mt-8 space-y-3">
              {[
                "Distribution Enquiries",
                "Import & Wholesale",
                "Institutional Enquiries",
                "General Business Collaboration",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-sm font-semibold text-brand-navy"
                >
                  <span className="h-8 w-1 rounded-full bg-brand-red" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
            >
              Partner With Us
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Insights */}
      <section className="relative overflow-hidden bg-brand-mist py-24 md:py-28">
        <Container>
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionLabel>Insights</SectionLabel>
              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Insights for Global Healthcare <span className="text-brand-red">Business</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Explore perspectives on pharmaceutical portfolios, international distribution,
                healthcare business partnerships and global market opportunities.
              </p>
            </div>
            <Link
              to="/blog"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-red"
            >
              View All Insights
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latestPosts(3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={p.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
                      {p.category}
                    </p>
                    <h3 className="mt-3 text-lg leading-snug font-semibold">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <time dateTime={p.date} className="text-muted-foreground">
                        {p.displayDate}
                      </time>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-brand-navy group-hover:text-brand-red">
                        Read Article
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <RonakSection />
      <EnquiryCta />

      {/* Contact preview */}
      <section className="relative overflow-hidden py-24 md:py-28">
        <GridBackdrop />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Start a Business <span className="text-brand-red">Conversation</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Share your market, business type and products of interest — our team will respond with
              the relevant portfolio details.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <p className="flex gap-3 text-brand-navy">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                <span>{site.address.lines.join(", ")}</span>
              </p>
              <a
                href={`mailto:${site.email}`}
                className="flex gap-3 text-brand-navy hover:text-brand-red"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                {site.email}
              </a>
              <a href="tel:+919998569923" className="flex gap-3 text-brand-navy hover:text-brand-red">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-brand-red px-7 py-3.5 text-sm font-semibold text-white hover:bg-brand-red-dark"
              >
                Business Enquiry Form
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy/25 px-7 py-3.5 text-sm font-semibold text-brand-navy hover:border-brand-navy"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Business Enquiry
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={imgSrc(rangePackshot)}
              alt="Dr. Nayaab product range"
              loading="lazy"
              className="mx-auto w-full max-w-xl object-contain"
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
