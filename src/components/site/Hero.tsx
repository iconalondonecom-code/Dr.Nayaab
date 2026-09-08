import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { assets } from "@/data/site";
import { Container } from "./Bits";

/**
 * The hero is designed around ONE complete approved artwork
 * (dr-nayaab-01-homepage-hero-desktop.png / -mobile.png).
 * Those two files are not in the repository yet — until they are added the
 * hero falls back to a plain brand-coloured canvas (no substitute imagery).
 */
export function Hero() {
  const [heroAvailable, setHeroAvailable] = React.useState(true);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setHeroAvailable(true);
    img.onerror = () => setHeroAvailable(false);
    img.src = assets.heroDesktop;
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-brand-mist">
      {heroAvailable ? (
        <>
          <picture>
            <source media="(min-width: 768px)" srcSet={assets.heroDesktop} />
            <img
              src={assets.heroMobile}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-right"
            />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.86)_38%,rgba(255,255,255,0.25)_58%,rgba(255,255,255,0)_75%)] md:bg-[linear-gradient(100deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.8)_34%,rgba(255,255,255,0.1)_52%,rgba(255,255,255,0)_66%)]"
          />
        </>
      ) : (
        <BrandCanvas />
      )}

      <Container className="relative flex min-h-[620px] items-center py-20 md:min-h-[780px] lg:min-h-[860px]">
        <div className="w-full max-w-xl lg:max-w-[46%]">
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
              Explore Portfolio
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
      </Container>
    </section>
  );
}

function BrandCanvas() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_85%_10%,#ffffff_0%,var(--brand-mist)_45%,color-mix(in_oklab,var(--brand-navy)_8%,white)_100%)]" />
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
        <path
          d="M760,900 C900,620 1080,560 1440,520"
          fill="none"
          stroke="var(--brand-red)"
          strokeOpacity="0.5"
          strokeWidth="3"
        />
        <path
          d="M700,900 C880,560 1120,470 1440,420"
          fill="none"
          stroke="var(--brand-navy)"
          strokeOpacity="0.18"
          strokeWidth="2"
        />
        <circle
          cx="1180"
          cy="380"
          r="220"
          fill="none"
          stroke="var(--brand-navy)"
          strokeOpacity="0.12"
        />
        <circle
          cx="1180"
          cy="380"
          r="140"
          fill="none"
          stroke="var(--brand-red)"
          strokeOpacity="0.18"
        />
      </svg>
    </div>
  );
}
