/**
 * MSM Painting Studio — single source of truth for site content.
 * Used by the marketing pages, the FAQ, and the chatbot knowledge base.
 * Everything here is placeholder copy the client can later override from /admin.
 */

export const site = {
  name: "MSM Painting Studio",
  tagline: "Colour that makes a house feel like home",
  url: "https://msmpaintingstudio.vercel.app",
  email: "mesaykar@gmail.com",
  phone: "0400 000 000", // TODO: client's real mobile
  phoneHref: "tel:+61400000000",
  abn: "00 000 000 000", // TODO: client's real ABN
  lastUpdated: "20 October 2026", // update when legal pages change
  address: {
    line1: "9 Hedgeley Drive",
    suburb: "Berwick",
    state: "VIC",
    postcode: "3806",
    country: "Australia",
    full: "9 Hedgeley Drive, Berwick VIC 3806",
  },
  hours: [
    { days: "Monday – Friday", time: "7:00 am – 6:00 pm" },
    { days: "Saturday", time: "8:00 am – 4:00 pm" },
    { days: "Sunday", time: "Enquiries welcome" },
  ],
  serviceAreas: [
    "Berwick",
    "Narre Warren",
    "Cranbourne",
    "Pakenham",
    "Beaconsfield",
    "Officer",
    "Casey",
    "Cardinia",
    "Mulgrave",
    "Clayton",
    "Greater Melbourne",
  ],
  social: {
    // TODO: real profiles — placeholders keep the links valid
    instagram: "https://instagram.com/msmpaintingstudio",
    facebook: "https://facebook.com/msmpaintingstudio",
    google: "https://share.google/xxxx", // replace with Business Profile link
  },
  stats: [
    { value: 1, suffix: " day", label: "Quote turnaround" },
    { value: 600, suffix: "+", label: "Rooms transformed" },
    { value: 100, suffix: "%", label: "Free quotes" },
    { value: 5, suffix: "★", label: "Care on every job" },
  ],
} as const;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  icon: string; // lucide icon name
  points: string[];
};

export const services: Service[] = [
  {
    slug: "interior",
    title: "Interior Painting",
    blurb:
      "Clean lines, smooth finishes and colours that lift every room — masked, prepped and protected so the only mess you see is the colour you chose.",
    icon: "Sofa",
    points: ["Walls, ceilings, trims & feature walls", "Low-odour, low-VOC paints"],
  },
  {
    slug: "exterior",
    title: "Exterior Painting",
    blurb:
      "Australian sun and rain are tough on paint. We prep, prime and finish with quality exterior coatings built to hold their colour.",
    icon: "Home",
    points: ["Weatherboard, render, eaves & fascias", "Pressure-wash prep"],
  },
  {
    slug: "commercial",
    title: "Shops & Warehouses",
    blurb:
      "Retail, offices, workshops and warehouses painted around your trading hours — nights and weekends available.",
    icon: "Building2",
    points: ["After-hours scheduling", "High-traffic coatings & line marking"],
  },
  {
    slug: "fence",
    title: "Fences & Gates",
    blurb:
      "Timber, metal and colorbond fences brought back to life — the quickest way to make a property look cared for.",
    icon: "Fence",
    points: ["Timber, colorbond & metal", "Gates, screens & pergola staining"],
  },
  {
    slug: "colour",
    title: "Colour Advice",
    blurb:
      "Bring us a couch, a tile or a photo — we'll help you build a palette that flows room to room, free with every quote.",
    icon: "Palette",
    points: ["Room-to-room palettes", "Sample pot testing"],
  },
  {
    slug: "repair",
    title: "Repairs & Prep",
    blurb:
      "Cracks, holes, flaking and mould — sorted before a drop of paint goes on. Preparation is where a paint job earns its years.",
    icon: "Hammer",
    points: ["Crack, hole & mould treatment", "Sanding, sealing & waterproofing"],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Say hello",
    text: "Send a booking or a quick quote with a photo or two. Tell us the space, the vibe, the deadline.",
  },
  {
    step: "02",
    title: "Walk & quote",
    text: "We look at the surface properly — light, condition, prep needed — then a clear, itemised free quote.",
  },
  {
    step: "03",
    title: "Prep like pros",
    text: "Masking, filling, sanding, priming. Furniture protected, floors covered, pets and kids considered.",
  },
  {
    step: "04",
    title: "Paint & wow",
    text: "Smooth, even coats with quality paint. We clean up completely and walk the job with you before we leave.",
  },
];

export const faqs = [
  {
    q: "How much does painting cost?",
    a: "It depends on size, surface condition and paint choice — that's why every quote is free and itemised. As a guide, a standard bedroom usually starts in the low hundreds, while full interiors and exteriors are quoted after a quick look. No hidden extras, ever.",
  },
  {
    q: "Do you give free quotes?",
    a: "Yes — every quote is free and no-obligation. Book online, send photos through the chat, or just call. Most quotes come back within one business day.",
  },
  {
    q: "What areas do you serve?",
    a: "Berwick is home base, and we cover all of Casey–Cardinia — Narre Warren, Cranbourne, Pakenham, Beaconsfield, Officer — plus greater Melbourne. Not sure if you're in range? Ask us.",
  },
  {
    q: "How long does a job take?",
    a: "A single room is often done in a day. Full interiors usually run 2–5 days depending on size and prep. Exteriors depend on weather. We'll give you a clear timeline before we start.",
  },
  {
    q: "Are you insured?",
    a: "Yes — MSM Painting Studio carries full public liability cover. Certificates can be provided on request before any work begins.",
  },
];

export const testimonials = [
  {
    name: "Sarah T.",
    area: "Berwick",
    quote:
      "MSM turned our tired living room into something we actually want to show people. Clean, on time, and the colour advice was spot on.",
    stars: 5,
  },
  {
    name: "Daniel & Priya",
    area: "Narre Warren",
    quote:
      "Full interior done while we were at work. Came home to sharp lines, no mess and a house that smells fresh. Couldn't recommend more.",
    stars: 5,
  },
  {
    name: "Grant M.",
    area: "Cranbourne",
    quote:
      "Quoted the same day, started the next week, fence and exterior look brand new. Honest pricing and genuine care.",
    stars: 5,
  },
];

/**
 * Chatbot knowledge base. Seeded into the database on first run and
 * editable from /admin. The bot answers ONLY from this material.
 */
export const seedKnowledge = [
  {
    category: "Services",
    question: "What services do you offer?",
    answer:
      "We paint interiors, exteriors, fences, sheds, shops and warehouses — walls, ceilings, trims, doors, render, weatherboard and more. We also do crack & hole repairs, mould treatment, and free colour advice.",
  },
  {
    category: "Services",
    question: "Do you do commercial or industrial work?",
    answer:
      "Yes — retail shops, offices, workshops and warehouses. We're happy to work after hours or on weekends so your trading isn't disrupted.",
  },
  {
    category: "Quotes & Pricing",
    question: "How much does it cost?",
    answer:
      "Every quote is free and itemised, because pricing depends on the space, surface condition and paint. Send us a couple of photos or book an inspection and you'll have a clear number — no hidden extras.",
  },
  {
    category: "Quotes & Pricing",
    question: "Do you charge for quotes?",
    answer:
      "Never. Quotes are 100% free with no obligation.",
  },
  {
    category: "Areas",
    question: "What areas do you serve?",
    answer:
      "Home base is Berwick VIC 3806, and we cover all of Casey–Cardinia: Narre Warren, Cranbourne, Pakenham, Beaconsfield, Officer, plus greater Melbourne.",
  },
  {
    category: "Process",
    question: "How long does a painting job take?",
    answer:
      "A single room is often finished in a day; a full interior is usually 2–5 days. Exteriors depend on weather. You'll always get a clear timeline with your quote.",
  },
  {
    category: "Process",
    question: "Do I need to be home during the work?",
    answer:
      "Only for the walkthrough quote. Most clients head to work and come home to a finished space — we can arrange keys or access if that's easier.",
  },
  {
    category: "Credentials",
    question: "Are you insured and experienced?",
    answer:
      "Yes. MSM Painting Studio carries full public liability insurance, and our painters are experienced across houses, rooms, buildings, fences and commercial spaces.",
  },
  {
    category: "Credentials",
    question: "How experienced are your painters?",
    answer:
      "Our painters have spent years painting houses, rooms, buildings, shops, warehouses and fences across Australia. It's the craft behind every job MSM takes on.",
  },
  {
    category: "Colour",
    question: "Can you help me choose colours?",
    answer:
      "Yes! Colour advice is free with every quote. Bring a photo, a tile or a cushion and we'll build a palette that flows room to room.",
  },
  {
    category: "Booking",
    question: "How do I book?",
    answer:
      "Use the Book a Painter section on this site — pick your service, a date and a time slot, add a few details, and you'll get a confirmation email straight away. Or tap the call button on mobile.",
  },
  {
    category: "Contact",
    question: "How do I contact you?",
    answer:
      "Email mesaykar@gmail.com, call or text the number in the footer, or use the booking form. We reply within one business day.",
  },
];
