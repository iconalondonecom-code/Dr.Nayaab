import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { EnquiryCta } from "@/components/site/Sections";
import { visibleCategories as categories, products } from "@/data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "All Products | Dr. Nayaab Pharmaceutical Portfolio" },
      {
        name: "description",
        content:
          "Browse the full Dr. Nayaab product catalogue — oral suspensions, syrups, tablets and nutritional care presentations. Add products to your enquiry list and contact our team.",
      },
      { property: "og:title", content: "All Products | Dr. Nayaab" },
      {
        property: "og:description",
        content:
          "Search and filter the Dr. Nayaab pharmaceutical portfolio and send a combined business enquiry.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [filter, setFilter] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");

  const visible = products.filter((p) => {
    const matchesCat = filter === "all" || p.category === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.strength ?? "").toLowerCase().includes(q) ||
      p.form.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Dr. Nayaab"
        highlight="Products"
        intro="Explore the portfolio, shortlist the products relevant to your market and send one combined business enquiry."
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {[{ slug: "all", name: "All" }, ...categories].map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setFilter(c.slug)}
                  className={cn(
                    "shrink-0 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                    filter === c.slug
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-border text-brand-navy hover:border-brand-red/40 hover:text-brand-red",
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="relative lg:w-80">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label className="sr-only" htmlFor="product-search">
                Search products
              </label>
              <input
                id="product-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full rounded-xl border border-border bg-white py-3 pr-4 pl-11 text-sm text-brand-navy outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Showing {visible.length} of {products.length} products
          </p>

          {visible.length === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">
              No products match your search.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 60}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
      <EnquiryCta />
    </>
  );
}
