import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryCta } from "@/components/site/Sections";
import { posts, postCategories } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights | Pharmaceutical Business & Distribution | Dr. Nayaab" },
      {
        name: "description",
        content:
          "Perspectives on pharmaceutical portfolios, international distribution, healthcare business partnerships and global market opportunities from Dr. Nayaab.",
      },
      { property: "og:title", content: "Insights for Global Healthcare Business | Dr. Nayaab" },
      {
        property: "og:description",
        content:
          "Articles on pharmaceutical distribution, B2B procurement and healthcare partnerships.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://dr-nayaab-lab.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://dr-nayaab-lab.lovable.app/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [filter, setFilter] = React.useState<string>("All");
  const list = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const [featured, ...rest] = list;

  return (
    <>
      <PageHero
        label="Insights"
        title="Insights for Global Healthcare"
        highlight="Business"
        intro="Explore perspectives on pharmaceutical portfolios, international distribution, healthcare business partnerships and global market opportunities."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap gap-2">
            {["All", ...postCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === c
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-border text-brand-navy hover:border-brand-red/50 hover:text-brand-red",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {featured && (
            <Reveal className="mt-10">
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="group grid overflow-hidden rounded-3xl border border-border bg-white transition-colors hover:border-brand-red/40 lg:grid-cols-2"
              >
                <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                  <img
                    src={featured.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
                    {featured.category}
                  </p>
                  <h2 className="mt-4 text-2xl leading-snug font-bold md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-base text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={featured.date}>{featured.displayDate}</time>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readMinutes} min read</span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy group-hover:text-brand-red">
                    Read Article
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={p.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
                      {p.category}
                    </p>
                    <h2 className="mt-3 text-lg leading-snug font-semibold">{p.title}</h2>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <time dateTime={p.date} className="text-muted-foreground">
                        {p.displayDate}
                      </time>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-brand-navy group-hover:text-brand-red">
                        Read Article
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
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
