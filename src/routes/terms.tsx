import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { site } from "@/data/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Dr. Nayaab" },
      {
        name: "description",
        content:
          "Terms of use for the Dr. Nayaab website, a pharmaceutical brand of Ronak Group presenting products for business enquiries.",
      },
      { property: "og:title", content: "Terms & Conditions | Dr. Nayaab" },
      { property: "og:description", content: "Terms of use for the Dr. Nayaab website." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero label="Legal" title="Terms &" highlight="Conditions" />
      <section className="py-20">
        <Container className="max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
          <h2 className="text-xl font-semibold">Purpose of this website</h2>
          <p>
            This website presents the Dr. Nayaab pharmaceutical portfolio for business-to-business
            enquiries. It is not a pharmacy, an online shop or a source of medical advice. No
            products are sold, priced or dispatched through this website.
          </p>
          <h2 className="text-xl font-semibold">Product information</h2>
          <p>
            Product images and details describe pack presentations. Availability, formulation
            details and market-specific requirements are confirmed directly with our business team.
          </p>
          <h2 className="text-xl font-semibold">No medical advice</h2>
          <p>
            Nothing on this website constitutes medical advice, diagnosis or treatment guidance.
            Always consult a qualified healthcare professional.
          </p>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p>
            Dr. Nayaab is a brand of Ronak Group. Enquiries: {site.email} · {site.phone}.
          </p>
        </Container>
      </section>
    </>
  );
}
