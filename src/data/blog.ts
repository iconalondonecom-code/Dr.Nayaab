export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  displayDate: string;
  excerpt: string;
  image: string;
  readMinutes: number;
  relatedProducts?: string[];
  body: Block[];
}

const A = "/Dr_Nayaab_Website_Assets/";
const IMG = {
  global: `${A}dr-nayaab-08-global-business-desktop.png`,
  portfolio: `${A}dr-nayaab-02-product-portfolio-desktop.png`,
  partnership: `${A}dr-nayaab-09-business-partnership-desktop.png`,
  quality: `${A}dr-nayaab-03-quality-precision-desktop.png`,
  suspensions: `${A}dr-nayaab-04-oral-suspensions-desktop.png`,
  syrups: `${A}dr-nayaab-05-syrups-desktop.png`,
  tablets: `${A}dr-nayaab-06-tablets-desktop.png`,
  paediatric: `${A}dr-nayaab-07-paediatric-nutrition-desktop.png`,
  ronak: `${A}dr-nayaab-10-ronak-group-backing-desktop.png`,
  cta: `${A}dr-nayaab-11-business-enquiry-cta-desktop.png`,
};

export const postCategories = [
  "Global Distribution",
  "Product Portfolio",
  "Business Partnerships",
  "Packaging & Presentation",
  "Market Entry",
  "Category Insights",
] as const;

export const posts: Post[] = [
  {
    slug: "pharmaceutical-distribution-international-markets",
    title: "Understanding Pharmaceutical Distribution for International Markets",
    category: "Global Distribution",
    date: "2026-02-18",
    displayDate: "18 February 2026",
    readMinutes: 6,
    image: IMG.global,
    excerpt:
      "How importers, distributors and wholesalers structure pharmaceutical supply relationships across borders — and what makes a portfolio easy to work with.",
    relatedProducts: [
      "amoxicillin-oral-suspension-bp-125mg",
      "paracetamol-oral-suspension-125mg",
    ],
    body: [
      {
        type: "p",
        text: "International pharmaceutical distribution rarely fails because of a single dramatic problem. It slows down through small, repeated frictions: unclear pack information, inconsistent artwork, slow answers to commercial questions, or a portfolio that is hard to map onto local demand.",
      },
      { type: "h2", text: "What an importer evaluates first" },
      {
        type: "p",
        text: "The opening questions from a professional buyer are practical rather than promotional. They want to understand the shape of the range before discussing anything commercial.",
      },
      {
        type: "ul",
        items: [
          "Which dosage forms are represented across the portfolio",
          "Which pack presentations exist for each product",
          "How consistent the packaging and artwork are across the range",
          "How quickly the supplier's business team responds to detail questions",
        ],
      },
      { type: "h2", text: "Continuity matters more than a single order" },
      {
        type: "p",
        text: "Distribution partnerships are long-term arrangements. Buyers look for a supplier whose communication is as stable in month eighteen as it was during the first enquiry. That stability is what turns a trial shipment into a standing relationship.",
      },
      { type: "h3", text: "Practical signals of a reliable supplier" },
      {
        type: "ul",
        items: [
          "A defined, published product portfolio rather than an ad-hoc list",
          "Accurate descriptions with no overstated regulatory or medical claims",
          "One clear route for enquiries instead of scattered contact points",
        ],
      },
      { type: "h2", text: "How Dr. Nayaab approaches it" },
      {
        type: "p",
        text: "Our approach begins with clarity: a defined portfolio of oral suspensions, syrups, tablets and nutritional care presentations, professional packaging, and a direct line to our business team for importers, distributors, wholesalers and institutional buyers.",
      },
    ],
  },
  {
    slug: "what-b2b-buyers-look-for-in-a-pharmaceutical-portfolio",
    title: "What B2B Buyers Look for in a Pharmaceutical Product Portfolio",
    category: "Product Portfolio",
    date: "2026-02-04",
    displayDate: "4 February 2026",
    readMinutes: 5,
    image: IMG.portfolio,
    excerpt:
      "Range coherence, packaging quality and commercial clarity matter more to professional buyers than the sheer number of items on a list.",
    relatedProducts: ["diclofenac-sodium-tablets-50mg", "multivitamin-syrup"],
    body: [
      {
        type: "p",
        text: "A long product list is not the same as a strong portfolio. Professional buyers assess coherence: whether dosage forms, pack presentations and category coverage fit together in a way that can be sold and stocked sensibly in their market.",
      },
      { type: "h2", text: "Coherence over volume" },
      {
        type: "p",
        text: "A focused range across a few well-populated categories is usually easier to introduce than a scattered list of unrelated items. It simplifies ordering, warehousing and the sales story a distributor has to tell.",
      },
      { type: "h2", text: "Packaging is a commercial asset" },
      {
        type: "p",
        text: "Cartons, labels and blister presentations communicate care and consistency long before any commercial discussion begins, and they influence how a range is received at pharmacy and wholesale level.",
      },
      { type: "h2", text: "Clear commercial process" },
      {
        type: "ul",
        items: [
          "A simple way to shortlist the relevant products",
          "One combined enquiry instead of dozens of separate messages",
          "A considered, specific response from a real business team",
        ],
      },
      {
        type: "p",
        text: "That is why this website is built around an enquiry list rather than a storefront: shortlist what is relevant to your market and send one business enquiry.",
      },
    ],
  },
  {
    slug: "building-reliable-healthcare-partnerships-global-markets",
    title: "Building Reliable Healthcare Partnerships Across Global Markets",
    category: "Business Partnerships",
    date: "2026-01-21",
    displayDate: "21 January 2026",
    readMinutes: 5,
    image: IMG.partnership,
    excerpt:
      "Reliability in healthcare business is built through consistent communication, realistic commitments and a shared long-term view.",
    body: [
      {
        type: "p",
        text: "Healthcare partnerships work best when both sides are explicit about what they can and cannot commit to. Overstated claims create problems later; measured, accurate communication builds durable relationships.",
      },
      { type: "h2", text: "What partners evaluate over time" },
      {
        type: "ul",
        items: [
          "Consistency of product presentation across repeat supply",
          "Responsiveness of the commercial team",
          "The stability of the business standing behind the brand",
        ],
      },
      { type: "h2", text: "The value of a parent group" },
      {
        type: "p",
        text: "Dr. Nayaab is a brand of Ronak Group, and that association is a core part of how we approach international business relationships — professionally, transparently and with a long-term perspective.",
      },
      { type: "h2", text: "Starting the conversation" },
      {
        type: "p",
        text: "If you are exploring distribution, import, wholesale or institutional supply opportunities, our team welcomes a direct conversation about your market and requirements.",
      },
    ],
  },
  {
    slug: "oral-suspensions-in-a-b2b-pharmaceutical-portfolio",
    title: "Oral Suspensions in a B2B Pharmaceutical Portfolio",
    category: "Category Insights",
    date: "2026-01-12",
    displayDate: "12 January 2026",
    readMinutes: 4,
    image: IMG.suspensions,
    excerpt:
      "Why reconstitutable and ready-to-use oral suspensions remain a core category for distributors serving paediatric and general practice demand.",
    relatedProducts: [
      "amoxicillin-oral-suspension-bp-125mg",
      "metronidazole-oral-suspension-bp-125mg-5ml",
    ],
    body: [
      {
        type: "p",
        text: "Oral suspensions occupy a practical position in most distribution portfolios. They serve patients who cannot easily take solid dosage forms, and they move steadily through pharmacy channels.",
      },
      { type: "h2", text: "What distributors ask about" },
      {
        type: "ul",
        items: [
          "Strength and volume presentation of each pack",
          "Whether the presentation is reconstitutable or ready to use",
          "Carton and label quality for retail shelves",
        ],
      },
      { type: "h2", text: "Presentation consistency" },
      {
        type: "p",
        text: "Where several strengths of the same product exist, consistent artwork across the strengths reduces confusion at the pharmacy counter and simplifies training for a distributor's own sales team.",
      },
    ],
  },
  {
    slug: "syrup-formulations-distribution-considerations",
    title: "Syrup Formulations: Practical Distribution Considerations",
    category: "Category Insights",
    date: "2025-12-29",
    displayDate: "29 December 2025",
    readMinutes: 4,
    image: IMG.syrups,
    excerpt:
      "Bottle presentation, carton strength and clear labelling shape how syrup ranges perform in wholesale and retail channels.",
    relatedProducts: ["carbocisteine-2-syrup", "carbocisteine-5-syrup"],
    body: [
      {
        type: "p",
        text: "Syrups travel further and are handled more often than many buyers expect. Presentation decisions therefore have a direct commercial effect.",
      },
      { type: "h2", text: "Handling and shelf presence" },
      {
        type: "ul",
        items: [
          "Carton stability in transit and on the shelf",
          "Legibility of strength and volume on the label",
          "Distinct visual separation between strengths of the same molecule",
        ],
      },
      { type: "h2", text: "Range structure" },
      {
        type: "p",
        text: "Offering more than one strength of a familiar formulation lets a distributor address different prescribing habits without adding an unrelated product to their range.",
      },
    ],
  },
  {
    slug: "tablet-packaging-blister-carton-presentation",
    title: "Tablet Packaging: Blister and Carton Presentation for Export Markets",
    category: "Packaging & Presentation",
    date: "2025-12-16",
    displayDate: "16 December 2025",
    readMinutes: 5,
    image: IMG.tablets,
    excerpt:
      "How inner and outer pack presentations influence buyer confidence, pharmacy handling and long-term brand recognition.",
    relatedProducts: [
      "diclofenac-sodium-tablets-50mg",
      "cyproheptadine-with-vitamins-minerals-tablets",
    ],
    body: [
      {
        type: "p",
        text: "For solid oral dosage products, the pack is often the first thing a prospective partner examines in detail. Inner and outer presentations tell a buyer how carefully a supplier works.",
      },
      { type: "h2", text: "Inner and outer packs" },
      {
        type: "p",
        text: "A blister presentation supported by a well-constructed outer carton is easier to stock, count and display. It also protects brand recognition when products are repacked into trade cases.",
      },
      { type: "h2", text: "Variants without confusion" },
      {
        type: "ul",
        items: [
          "Keep the product identity constant across colour variants",
          "Differentiate presentations clearly without redesigning the range",
          "Group variants as one product so buyers see options, not duplicates",
        ],
      },
    ],
  },
  {
    slug: "paediatric-and-nutritional-care-range-planning",
    title: "Planning a Paediatric and Nutritional Care Range",
    category: "Category Insights",
    date: "2025-12-02",
    displayDate: "2 December 2025",
    readMinutes: 4,
    image: IMG.paediatric,
    excerpt:
      "Vitamin, mineral and appetite-support presentations behave differently in trade to prescription-led lines. Here is what buyers plan around.",
    relatedProducts: [
      "cyproheptadine-with-vitamins-minerals-syrup",
      "vitamin-b-complex-tablets",
    ],
    body: [
      {
        type: "p",
        text: "Nutritional support lines usually sell on familiarity and presentation rather than prescription volume, which changes how a distributor introduces them.",
      },
      { type: "h2", text: "Shelf-led demand" },
      {
        type: "ul",
        items: [
          "Repeat purchase patterns rather than single-course demand",
          "Higher sensitivity to pack appearance and family-friendly design",
          "Value in offering both syrup and tablet presentations",
        ],
      },
      { type: "h2", text: "Matching formats" },
      {
        type: "p",
        text: "Where a formulation exists in both syrup and tablet form, a distributor can serve paediatric and adult demand from one product story rather than two.",
      },
    ],
  },
  {
    slug: "choosing-a-pharmaceutical-supplier-checklist",
    title: "A Practical Checklist for Choosing a Pharmaceutical Supplier",
    category: "Business Partnerships",
    date: "2025-11-18",
    displayDate: "18 November 2025",
    readMinutes: 5,
    image: IMG.quality,
    excerpt:
      "Ten questions professional buyers should be able to answer before committing to a new supply relationship.",
    body: [
      {
        type: "p",
        text: "Supplier selection is easier when the evaluation is structured. These questions separate a promising conversation from a workable partnership.",
      },
      { type: "h2", text: "Portfolio questions" },
      {
        type: "ul",
        items: [
          "Is the portfolio published and consistent?",
          "Are strengths, dosage forms and pack presentations stated clearly?",
          "Do product images represent actual packs?",
        ],
      },
      { type: "h2", text: "Commercial questions" },
      {
        type: "ul",
        items: [
          "Who is the single point of contact for business enquiries?",
          "How long does a first substantive reply take?",
          "Is there a parent company or group behind the brand?",
        ],
      },
      { type: "h2", text: "Relationship questions" },
      {
        type: "ul",
        items: [
          "Are commitments realistic and specific?",
          "Is documentation handled professionally?",
          "Does the supplier avoid unverifiable claims?",
        ],
      },
    ],
  },
  {
    slug: "entering-a-new-pharmaceutical-market",
    title: "Entering a New Pharmaceutical Market: A Distributor's View",
    category: "Market Entry",
    date: "2025-11-04",
    displayDate: "4 November 2025",
    readMinutes: 6,
    image: IMG.global,
    excerpt:
      "Market entry is a sequencing problem. The order in which a distributor introduces a range often decides whether it takes hold.",
    body: [
      {
        type: "p",
        text: "New ranges seldom succeed by being launched all at once. Experienced distributors sequence introductions so early wins fund the wider rollout.",
      },
      { type: "h2", text: "Start with familiar molecules" },
      {
        type: "p",
        text: "Products that local prescribers already recognise need less explanation, which shortens the path to repeat orders.",
      },
      { type: "h2", text: "Add depth before breadth" },
      {
        type: "ul",
        items: [
          "Establish two or three categories properly",
          "Introduce additional strengths before unrelated products",
          "Use consistent artwork so the range reads as one brand",
        ],
      },
      { type: "h2", text: "Keep the supplier close" },
      {
        type: "p",
        text: "Regular, honest communication with the supplier during the first year prevents small supply issues from becoming commercial setbacks.",
      },
    ],
  },
  {
    slug: "why-b2b-pharma-websites-should-not-be-shops",
    title: "Why a B2B Pharmaceutical Website Should Not Be a Shop",
    category: "Product Portfolio",
    date: "2025-10-21",
    displayDate: "21 October 2025",
    readMinutes: 4,
    image: IMG.cta,
    excerpt:
      "Prices, carts and checkout flows belong to consumer retail. Professional pharmaceutical buyers need something different.",
    body: [
      {
        type: "p",
        text: "A business buyer is not completing a transaction on a website. They are assembling a shortlist and starting a conversation.",
      },
      { type: "h2", text: "What replaces the cart" },
      {
        type: "ul",
        items: [
          "An enquiry list that holds the products under consideration",
          "One combined business enquiry covering the whole shortlist",
          "Direct WhatsApp or email contact for urgent questions",
        ],
      },
      { type: "h2", text: "Why it works better" },
      {
        type: "p",
        text: "Commercial terms in pharmaceutical trade depend on market, volume and registration status. A published price would be misleading; a conversation is accurate.",
      },
    ],
  },
  {
    slug: "product-artwork-consistency-across-a-range",
    title: "Product Artwork Consistency Across a Pharmaceutical Range",
    category: "Packaging & Presentation",
    date: "2025-10-07",
    displayDate: "7 October 2025",
    readMinutes: 4,
    image: IMG.portfolio,
    excerpt:
      "Consistent artwork is not a cosmetic detail. It affects recognition, trade handling and how quickly a range is trusted.",
    body: [
      {
        type: "p",
        text: "When every pack in a range shares a visual system, the range becomes recognisable as a brand rather than a collection of items.",
      },
      { type: "h2", text: "Elements worth standardising" },
      {
        type: "ul",
        items: [
          "Placement of brand mark and product name",
          "Typography for strength and volume",
          "Colour logic used to separate variants",
        ],
      },
      { type: "h2", text: "The trade effect" },
      {
        type: "p",
        text: "Warehouse staff, pharmacists and sales representatives all handle packs faster when the visual logic is predictable.",
      },
    ],
  },
  {
    slug: "working-with-institutional-buyers",
    title: "Working With Institutional Buyers in Healthcare",
    category: "Business Partnerships",
    date: "2025-09-23",
    displayDate: "23 September 2025",
    readMinutes: 5,
    image: IMG.partnership,
    excerpt:
      "Institutional procurement runs on documentation, predictability and clear communication rather than sales pressure.",
    body: [
      {
        type: "p",
        text: "Institutional buyers work inside procedures. A supplier who respects those procedures is far easier to approve than one who tries to shortcut them.",
      },
      { type: "h2", text: "What institutions expect" },
      {
        type: "ul",
        items: [
          "Accurate, unembellished product information",
          "Consistent pack presentation between submissions and supply",
          "A named contact who responds within a predictable window",
        ],
      },
      { type: "h2", text: "Building the relationship" },
      {
        type: "p",
        text: "Approval cycles are long. Suppliers who stay responsive between cycles are the ones considered first when requirements change.",
      },
    ],
  },
  {
    slug: "how-to-structure-a-pharmaceutical-enquiry",
    title: "How to Structure a Pharmaceutical Business Enquiry",
    category: "Global Distribution",
    date: "2025-09-09",
    displayDate: "9 September 2025",
    readMinutes: 4,
    image: IMG.cta,
    excerpt:
      "A well-structured first enquiry gets a specific answer. Here is what to include so the reply is useful straight away.",
    body: [
      {
        type: "p",
        text: "The quality of a supplier's first reply usually mirrors the quality of the enquiry. A few details transform a generic response into a commercial conversation.",
      },
      { type: "h2", text: "Include these details" },
      {
        type: "ul",
        items: [
          "Your business type: importer, distributor, wholesaler, institution or healthcare business",
          "The market or markets you serve",
          "The products or categories you are evaluating",
          "Approximate volume expectations, where known",
          "Your preferred contact channel",
        ],
      },
      { type: "h2", text: "Use the enquiry list" },
      {
        type: "p",
        text: "Adding products to the enquiry list before writing means your shortlist arrives with the message, so nothing needs to be clarified in a second round.",
      },
    ],
  },
  {
    slug: "quality-presentation-and-buyer-confidence",
    title: "Quality, Presentation and Buyer Confidence",
    category: "Packaging & Presentation",
    date: "2025-08-26",
    displayDate: "26 August 2025",
    readMinutes: 4,
    image: IMG.quality,
    excerpt:
      "Confidence is built from many small consistencies rather than a single claim on a website.",
    body: [
      {
        type: "p",
        text: "Buyers form a view of a supplier long before any documentation is exchanged. Presentation is the earliest evidence they have.",
      },
      { type: "h2", text: "Consistency signals care" },
      {
        type: "ul",
        items: [
          "Product images that match the actual packs",
          "Descriptions limited to what is verifiable",
          "No invented approvals, ratings or endorsements",
        ],
      },
      { type: "h2", text: "Accuracy over marketing" },
      {
        type: "p",
        text: "Restraint reads as professionalism in pharmaceutical trade. Claims that cannot be evidenced are a commercial liability, not an advantage.",
      },
    ],
  },
  {
    slug: "the-role-of-a-parent-group-in-global-trade",
    title: "The Role of a Parent Group in Global Healthcare Trade",
    category: "Business Partnerships",
    date: "2025-08-12",
    displayDate: "12 August 2025",
    readMinutes: 4,
    image: IMG.ronak,
    excerpt:
      "A brand supported by an established group offers partners continuity, structure and a clearer commercial footing.",
    body: [
      {
        type: "p",
        text: "International buyers assess the business behind the brand as carefully as the products themselves.",
      },
      { type: "h2", text: "What group backing provides" },
      {
        type: "ul",
        items: [
          "Established commercial and administrative structure",
          "Continuity of contact beyond a single representative",
          "A verifiable corporate identity partners can reference",
        ],
      },
      { type: "h2", text: "Dr. Nayaab and Ronak Group" },
      {
        type: "p",
        text: "Dr. Nayaab operates as the pharmaceutical brand of Ronak Group, based in Vadodara, Gujarat, India, and business enquiries are handled directly by the group's team.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const latestPosts = (n: number) => posts.slice(0, n);

export const relatedPosts = (post: Post, n = 3) =>
  posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 0) - (b.category === post.category ? -1 : 0))
    .slice(0, n);
