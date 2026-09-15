import * as React from "react";
import { MessageCircle, Mail } from "lucide-react";
import { businessTypes, site } from "@/data/site";
import { getProduct } from "@/data/products";
import { useEnquiry } from "@/lib/enquiry";

const field =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-navy outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";
const errorField = "border-brand-red ring-2 ring-brand-red/20";
const labelCls = "text-sm font-medium text-brand-navy";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  products: string;
  message: string;
}

const empty: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  businessType: "",
  products: "",
  message: "",
};

const LIMITS = { name: 100, company: 120, email: 255, phone: 32, country: 80, products: 600, message: 1500 };

function validate(v: FormState) {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  else if (v.name.trim().length > LIMITS.name) e.name = "Name is too long.";
  if (!v.email.trim()) e.email = "Please enter your business email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.phone && !/^[+()\-\s\d]{6,32}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!v.businessType) e.businessType = "Please select your business type.";
  if (!v.message.trim()) e.message = "Please tell us briefly about your requirement.";
  else if (v.message.trim().length > LIMITS.message) e.message = "Message is too long.";
  return e;
}

function buildEnquiryText(v: FormState) {
  return [
    "Dr. Nayaab business enquiry",
    `Name: ${v.name}`,
    v.company && `Company: ${v.company}`,
    `Email: ${v.email}`,
    v.phone && `Phone / WhatsApp: ${v.phone}`,
    v.country && `Country: ${v.country}`,
    `Business type: ${v.businessType}`,
    v.products && `Products of interest: ${v.products}`,
    "",
    v.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const { items } = useEnquiry();
  const preselected = items
    .map((s) => getProduct(s)?.name)
    .filter(Boolean)
    .join(", ");

  const [values, setValues] = React.useState<FormState>(empty);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (preselected) setValues((v) => (v.products ? v : { ...v, products: preselected }));
  }, [preselected]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [k]: value }));
    if (touched) setErrors(validate({ ...values, [k]: value }));
  };

  const submit = (channel: "whatsapp" | "email") => {
    setTouched(true);
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById(`ef-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const text = buildEnquiryText(values);
    if (channel === "whatsapp") {
      window.open(`${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Dr. Nayaab business enquiry",
      )}&body=${encodeURIComponent(text)}`;
    }
  };

  const Err = ({ k }: { k: keyof FormState }) =>
    errors[k] ? (
      <p className="text-xs font-medium text-brand-red" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit("email");
      }}
      className="rounded-3xl border border-border bg-white p-6 md:p-8"
    >
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-name">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="ef-name"
            value={values.name}
            onChange={set("name")}
            maxLength={LIMITS.name}
            className={`${field} ${errors.name ? errorField : ""}`}
            placeholder="Your full name"
          />
          <Err k="name" />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-company">
            Company
          </label>
          <input
            id="ef-company"
            value={values.company}
            onChange={set("company")}
            maxLength={LIMITS.company}
            className={field}
            placeholder="Company name"
          />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-email">
            Email <span className="text-brand-red">*</span>
          </label>
          <input
            id="ef-email"
            type="email"
            value={values.email}
            onChange={set("email")}
            maxLength={LIMITS.email}
            className={`${field} ${errors.email ? errorField : ""}`}
            placeholder="name@company.com"
          />
          <Err k="email" />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-phone">
            Phone / WhatsApp
          </label>
          <input
            id="ef-phone"
            value={values.phone}
            onChange={set("phone")}
            maxLength={LIMITS.phone}
            className={`${field} ${errors.phone ? errorField : ""}`}
            placeholder="+00 000 000 0000"
          />
          <Err k="phone" />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-country">
            Country
          </label>
          <input
            id="ef-country"
            value={values.country}
            onChange={set("country")}
            maxLength={LIMITS.country}
            className={field}
            placeholder="Country"
          />
        </div>
        <div className="grid gap-1.5">
          <label className={labelCls} htmlFor="ef-businessType">
            Business Type <span className="text-brand-red">*</span>
          </label>
          <select
            id="ef-businessType"
            value={values.businessType}
            onChange={set("businessType")}
            className={`${field} ${errors.businessType ? errorField : ""}`}
          >
            <option value="" disabled>
              Select business type
            </option>
            {businessTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <Err k="businessType" />
        </div>
      </div>

      <div className="mt-4 grid gap-1.5">
        <label className={labelCls} htmlFor="ef-products">
          Products of Interest
        </label>
        <textarea
          id="ef-products"
          rows={2}
          value={values.products}
          onChange={set("products")}
          maxLength={LIMITS.products}
          className={field}
          placeholder="Products or categories you would like to discuss"
        />
        {preselected && (
          <p className="text-xs text-muted-foreground">
            Pre-filled from your enquiry list. You can edit this freely.
          </p>
        )}
      </div>

      <div className="mt-4 grid gap-1.5">
        <label className={labelCls} htmlFor="ef-message">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="ef-message"
          rows={4}
          value={values.message}
          onChange={set("message")}
          maxLength={LIMITS.message}
          className={`${field} ${errors.message ? errorField : ""}`}
          placeholder="Tell us about your market and requirements"
        />
        <Err k="message" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Send Business Enquiry by Email
        </button>
        <button
          type="button"
          onClick={() => submit("whatsapp")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy/25 px-6 py-3.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp Enquiry
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Your enquiry is sent directly to our team at {site.email} through your own email app, or via
        WhatsApp on {site.phone}. Nothing is stored on this website.
      </p>
    </form>
  );
}
