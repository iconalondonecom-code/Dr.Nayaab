import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { assets, site } from "@/data/site";
import { Container } from "./Bits";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white/75">
      <img
        src={assets.footerBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,var(--brand-navy)_0%,color-mix(in_oklab,var(--brand-navy)_88%,transparent)_35%,color-mix(in_oklab,var(--brand-navy)_88%,transparent)_65%,var(--brand-navy)_100%)]"
      />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="inline-flex rounded-xl bg-white/95 p-3">
              <img src={assets.logo} alt="Dr. Nayaab" className="h-12 w-auto object-contain" />
            </div>
            <p className="mt-5 text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
              Committed to Care
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Dr. Nayaab is a pharmaceutical brand of Ronak Group, presenting a portfolio of oral
              suspensions, syrups, tablets and nutritional care products for importers,
              distributors, wholesalers and institutional buyers.
            </p>
          </div>

          <FooterCol
            title="Company"
            links={[
              { label: "About Us", to: "/about" },
              { label: "Global Business", to: "/global-business" },
              { label: "Insights", to: "/blog" },
              { label: "Contact Us", to: "/contact" },
            ]}
            external={{ label: "Ronak Group", href: site.parentUrl }}
          />

          <FooterCol
            title="Products"
            links={[
              { label: "All Products", to: "/products" },
              { label: "Oral Suspensions", to: "/categories/oral-suspensions" },
              { label: "Syrups", to: "/categories/syrups" },
              { label: "Tablets", to: "/categories/tablets" },
              {
                label: "Paediatric & Nutritional Care",
                to: "/categories/paediatric-nutritional-care",
              },
            ]}
          />

          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
              Contact
            </h2>
            <address className="mt-5 space-y-3 text-sm not-italic">
              <span className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                <span>{site.address.lines.join(", ")}</span>
              </span>
              <a href={`mailto:${site.email}`} className="flex gap-2.5 hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                {site.email}
              </a>
              <a href={`tel:+919998569923`} className="flex gap-2.5 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                {site.phone}
              </a>
              <a
                href={site.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2.5 hover:text-white"
              >
                <ExternalLink
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                  aria-hidden="true"
                />
                ronak.global
              </a>
            </address>
            <div className="mt-6">
              <p className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
                Business
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Business Enquiry
                  </Link>
                </li>
                <li>
                  <Link to="/global-business" className="hover:text-white">
                    Distributor Enquiry
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white">
                    Product Enquiry
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dr. Nayaab / Ronak Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  external,
}: {
  title: string;
  links: { label: string; to: string }[];
  external?: { label: string; href: string };
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-[0.18em] text-white uppercase">{title}</h2>
      <ul className="mt-5 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
        {external && (
          <li>
            <a
              href={external.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              {external.label}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
