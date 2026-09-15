import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { EnquiryCta } from "@/components/site/Sections";
import { getPost, relatedPosts, type Block } from "@/data/blog";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable | Dr. Nayaab" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.post;
    const url = `https://dr-nayaab-lab.lovable.app/blog/${params.slug}`;
    return {
      meta: [
        { title: `${p.title} | Dr. Nayaab Insights` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            articleSection: p.category,
            description: p.excerpt,
            author: { "@type": "Organization", name: "Dr. Nayaab" },
            publisher: { "@type": "Organization", name: "Dr. Nayaab" },
            mainEntityOfPage: url,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://dr-nayaab-lab.lovable.app/" },
              { "@type": "ListItem", position: 2, name: "Insights", item: "https://dr-nayaab-lab.lovable.app/blog" },
              { "@type": "ListItem", position: 3, name: p.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: BlogArticle,
});

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2")
    return <h2 className="mt-12 text-2xl font-bold text-brand-navy md:text-3xl">{block.text}</h2>;
  if (block.type === "h3")
    return <h3 className="mt-8 text-xl font-semibold text-brand-navy">{block.text}</h3>;
  if (block.type === "ul")
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" aria-hidden="true" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    );
  return <p className="mt-5">{block.text}</p>;
}

function BlogArticle() {
  const { post } = Route.useLoaderData();
  const related = relatedPosts(post, 3);
  const linkedProducts = (post.relatedProducts ?? [])
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <article>
        <header className="border-b border-border bg-brand-mist py-16 md:py-20">
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
                  <Link to="/blog" className="hover:text-brand-red">
                    Insights
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-brand-navy">{post.category}</li>
              </ol>
            </nav>
            <p className="mt-8 text-[0.7rem] font-semibold tracking-[0.18em] text-brand-red uppercase">
              {post.category}
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">{post.title}</h1>
            <p className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={post.date}>{post.displayDate}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readMinutes} min read</span>
            </p>
          </Container>
        </header>

        <Container className="py-14 md:py-20">
          <img
            src={post.image}
            alt=""
            aria-hidden="true"
            className="w-full rounded-3xl border border-border object-cover"
          />
          <div className="mx-auto mt-12 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {post.body.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}

            <div className="mt-12 rounded-3xl border border-border bg-brand-mist p-7">
              <h2 className="text-xl font-bold text-brand-navy">Continue exploring</h2>
              <ul className="mt-4 space-y-2 text-base">
                <li>
                  <Link to="/products" className="font-semibold text-brand-red hover:underline">
                    Browse the full Dr. Nayaab product portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="font-semibold text-brand-red hover:underline">
                    View products by category
                  </Link>
                </li>
                <li>
                  <Link to="/global-business" className="font-semibold text-brand-red hover:underline">
                    Distribution and partnership opportunities
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="font-semibold text-brand-red hover:underline">
                    Send a business enquiry
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </article>

      {linkedProducts.length > 0 && (
        <section className="py-16 md:py-20">
          <Container>
            <h2 className="text-2xl font-bold md:text-3xl">
              Related <span className="text-brand-red">Products</span>
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {linkedProducts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-brand-mist py-20">
        <Container>
          <h2 className="text-2xl font-bold md:text-3xl">
            Related <span className="text-brand-red">Articles</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition-colors hover:border-brand-red/40"
                >
                  <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
                    {p.category}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy group-hover:text-brand-red">
                    Read Article
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
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
