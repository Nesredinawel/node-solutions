export const projectCategories = [
  "All",
  "Digital Marketing",
  "Creative Printing Services",
  "Interior Design And Construction",
  "Networking & IT Solutions",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectMediaItem =
  | {
      type: "image";
      src: string;
      thumb?: string;
      alt?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string; // thumbnail image for video
      thumb?: string;  // optional small thumb (if different)
      title?: string;
    };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  url: string;
  description: string;
  longDescription: string;
  category: Exclude<ProjectCategory, "All">;
  image: string;          // cover image for cards/grid
  images?: string[];      // optional legacy support
  media?: ProjectMediaItem[]; // ✅ new gallery (images + videos)
};

const DEMO_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const projectsData: Project[] = [
  // -------------------------
  // Digital Marketing
  // -------------------------
  {
    slug: "chic-boutique",
    title: "Chic Boutique",
    subtitle: "E-Commerce Platform for Fashion Hub",
    url: "https://www.chicboutique.com",
    description:
      "We developed a sleek platform with a premium shopping experience, streamlined product browsing, and conversion-focused UX tailored for modern fashion retail.",
    longDescription:
      "Chic Boutique approached us to create a premium e-commerce experience that would reflect the elegance of their brand while improving usability and conversion. We designed a storefront that balanced strong visual storytelling with intuitive navigation, product discovery, secure payment handling, and mobile responsiveness. The result was a refined digital shopping experience that improved customer confidence, increased browsing time, and supported stronger online sales performance.",
    category: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1800&auto=format&fit=crop",
      },
      {
        type: "video",
        src: DEMO_VIDEO,
        poster:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=900&auto=format&fit=crop",
        title: "Product walkthrough",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1800&auto=format&fit=crop",
      },
    ],
  },

  {
    slug: "hungry-bites",
    title: "HungryBites",
    subtitle: "Mobile App for Food Delivery Service",
    url: "https://www.hungrybites.com",
    description:
      "HungryBites required a bold and intuitive app to simplify ordering, tracking, and customer retention. The result was a fast and engaging food delivery experience.",
    longDescription:
      "For HungryBites, we focused on creating a mobile-first ordering experience that emphasized speed, clarity, and ease of use. The platform was structured to reduce friction during the ordering flow while also supporting customer retention through a clean interface and operational efficiency.",
    category: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1400&auto=format&fit=crop",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1800&auto=format&fit=crop",
      },
      {
        type: "video",
        src: DEMO_VIDEO,
        poster:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop",
        title: "App demo",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop",
      },
    ],
  },

  // -------------------------
  // Creative Printing Services
  // -------------------------
  {
    slug: "educonnect",
    title: "EduConnect",
    subtitle: "Educational Platform for Online Learning",
    url: "https://www.educonnect.com",
    description:
      "EduConnect brought together course delivery, student engagement, and content management into one modern learning experience.",
    longDescription:
      "EduConnect was built to support digital learning through a structured yet engaging educational environment. We designed an experience that made it easier for students to access content, interact with lessons, and remain engaged, while giving administrators stronger control over educational delivery and platform organization.",
    category: "Creative Printing Services",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1800&auto=format&fit=crop",
      },
      {
        type: "video",
        src: DEMO_VIDEO,
        poster:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop",
        title: "Platform overview",
      },
    ],
  },

  // -------------------------
  // Interior Design And Construction
  // -------------------------
  {
    slug: "dream-homes-realty",
    title: "Dream Homes Realty",
    subtitle: "Web Portal for Real Estate Listings",
    url: "https://www.dreamhomesrealty.com",
    description:
      "We built a property listing portal with advanced search, visual-first presentation, and lead generation tools tailored for real estate teams.",
    longDescription:
      "Dream Homes Realty needed a more effective digital platform for showcasing properties, generating inquiries, and organizing customer interest. We built a listing experience that prioritized image-rich presentation, smart search filtering, and accessibility across devices.",
    category: "Interior Design And Construction",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1800&auto=format&fit=crop",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop",
      },
      {
        type: "video",
        src: DEMO_VIDEO,
        poster:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop",
        title: "Showcase reel",
      },
    ],
  },

  // -------------------------
  // Networking & IT Solutions
  // -------------------------
  {
    slug: "connectcrm",
    title: "ConnectCRM",
    subtitle: "Web Application for Customer Relationship Management",
    url: "https://www.connectcrm.com",
    description:
      "ConnectCRM was created to improve customer lifecycle visibility, sales performance, and data access through a more structured dashboard experience.",
    longDescription:
      "ConnectCRM was designed as a robust management platform that supports customer visibility, sales performance, and operational decision-making. We focused on a clearer dashboard architecture, more meaningful data access, and a structured experience.",
    category: "Networking & IT Solutions",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800&auto=format&fit=crop",
      },
      {
        type: "video",
        src: DEMO_VIDEO,
        poster:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=900&auto=format&fit=crop",
        title: "Dashboard demo",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1800&auto=format&fit=crop",
      },
    ],
  },
];