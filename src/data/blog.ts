export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  displayDate: string;
  excerpt: string;
  image: string;
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "pharmaceutical-distribution-international-markets",
    title: "Understanding Pharmaceutical Distribution for International Markets",
    category: "Global Distribution",
    date: "2026-02-18",
    displayDate: "18 February 2026",
    excerpt:
      "How importers, distributors and wholesalers structure pharmaceutical supply relationships across borders — and what makes a portfolio easy to work with.",
    image: "/Dr_Nayaab_Website_Assets/dr-nayaab-08-global-business-desktop.png",
    body: [
      "International pharmaceutical distribution rarely fails because of a single dramatic problem. It usually slows down because of small, repeated frictions: unclear pack information, inconsistent artwork files, slow responses to commercial questions, or a portfolio that is difficult to map onto local demand.",
      "For an importer, the first question is practical. What is in the portfolio, in what dosage forms, and in what pack presentations? A supplier who can answer that clearly, with consistent product documentation and professional packaging, removes a large amount of early uncertainty from the conversation.",
      "The second question is about continuity. Distribution partnerships are long-term arrangements, and buyers look for a supplier whose communication is stable over months and years rather than only during the first enquiry.",
      "At Dr. Nayaab, our approach to international business begins with clarity: a defined product portfolio, professional presentation, and a direct line to our business team for enquiries from importers, distributors, wholesalers and institutional buyers.",
    ],
  },
  {
    slug: "what-b2b-buyers-look-for-in-a-pharmaceutical-portfolio",
    title: "What B2B Buyers Look for in a Pharmaceutical Product Portfolio",
    category: "Product Portfolio",
    date: "2026-01-27",
    displayDate: "27 January 2026",
    excerpt:
      "Range coherence, packaging quality and commercial clarity matter more to professional buyers than the sheer number of items on a list.",
    image: "/Dr_Nayaab_Website_Assets/dr-nayaab-02-product-portfolio-desktop.png",
    body: [
      "A long product list is not the same as a strong portfolio. Professional buyers assess coherence: whether dosage forms, pack presentations and category coverage fit together in a way that can be sold and stocked sensibly in their market.",
      "Packaging is a commercial asset. Cartons, labels and blister presentations communicate care and consistency long before any commercial discussion begins, and they influence how a range is received at pharmacy and wholesale level.",
      "Buyers also value straightforward commercial process. A clear way to shortlist products, raise an enquiry and receive a considered response is often the difference between a portfolio that gets evaluated and one that gets set aside.",
      "That is why the Dr. Nayaab website is built around an enquiry list rather than a storefront: shortlist the products relevant to your market, send one combined business enquiry, and speak with our team directly.",
    ],
  },
  {
    slug: "building-reliable-healthcare-partnerships-global-markets",
    title: "Building Reliable Healthcare Partnerships Across Global Markets",
    category: "Business Partnerships",
    date: "2025-12-15",
    displayDate: "15 December 2025",
    excerpt:
      "Reliability in healthcare business is built through consistent communication, realistic commitments and a shared long-term view.",
    image: "/Dr_Nayaab_Website_Assets/dr-nayaab-09-business-partnership-desktop.png",
    body: [
      "Healthcare partnerships work best when both sides are explicit about what they can and cannot commit to. Overstated claims create problems later; measured, accurate communication builds durable relationships.",
      "Institutional buyers and distributors typically evaluate three things over time: consistency of product presentation, responsiveness of the commercial team, and the stability of the business standing behind the brand.",
      "Dr. Nayaab is a brand of Ronak Group, and that association is a core part of how we approach international business relationships — professionally, transparently and with a long-term perspective.",
      "If you are exploring distribution, import, wholesale or institutional supply opportunities, our team welcomes a direct conversation.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
