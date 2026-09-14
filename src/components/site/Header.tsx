import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ClipboardList, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { assets, site } from "@/data/site";
import { useEnquiry } from "@/lib/enquiry";
import { Container } from "./Bits";

const nav = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Global Business", to: "/global-business" },
  { label: "Insights", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { items, setOpen } = useEnquiry();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-white/90 shadow-[0_6px_30px_-18px_rgba(16,32,64,0.5)] backdrop-blur-md"
          : "border-transparent bg-white/70 backdrop-blur-sm",
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Dr. Nayaab home">
          <img
            src={assets.logo}
            alt="Dr. Nayaab"
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-10 md:h-11" : "h-12 md:h-14",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative rounded-md px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap text-brand-navy/85 transition-colors hover:text-brand-red"
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-brand-red" }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={site.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap text-brand-navy/85 transition-colors hover:text-brand-red"
          >
            Ronak Group
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-brand-navy transition-colors hover:border-brand-red/50 hover:text-brand-red"
          >
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Enquiry List</span>
            {items.length > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1.5 text-xs font-semibold text-white">
                {items.length}
              </span>
            )}
          </button>

          <Link
            to="/contact"
            className="hidden rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_var(--brand-red)] transition-colors hover:bg-brand-red-dark md:inline-flex"
          >
            Business Enquiry
          </Link>

          <button
            type="button"
            className="rounded-xl border border-border p-2 text-brand-navy xl:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className="fixed inset-0 top-0 z-50 bg-white xl:hidden">
          <Container className="flex h-[76px] items-center justify-between">
            <img src={assets.logo} alt="Dr. Nayaab" className="h-11 w-auto object-contain" />
            <button
              type="button"
              className="rounded-xl border border-border p-2 text-brand-navy"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </Container>
          <Container className="flex flex-col gap-1 pt-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/70 py-4 text-lg font-semibold text-brand-navy"
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-brand-red" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={site.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-border/70 py-4 text-lg font-semibold text-brand-navy"
            >
              Ronak Group
            </a>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 rounded-xl bg-brand-red px-5 py-3.5 text-center text-base font-semibold text-white"
            >
              Business Enquiry
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
