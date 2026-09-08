import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Container } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { EnquiryCta } from "@/components/site/Sections";
import { categories, productsByCategory, type CategorySlug } from "@/data/products";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category unavailable | Dr. Nayaab" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category.name} | Dr. Nayaab Pharmaceutical Portfolio`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.description },
        { property: "og:url", content: `/categories/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/categories/${params.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = productsByCategory(category.slug as CategorySlug);

  return (
    <>
      <PageHero label="Category" title={category.name} intro={category.description}>
        <nav aria-label="Breadcrumb" className="mt-8 text-sm text-white/70">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/categories" className="hover:text-white">
                Categories
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white">{category.name}</li>
          </ol>
        </nav>
      </PageHero>

      <section className="py-24 md:py-28">
        <Container>
          {items.length === 0 ? (
            <p className="text-muted-foreground">
              No products are currently listed in this category.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 70}>
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
