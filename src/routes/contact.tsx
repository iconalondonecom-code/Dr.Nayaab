import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { Container, SectionLabel } from "@/components/site/Bits";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { site, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Business Enquiry | Dr. Nayaab" },
      {
        name: "description",
        content:
          "Start a business conversation with Dr. Nayaab. Send a product, distribution or partnership enquiry, or reach our team by email, phone or WhatsApp.",
      },
      { property: "og:title", content: "Contact Dr. Nayaab | Business Enquiry" },
      {
        property: "og:description",
        content:
          "Contact the Dr. Nayaab team in Vadodara, Gujarat, India for product and partnership enquiries.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Start a Business"
        highlight="Conversation"
        intro="Share your market, business type and products of interest — our team will respond with the relevant portfolio details."
      />

      <section className="py-24 md:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Dr. Nayaab <span className="text-brand-red">Business Team</span>
            </h2>

            <address className="mt-8 space-y-5 text-sm not-italic">
              <p className="flex gap-3 text-brand-navy">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                <span>
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </p>
              <a
                href={`mailto:${site.email}`}
                className="flex gap-3 text-brand-navy hover:text-brand-red"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                {site.email}
              </a>
              <a
                href="tel:+919998569923"
                className="flex gap-3 text-brand-navy hover:text-brand-red"
              >
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                {site.phone}
              </a>
              <a
                href={site.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-brand-navy hover:text-brand-red"
              >
                <ExternalLink
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                  aria-hidden="true"
                />
                ronak.global — parent company
              </a>
            </address>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-soft"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Business Enquiry
            </a>
          </Reveal>

          <Reveal delay={120}>
            <EnquiryForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
