import * as React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Plus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionLabel } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { EnquiryCta } from "@/components/site/Sections";
import { getProduct, categoryName, imgSrc, products } from "@/data/products";
import { useEnquiry } from "@/lib/enquiry";
import { whatsappLink } from "@/data/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable | Dr. Nayaab" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const title = `${p.name}${p.strength ? ` ${p.strength}` : ""} | Dr. Nayaab`;
    const description = `${p.name}${p.strength ? ` ${p.strength}` : ""} — ${p.form} from the Dr. Nayaab pharmaceutical portfolio. Available for international business and distribution enquiries.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            category: categoryName(p.category),
            brand: { "@type": "Brand", name: "Dr. Nayaab" },
          }),
        },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = React.useState(0);
  const { has, toggle, setOpen } = useEnquiry();
  const added = has(product.slug);

  React.useEffect(() => setActive(0), [product.slug]);

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <section className="border-b border-border bg-brand-mist py-20 md:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link to="/" className="hover:text-brand-red">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/products" className="hover:text-brand-red">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-navy">{product.name}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div>
              <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
                <img
                  src={imgSrc(product.images[active])}
                  alt={product.name}
                  className="mx-auto h-[320px] w-full object-contain md:h-[440px]"
                />
              </div>
              {product.images.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`View image ${i + 1} of ${product.name}`}
                      aria-current={i === active}
                      className={cn(
                        "rounded-2xl border bg-white p-2 transition-colors",
                        i === active ? "border-brand-red" : "border-border hover:border-brand-red/40",
                      )}
                    >
                      <img
                        src={imgSrc(img)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-16 w-16 object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <SectionLabel>{categoryName(product.category)}</SectionLabel>
              <h1 className="mt-5 text-3xl font-bold md:text-4xl">{product.name}</h1>
              <dl className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white text-sm">
                {product.strength && <Row label="Strength" value={product.strength} />}
                <Row label="Dosage form" value={product.form} />
                {product.packSize && <Row label="Pack size" value={product.packSize} />}
                <Row label="Category" value={categoryName(product.category)} />
                {product.variants && <Row label="Presentations" value={product.variants} />}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    toggle(product.slug);
                    if (!added) setOpen(true);
                  }}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-colors",
                    added
                      ? "bg-brand-navy text-white hover:bg-brand-navy-soft"
                      : "bg-brand-red text-white hover:bg-brand-red-dark",
                  )}
                >
                  {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {added ? "Added to Enquiry" : "Add to Enquiry"}
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-brand-navy/25 px-7 py-3.5 text-sm font-semibold text-brand-navy hover:border-brand-navy"
                >
                  Business Enquiry
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3.5 text-sm font-semibold text-brand-navy hover:border-brand-red/40 hover:text-brand-red"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Product information shown reflects the pack presentation only. For regulatory,
                formulation and market-specific details, please contact our business team.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-24 md:py-28">
          <Container>
            <h2 className="text-2xl font-bold md:text-3xl">
              Related <span className="text-brand-red">Products</span>
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <EnquiryCta />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 px-5 py-4">
      <dt className="w-36 shrink-0 text-muted-foreground">{label}</dt>
      <dd className="font-medium text-brand-navy">{value}</dd>
    </div>
  );
}
