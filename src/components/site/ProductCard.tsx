import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryName, imgSrc, type Product } from "@/data/products";
import { useEnquiry } from "@/lib/enquiry";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useEnquiry();
  const added = has(product.slug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-[0_24px_50px_-32px_rgba(16,32,64,0.45)]">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block bg-brand-mist/70 p-5"
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-1 w-0 bg-brand-red transition-all duration-500 group-hover:w-full"
        />
        <img
          src={imgSrc(product.images[0])}
          alt={product.name}
          loading="lazy"
          className="mx-auto h-48 w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] md:h-56"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
          {categoryName(product.category)}
        </p>
        <h3 className="mt-2 text-base leading-snug font-semibold text-brand-navy">
          <Link to="/products/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
          {product.strength && (
            <div className="flex gap-2">
              <dt className="text-brand-navy/60">Strength:</dt>
              <dd>{product.strength}</dd>
            </div>
          )}
          <div className="flex gap-2">
            <dt className="text-brand-navy/60">Dosage form:</dt>
            <dd>{product.form}</dd>
          </div>
          {product.packSize && (
            <div className="flex gap-2">
              <dt className="text-brand-navy/60">Pack:</dt>
              <dd>{product.packSize}</dd>
            </div>
          )}
        </dl>

        <div className="mt-5 flex items-center gap-2 pt-1">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy transition-colors hover:text-brand-red"
          >
            View Product
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <button
            type="button"
            onClick={() => toggle(product.slug)}
            aria-pressed={added}
            className={cn(
              "ml-auto inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors",
              added
                ? "bg-brand-navy text-white"
                : "border border-brand-red/40 text-brand-red hover:bg-brand-red hover:text-white",
            )}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {added ? "In Enquiry" : "Add to Enquiry"}
          </button>
        </div>
      </div>
    </article>
  );
}
