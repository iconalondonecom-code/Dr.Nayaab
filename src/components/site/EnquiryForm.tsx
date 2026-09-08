import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { businessTypes } from "@/data/site";
import { getProduct } from "@/data/products";
import { useEnquiry } from "@/lib/enquiry";

const field =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-navy outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";
const labelCls = "text-sm font-medium text-brand-navy";

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const { items } = useEnquiry();
  const [sent, setSent] = React.useState(false);

  const preselected = items
    .map((s) => getProduct(s)?.name)
    .filter(Boolean)
    .join(", ");

  if (sent) {
    return (
      <div className="rounded-3xl border border-border bg-white p-8 text-center md:p-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-red" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-brand-navy">
          Thank you. Your business enquiry has been received.
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Your details have been recorded in this browser only. For an immediate response, please
          also write to contact@ronak.global or message our team on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-brand-navy hover:border-brand-red/50 hover:text-brand-red"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-border bg-white p-6 md:p-8"
    >
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-name">
            Full Name
          </label>
          <input id="ef-name" name="name" required className={field} placeholder="Your full name" />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-company">
            Company
          </label>
          <input id="ef-company" name="company" className={field} placeholder="Company name" />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-email">
            Email
          </label>
          <input
            id="ef-email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="name@company.com"
          />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-phone">
            Phone / WhatsApp
          </label>
          <input id="ef-phone" name="phone" className={field} placeholder="+00 000 000 0000" />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-country">
            Country
          </label>
          <input id="ef-country" name="country" className={field} placeholder="Country" />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-type">
            Business Type
          </label>
          <select id="ef-type" name="businessType" defaultValue="" className={field} required>
            <option value="" disabled>
              Select business type
            </option>
            {businessTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-1.5">
        <label className={labelCls} htmlFor="ef-products">
          Products of Interest
        </label>
        <textarea
          id="ef-products"
          name="products"
          rows={2}
          defaultValue={preselected}
          key={preselected}
          className={field}
          placeholder="Products or categories you would like to discuss"
        />
      </div>

      <div className="mt-4 grid gap-1.5">
        <label className={labelCls} htmlFor="ef-message">
          Message
        </label>
        <textarea
          id="ef-message"
          name="message"
          rows={4}
          className={field}
          placeholder="Tell us about your market and requirements"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
      >
        Send Business Enquiry
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        This form does not yet send email. Enquiries submitted here are shown as confirmed on screen
        only — connect an email service to deliver them to your inbox.
      </p>
    </form>
  );
}
