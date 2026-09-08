import type { ReactNode } from "react";
import { Container, SectionLabel } from "./Bits";

export function PageHero({
  label,
  title,
  highlight,
  intro,
  children,
}: {
  label: string;
  title: string;
  highlight?: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 text-white md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 30% 50%, black 10%, transparent 70%)",
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M700,400 C900,220 1160,300 1440,150"
          fill="none"
          stroke="var(--brand-red)"
          strokeOpacity="0.5"
          strokeWidth="2.5"
        />
        <path
          d="M780,400 C1000,180 1200,260 1440,60"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
      </svg>
      <Container className="relative">
        <SectionLabel tone="light">{label}</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold text-white md:text-5xl">
          {title} {highlight && <span className="text-brand-red">{highlight}</span>}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
