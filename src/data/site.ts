export const site = {
  brand: "Dr. Nayaab",
  tagline: "Committed to Care",
  parent: "Ronak Group",
  parentUrl: "https://ronak.global",
  email: "contact@ronak.global",
  phone: "+91 99985 69923",
  whatsapp: "https://wa.me/919998569923",
  whatsappMessage:
    "Hello Dr. Nayaab team, I would like to enquire about your pharmaceutical products and business partnership opportunities.",
  address: {
    lines: [
      "Ronak Group Building",
      "Gotri Road",
      "Next to Nilgiri Terrace",
      "Gadapura, Hari Nagar",
      "Vadodara, Gujarat 390021",
      "India",
    ],
  },
} as const;

export const whatsappLink = `${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const businessTypes = [
  "Importer",
  "Distributor",
  "Wholesaler",
  "Institutional Buyer",
  "Retail / Pharmacy Business",
  "Healthcare Business",
  "Other",
] as const;

export const assets = {
  logo: "/Dr_Nayaab_Website_Assets/dr-nayaab-logo.png",
  ronakLogo: "/Dr_Nayaab_Website_Assets/ronak-group-logo.png",
  heroDesktop: "/Dr_Nayaab_Website_Assets/dr-nayaab-01-homepage-hero-desktop.png",
  heroMobile: "/Dr_Nayaab_Website_Assets/dr-nayaab-01-homepage-hero-mobile.png",
  portfolioDesktop: "/Dr_Nayaab_Website_Assets/dr-nayaab-02-product-portfolio-desktop.png",
  portfolioMobile: "/Dr_Nayaab_Website_Assets/dr-nayaab-02-product-portfolio-mobile.png",
  qualityDesktop: "/Dr_Nayaab_Website_Assets/dr-nayaab-03-quality-precision-desktop.png",
  qualityMobile: "/Dr_Nayaab_Website_Assets/dr-nayaab-03-quality-precision-mobile.png",
  globalDesktop: "/Dr_Nayaab_Website_Assets/dr-nayaab-08-global-business-desktop.png",
  globalMobile: "/Dr_Nayaab_Website_Assets/dr-nayaab-08-global-business-mobile.png",
  partnership: "/Dr_Nayaab_Website_Assets/dr-nayaab-09-business-partnership-desktop.png",
  ronakBacking: "/Dr_Nayaab_Website_Assets/dr-nayaab-10-ronak-group-backing-desktop.png",
  enquiryCta: "/Dr_Nayaab_Website_Assets/dr-nayaab-11-business-enquiry-cta-desktop.png",
  footerBg: "/Dr_Nayaab_Website_Assets/dr-nayaab-12-footer-background-desktop.png",
} as const;
