import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { assets } from "@/data/site";
import { Container } from "./Bits";

/**
 * Hero: HTML content on the left, approved product-portfolio artwork on the right.
 * No dedicated hero artwork exists yet, so no reference to a missing file is made.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-mist">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_85%_10%,#ffffff_0%,var(--brand-mist)_45%,color-mix(in_oklab,var(--brand-navy)_8%,white)_100%)]" />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
          <path
            d="M760,900 C900,620 1080,560 1440,520"
            fill="none"
            stroke="var(--brand-red)"
            strokeOpacity="0.4"
            strokeWidth="3"
          />
          <path
            d="M700,900 C880,560 1120,470 1440,420"
            fill="none"
            stroke="var(--brand-navy)"
            strokeOpacity="0.14"
            strokeWidth="2"
          />
        </svg>
      </div>

      <Container className="relative grid items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        <div className="w-full max-w-xl">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-red uppercase">
            <span className="h-px w-8 bg-brand-red" aria-hidden="true" />
            Dr. Nayaab — Committed to Care
          </p>
          <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold text-balance-tight md:text-5xl lg:text-6xl">
            Healthcare Solutions for <span className="text-brand-red">Global Markets</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-navy/75 md:text-lg">
            Explore the Dr. Nayaab pharmaceutical portfolio and connect with our team for
            international business, distribution and product enquiries.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-16px_var(--brand-red)] transition-colors hover:bg-brand-red-dark"
            >
              Explore Products
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-brand-navy/25 bg-white/70 px-7 py-3.5 text-sm font-semibold text-brand-navy backdrop-blur-sm transition-colors hover:border-brand-navy hover:bg-white"
            >
              Business Enquiry
            </Link>
            <Link
              to="/global-business"
              className="inline-flex items-center justify-center px-2 py-3.5 text-sm font-semibold text-brand-navy/70 underline-offset-4 transition-colors hover:text-brand-red hover:underline"
            >
              Become a Distributor
            </Link>
          </div>
        </div>

        <div className="relative">
          <picture>
            <source media="(min-width: 768px)" srcSet={assets.portfolioDesktop} />
            <img
              src={assets.portfolioMobile}
              alt="Dr. Nayaab pharmaceutical product portfolio"
              fetchPriority="high"
              className="w-full rounded-[2rem] border border-border object-cover shadow-[0_40px_80px_-50px_rgba(16,32,64,0.65)]"
            />
          </picture>
        </div>
      </Container>
    </section>
  );
}
