export type CategorySlug =
  | "oral-suspensions"
  | "syrups"
  | "tablets"
  | "paediatric-nutritional-care"
  | "other";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  square?: string;
}

export interface Product {
  slug: string;
  name: string;
  strength?: string;
  form: string;
  packSize?: string;
  category: CategorySlug;
  variants?: string;
  images: string[];
}

const P = (file: string) => `/products/${file}`;

export const categories: Category[] = [
  {
    slug: "oral-suspensions",
    name: "Oral Suspensions",
    description:
      "Reconstitutable and ready-to-use oral suspension presentations across the Dr. Nayaab portfolio.",
    image: "/Dr_Nayaab_Website_Assets/dr-nayaab-04-oral-suspensions-desktop.png",
    square: "/Dr_Nayaab_Website_Assets/dr-nayaab-04-oral-suspensions-square.png",
  },
  {
    slug: "syrups",
    name: "Syrups",
    description: "Liquid oral syrup formulations presented in professional retail-ready packaging.",
    image: "/Dr_Nayaab_Website_Assets/dr-nayaab-05-syrups-desktop.png",
    square: "/Dr_Nayaab_Website_Assets/dr-nayaab-05-syrups-square.png",
  },
  {
    slug: "tablets",
    name: "Tablets",
    description: "Blister and carton presentations of solid oral dosage products.",
    image: "/Dr_Nayaab_Website_Assets/dr-nayaab-06-tablets-desktop.png",
  },
  {
    slug: "paediatric-nutritional-care",
    name: "Paediatric & Nutritional Care",
    description: "Vitamin, mineral and nutritional support presentations for everyday care ranges.",
    image: "/Dr_Nayaab_Website_Assets/dr-nayaab-07-paediatric-nutrition-desktop.png",
    square: "/Dr_Nayaab_Website_Assets/dr-nayaab-07-paediatric-nutrition-square.png",
  },
  {
    slug: "other",
    name: "Other Pharmaceutical Products",
    description: "Additional presentations from the wider Dr. Nayaab portfolio.",
    image: "/Dr_Nayaab_Website_Assets/dr-nayaab-02-product-portfolio-desktop.png",
  },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? "";

export const products: Product[] = [
  {
    slug: "aluminium-magnesium-simethicone-oral-suspension",
    name: "Aluminium, Magnesium & Simethicone Oral Suspension",
    form: "Oral Suspension",
    category: "oral-suspensions",
    images: [P("ALUMINIUM, MAGNESIUM & SIMETHICONE ORAL SUSPENSION.png")],
  },
  {
    slug: "amoxicillin-oral-suspension-bp-125mg",
    name: "Amoxicillin Oral Suspension BP",
    strength: "125 mg",
    form: "Oral Suspension",
    category: "oral-suspensions",
    images: [P("AMOXICILLIN ORAL SUSPENSION BP 125mg.png")],
  },
  {
    slug: "amoxicillin-oral-suspension-bp-250mg",
    name: "Amoxicillin Oral Suspension BP",
    strength: "250 mg",
    form: "Oral Suspension",
    category: "oral-suspensions",
    images: [P("AMOXICILLIN ORAL SUSPENSION BP 250mg.png")],
  },
  {
    slug: "erythromycin-estolate-suspension-125mg",
    name: "Erythromycin Estolate Suspension",
    strength: "125 mg",
    form: "Oral Suspension",
    category: "oral-suspensions",
    images: [P("ERYTHROMYCIN ESTOLATE SUSPENSION 125 mg.png")],
  },
  {
    slug: "metronidazole-oral-suspension-bp-125mg-5ml",
    name: "Metronidazole Oral Suspension BP",
    strength: "125 mg / 5 ml",
    form: "Oral Suspension",
    category: "oral-suspensions",
    images: [P("METRONIDAZOLE ORAL SUSPENSION BP 125mg 5ml.png")],
  },
  {
    slug: "paracetamol-oral-suspension-125mg",
    name: "Paracetamol Oral Suspension",
    strength: "125 mg",
    form: "Oral Suspension",
    category: "oral-suspensions",
    images: [P("PARACETAMOL ORAL SUSPENSION 125mg.png")],
  },
  {
    slug: "carbocisteine-2-syrup",
    name: "Carbocisteine Syrup",
    strength: "2%",
    form: "Syrup",
    category: "syrups",
    images: [P("CARBOCISTEINE 2% SYRUP.png")],
  },
  {
    slug: "carbocisteine-5-syrup",
    name: "Carbocisteine Syrup",
    strength: "5%",
    form: "Syrup",
    category: "syrups",
    images: [P("CARBOCISTEINE SYRUP 5 %.png")],
  },
  {
    slug: "paracetamol-caffeine-phenylephrine-chlorpheniramine-syrup",
    name: "Paracetamol, Caffeine, Phenylephrine HCl & Chlorpheniramine Maleate Syrup",
    form: "Syrup",
    category: "syrups",
    images: [
      P("PARACETAMOL, CAFFEINE, PHENYLEPHRINE HCL & CHLORPHENIRAMINE MALEATE SYRUP.png"),
    ],
  },
  {
    slug: "cyproheptadine-with-vitamins-minerals-syrup",
    name: "Cyproheptadine with Vitamins & Minerals Syrup",
    form: "Syrup",
    packSize: "100 ml",
    category: "paediatric-nutritional-care",
    variants: "Available in multiple pack presentations",
    images: [
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS SYRUP.png"),
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS SYRUP 100ml.png"),
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS SYRUP 2.png"),
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS SYRUP - LION.png"),
    ],
  },
  {
    slug: "multivitamin-syrup",
    name: "Multivitamin Syrup",
    form: "Syrup",
    category: "paediatric-nutritional-care",
    images: [P("MULTIVITAMIN SYRUP.png")],
  },
  {
    slug: "vitamin-b-complex-tablets",
    name: "Vitamin B Complex Tablets",
    form: "Tablet",
    category: "paediatric-nutritional-care",
    variants: "Available in multiple pack presentations",
    images: [
      P("VITAMIN. B COMPLEX TABLETS - RED.png"),
      P("VITAMIN. B COMPLEX TABLETS - PINK.png"),
      P("VITAMIN. B COMPLEX TABLETS - YELLOW.png"),
    ],
  },
  {
    slug: "cyproheptadine-with-vitamins-minerals-tablets",
    name: "Cyproheptadine with Vitamins & Minerals Tablets",
    form: "Tablet",
    category: "tablets",
    variants: "Inner and outer pack presentations available",
    images: [
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS TABLETS.png"),
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS TABLETS OUTER.png"),
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS TABLETS INNER.png"),
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS TABLETS 2.png"),
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS TABLETS - LION.png"),
      P("CYPROHEPTADINE WITH VITAMINS & MINERALS TABLETS - LION F 2.png"),
    ],
  },
  {
    slug: "diclofenac-sodium-tablets-50mg",
    name: "Diclofenac Sodium Tablets",
    strength: "50 mg",
    form: "Tablet",
    category: "tablets",
    variants: "Available in multiple pack presentations",
    images: [
      P("DICLOFENAC SODIUM TABLETS 50mg - RED.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - RED OUTER.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - ORANGE.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - ORANGE OUTER.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - PINK.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - PINK OUTER.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - YELLOW.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - YELLOW OUTER.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - WHITE.png"),
      P("DICLOFENAC SODIUM TABLETS 50mg - WHITE OUTER.png"),
    ],
  },
];

export const rangePackshot = P("PACKSHOT.png");

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const productsByCategory = (slug: CategorySlug) =>
  products.filter((p) => p.category === slug);

export const imgSrc = (path: string) => encodeURI(path);
