import * as React from "react";

const KEY = "dr-nayaab-enquiry-list";

interface EnquiryContextValue {
  items: string[];
  has: (slug: string) => boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const EnquiryContext = React.createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = React.useMemo<EnquiryContextValue>(
    () => ({
      items,
      open,
      setOpen,
      has: (slug) => items.includes(slug),
      add: (slug) => setItems((prev) => (prev.includes(slug) ? prev : [...prev, slug])),
      remove: (slug) => setItems((prev) => prev.filter((s) => s !== slug)),
      toggle: (slug) =>
        setItems((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      clear: () => setItems([]),
    }),
    [items, open],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = React.useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}
