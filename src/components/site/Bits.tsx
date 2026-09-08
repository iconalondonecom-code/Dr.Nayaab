import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 md:px-8", className)}>{children}</div>;
}

export function SectionLabel({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
        tone === "dark" ? "text-brand-red" : "text-white/80",
        className,
      )}
    >
      <span
        className={cn("h-px w-8", tone === "dark" ? "bg-brand-red" : "bg-white/60")}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 opacity-[0.5]", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, color-mix(in oklab, var(--brand-navy) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--brand-navy) 6%, transparent) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
      }}
    />
  );
}

export function CurveFlow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 h-[220px] w-full", className)}
    >
      <path
        d="M0,150 C280,40 560,240 860,120 C1100,25 1280,90 1440,60"
        fill="none"
        stroke="var(--brand-red)"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <path
        d="M0,180 C300,80 620,270 900,150 C1140,50 1300,120 1440,95"
        fill="none"
        stroke="var(--brand-navy)"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
    </svg>
  );
}
