import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Dr. Nayaab" },
      {
        name: "description",
        content:
          "How Dr. Nayaab, a brand of Ronak Group, handles information submitted through business enquiry forms on this website.",
      },
      { property: "og:title", content: "Privacy Policy | Dr. Nayaab" },
      { property: "og:description", content: "Information handling on the Dr. Nayaab website." },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero label="Legal" title="Privacy" highlight="Policy" />
      <section className="py-20">
        <Container className="max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
          <h2 className="text-xl font-semibold">Information we collect</h2>
          <p>
            This website collects only the information you choose to submit through our business
            enquiry forms: your name, company, email address, phone or WhatsApp number, country,
            business type, products of interest and message.
          </p>
          <h2 className="text-xl font-semibold">How we use it</h2>
          <p>
            Enquiry information is used solely to respond to your business enquiry and to discuss
            product, distribution and partnership opportunities. We do not sell your information.
          </p>
          <h2 className="text-xl font-semibold">Enquiry list</h2>
          <p>
            Products you add to your enquiry list are stored in your own browser so that your
            shortlist is available when you return. You can clear the list at any time.
          </p>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p>
            For any question about this policy, write to {site.email} or contact us at {site.phone}.
          </p>
        </Container>
      </section>
    </>
  );
}
