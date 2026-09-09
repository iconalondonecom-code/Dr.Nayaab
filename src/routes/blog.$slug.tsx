import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryCta } from "@/components/site/Sections";
import { getPost, posts } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable | Dr. Nayaab" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} | Dr. Nayaab Insights` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            articleSection: p.category,
            author: { "@type": "Organization", name: "Dr. Nayaab" },
            publisher: { "@type": "Organization", name: "Dr. Nayaab" },
          }),
        },
      ],
    };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug);

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
            <time dateTime={post.date} className="mt-5 block text-sm text-muted-foreground">
              {post.displayDate}
            </time>
          </Container>
        </header>

        <Container className="py-14 md:py-20">
          <img
            src={post.image}
            alt=""
            aria-hidden="true"
            className="w-full rounded-3xl border border-border object-cover"
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {post.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </Container>
      </article>

      <section className="bg-brand-mist py-20">
        <Container>
          <h2 className="text-2xl font-bold md:text-3xl">
            Related <span className="text-brand-red">Articles</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
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
