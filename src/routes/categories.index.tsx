import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryCta } from "@/components/site/Sections";
import { categories, productsByCategory } from "@/data/products";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Product Categories | Dr. Nayaab Pharmaceutical Portfolio" },
      {
        name: "description",
        content:
          "Browse Dr. Nayaab product categories: oral suspensions, syrups, tablets, paediatric and nutritional care, and other pharmaceutical presentations.",
      },
      { property: "og:title", content: "Product Categories | Dr. Nayaab" },
      {
        property: "og:description",
        content: "Oral suspensions, syrups, tablets and nutritional care presentations.",
      },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <PageHero
        label="Our Portfolio"
        title="Product"
        highlight="Categories"
        intro="Explore the Dr. Nayaab portfolio by dosage form and product family."
      />
      <section className="py-24 md:py-28">
        <Container>
          <div className="grid gap-8">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="group grid overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:border-brand-red/40 hover:shadow-[0_28px_60px_-40px_rgba(16,32,64,0.5)] md:grid-cols-[1.1fr_1fr]"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-brand-mist md:aspect-auto">
                    <img
                      src={c.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
                      {productsByCategory(c.slug).length} products
                    </p>
                    <h2 className="mt-3 text-2xl font-bold md:text-3xl">{c.name}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy group-hover:text-brand-red">
                      View products
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1.5"
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
      <EnquiryCta />
    </>
  );
}
