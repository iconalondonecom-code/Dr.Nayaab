import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { assets, site, whatsappLink } from "@/data/site";
import { Container, SectionLabel } from "./Bits";
import { Reveal } from "./Reveal";

export function EnquiryCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={assets.enquiryCta}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,color-mix(in_oklab,var(--brand-navy)_92%,transparent)_0%,color-mix(in_oklab,var(--brand-navy)_70%,transparent)_55%,color-mix(in_oklab,var(--brand-navy)_40%,transparent)_100%)]"
      />
      <Container className="py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <SectionLabel tone="light">Business Enquiry</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold text-white md:text-5xl">
            Let&rsquo;s Build a Healthier <span className="text-brand-red">Future</span> Together
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">
            Connect with Dr. Nayaab for product enquiries, distribution opportunities and long-term
            business partnerships.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
            >
              Send Business Enquiry
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Enquiry
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function RonakSection() {
  return (
    <section className="relative overflow-hidden bg-brand-mist">
      <Container className="grid items-center gap-12 py-24 md:py-28 lg:grid-cols-2">
        <Reveal>
          <SectionLabel>Parent Company</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">
            A Brand of <span className="text-brand-red">Ronak Group</span>
          </h2>
          <div className="mt-6 inline-flex rounded-2xl border border-border bg-white p-5">
            <img
              src={assets.ronakLogo}
              alt="Ronak Group"
              loading="lazy"
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Dr. Nayaab is a brand of Ronak Group, supported by a broader business foundation and a
            commitment to professional international business relationships.
          </p>
          <a
            href={site.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-soft"
          >
            Discover Ronak Group
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </Reveal>
        <Reveal delay={120} className="relative">
          <img
            src={assets.ronakBacking}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full rounded-3xl border border-border object-cover"
          />
        </Reveal>
      </Container>
    </section>
  );
}
