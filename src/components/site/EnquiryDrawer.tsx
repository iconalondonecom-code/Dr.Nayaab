import { Link } from "@tanstack/react-router";
import { X, Trash2, ClipboardList } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry";
import { getProduct, imgSrc } from "@/data/products";

export function EnquiryDrawer() {
  const { open, setOpen, items, remove, clear } = useEnquiry();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Enquiry list">
      <button
        type="button"
        aria-label="Close enquiry list"
        className="absolute inset-0 bg-brand-navy/45 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand-navy">
            <ClipboardList className="h-5 w-5 text-brand-red" aria-hidden="true" />
            Enquiry List
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg border border-border p-2 text-brand-navy"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="pt-10 text-center">
              <p className="text-sm text-muted-foreground">
                Your enquiry list is empty. Browse the portfolio and add the products relevant to
                your market.
              </p>
              <Link
                to="/products"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((slug) => {
                const p = getProduct(slug);
                if (!p) return null;
                return (
                  <li
                    key={slug}
                    className="flex items-center gap-4 rounded-2xl border border-border p-3"
                  >
                    <img
                      src={imgSrc(p.images[0])}
                      alt={p.name}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-brand-navy">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {[p.strength, p.form].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(slug)}
                      aria-label={`Remove ${p.name} from enquiry list`}
                      className="rounded-lg p-2 text-brand-navy/60 hover:text-brand-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-border px-6 py-5">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-brand-red px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-red-dark"
            >
              Send Product Enquiry
            </Link>
            <button
              type="button"
              onClick={clear}
              className="w-full text-center text-xs font-medium text-muted-foreground hover:text-brand-red"
            >
              Clear list
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
