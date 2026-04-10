export type PortfolioCategoryKey =
  | "digital-marketing"
  | "creative-printing-services"
  | "interior-design-and-construction"
  | "networking-it-solutions";

export type PortfolioCategoryOption = {
  key: PortfolioCategoryKey;
  title: string;
  description: string;
  image: string;
};

export const PORTFOLIO_CATEGORIES: readonly PortfolioCategoryOption[] = [
  {
    key: "digital-marketing",
    title: "Digital Marketing",
    description: "Campaigns, SEO, content, growth strategy.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "creative-printing-services",
    title: "Creative Printing Services",
    description: "Brand collateral, signage, packaging.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "interior-design-and-construction",
    title: "Interior Design And Construction",
    description: "Space design, renovation, execution.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "networking-it-solutions",
    title: "Networking & IT Solutions",
    description: "Infrastructure, security, support.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
] as const;