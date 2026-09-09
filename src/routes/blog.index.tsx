import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryCta } from "@/components/site/Sections";
import { posts } from "@/data/blog";

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
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero
        label="Insights"
        title="Insights for Global Healthcare"
        highlight="Business"
        intro="Explore perspectives on pharmaceutical portfolios, international distribution, healthcare business partnerships and global market opportunities."
      />

      <section className="py-24 md:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
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
