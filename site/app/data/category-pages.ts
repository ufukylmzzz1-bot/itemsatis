export type ServiceKey =
  | "hesap"
  | "begeni"
  | "yorum"
  | "izlenme"
  | "takipci"
  | "abone";

export type CategoryConfig = {
  slug: string;
  title: string;
  image: string;
  services: ServiceKey[];
};

export type ListingItem = {
  id: string;
  slug: string;
  title: string;
  seller: string;
  price: number;
  oldPrice?: number;
  service: ServiceKey;
  image: string;
  rating: number;
  sales: number;
  views: number;
  delivery: string;
};

export const serviceLabels: Record<ServiceKey, string> = {
  hesap: "Hesap",
  begeni: "Beğeni",
  yorum: "Yorum",
  izlenme: "İzlenme",
  takipci: "Takipçi",
  abone: "Abone",
};

export const categoryConfigs: Record<string, CategoryConfig> = {
  instagram: {
    slug: "instagram",
    title: "Instagram",
    image: "https://cdn.simpleicons.org/instagram/E4405F",
    services: ["hesap", "begeni", "yorum", "izlenme", "takipci"],
  },
  youtube: {
    slug: "youtube",
    title: "YouTube",
    image: "https://cdn.simpleicons.org/youtube/FF0000",
    services: ["hesap", "begeni", "yorum", "izlenme", "abone"],
  },
  facebook: {
    slug: "facebook",
    title: "Facebook",
    image: "https://cdn.simpleicons.org/facebook/1877F2",
    services: ["hesap", "begeni", "yorum", "izlenme", "takipci"],
  },
  x: {
    slug: "x",
    title: "X",
    image: "https://cdn.simpleicons.org/x/000000",
    services: ["hesap", "begeni", "yorum", "izlenme", "takipci"],
  },
  tiktok: {
    slug: "tiktok",
    title: "TikTok",
    image: "https://cdn.simpleicons.org/tiktok/000000",
    services: ["hesap", "begeni", "yorum", "izlenme", "takipci"],
  },
  telegram: {
    slug: "telegram",
    title: "Telegram",
    image: "https://cdn.simpleicons.org/telegram/26A5E4",
    services: ["hesap", "takipci", "izlenme"],
  },
  discord: {
    slug: "discord",
    title: "Discord",
    image: "https://cdn.simpleicons.org/discord/5865F2",
    services: ["hesap"],
  },
  spotify: {
    slug: "spotify",
    title: "Spotify",
    image: "https://cdn.simpleicons.org/spotify/1DB954",
    services: ["hesap", "takipci", "izlenme"],
  },
  netflix: {
    slug: "netflix",
    title: "Netflix",
    image: "https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png",
    services: ["hesap"],
  },
  steam: {
    slug: "steam",
    title: "Steam",
    image: "https://cdn.simpleicons.org/steam/000000",
    services: ["hesap"],
  },
  epic: {
    slug: "epic",
    title: "Epic Games",
    image: "https://cdn.simpleicons.org/epicgames/000000",
    services: ["hesap"],
  },
  openai: {
    slug: "openai",
    title: "ChatGPT",
    image: "https://www.svgrepo.com/show/306500/openai.svg",
    services: ["hesap"],
  },
  gemini: {
    slug: "gemini",
    title: "Gemini",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    services: ["hesap"],
  },
  capcut: {
    slug: "capcut",
    title: "CapCut",
    image: "https://vectorseek.com/wp-content/uploads/2023/07/Capcut-Logo-Png-Vector.svg-.png",
    services: ["hesap"],
  },
  windows: {
    slug: "windows",
    title: "Windows",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg",
    services: ["hesap"],
  },
  office: {
    slug: "office",
    title: "Ofis Programları",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Microsoft_Office_logo_%282013%E2%80%932019%29.svg",
    services: ["hesap"],
  },
  cs2: {
    slug: "cs2",
    title: "Counter Strike 2",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  valorant: {
    slug: "valorant",
    title: "Valorant",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  roblox: {
    slug: "roblox",
    title: "Roblox",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  minecraft: {
    slug: "minecraft",
    title: "Minecraft",
    image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  fortnite: {
    slug: "fortnite",
    title: "Fortnite",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  "pubg-mobile": {
    slug: "pubg-mobile",
    title: "PUBG Mobile",
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  growtopia: {
    slug: "growtopia",
    title: "Growtopia",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  diablo: {
    slug: "diablo",
    title: "Diablo IV",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  genshin: {
    slug: "genshin",
    title: "Genshin Impact",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  "valorant-vp": {
    slug: "valorant-vp",
    title: "Valorant VP",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  "pubg-uc": {
    slug: "pubg-uc",
    title: "PUBG UC",
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  robux: {
    slug: "robux",
    title: "Robux",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  "v-bucks": {
    slug: "v-bucks",
    title: "V-Bucks",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop",
    services: ["hesap"],
  },
  "steam-cuzdan": {
    slug: "steam-cuzdan",
    title: "Steam Cüzdan",
    image: "https://cdn.simpleicons.org/steam/000000",
    services: ["hesap"],
  },
  "google-play": {
    slug: "google-play",
    title: "Google Play",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg",
    services: ["hesap"],
  },
  "app-store": {
    slug: "app-store",
    title: "App Store",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg",
    services: ["hesap"],
  },
  xbox: {
    slug: "xbox",
    title: "Xbox",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg",
    services: ["hesap"],
  },
  playstation: {
    slug: "playstation",
    title: "PlayStation",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg",
    services: ["hesap"],
  },
};

const sampleSellers = [
  "Waif",
  "FollowTurk",
  "tugistore",
  "MamiMedya",
  "ItemHanem",
  "LeaoMedia",
];

const serviceTitleMap: Record<ServiceKey, string[]> = {
  hesap: [
    "{name} Premium Hesap",
    "{name} Full Access Hesap",
    "{name} Güvenli Hesap",
    "{name} 1 Aylık Hesap",
  ],
  begeni: [
    "{name} Beğeni Paketi",
    "{name} Gerçek Beğeni",
    "{name} Hızlı Beğeni",
    "{name} Organik Beğeni",
  ],
  yorum: [
    "{name} Yorum Paketi",
    "{name} Gerçek Yorum",
    "{name} Özel Yorum Hizmeti",
    "{name} Türkçe Yorum",
  ],
  izlenme: [
    "{name} İzlenme Paketi",
    "{name} Organik İzlenme",
    "{name} Hızlı İzlenme",
    "{name} Video İzlenme",
  ],
  takipci: [
    "{name} Takipçi Paketi",
    "{name} Gerçek Takipçi",
    "{name} Organik Takipçi",
    "{name} Hızlı Takipçi",
  ],
  abone: [
    "{name} Abone Paketi",
    "{name} Gerçek Abone",
    "{name} Organik Abone",
    "{name} Hızlı Abone",
  ],
};

function generateListings(config: CategoryConfig): ListingItem[] {
  const items: ListingItem[] = [];

  config.services.forEach((service, serviceIndex) => {
    const templates = serviceTitleMap[service];

    for (let i = 0; i < 8; i++) {
      const template = templates[i % templates.length];
      const seller = sampleSellers[(serviceIndex + i) % sampleSellers.length];
      const price = 30 + serviceIndex * 15 + i * 9;

      items.push({
        id: `${config.slug}-${service}-${i}`,
        slug: config.slug,
        title: template.replace("{name}", config.title),
        seller,
        price,
        oldPrice: price + 20,
        service,
        image:
          i % 2 === 0
            ? "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1200&auto=format&fit=crop",
        rating: Number((8 + (i % 3) * 0.4).toFixed(1)),
        sales: 1000 + i * 147 + serviceIndex * 320,
        views: 450 + i * 73 + serviceIndex * 110,
        delivery: i % 2 === 0 ? "Otomatik teslimat" : "Manuel teslimat",
      });
    }
  });

  return items;
}

export function getCategoryPageData(slug: string) {
  const config = categoryConfigs[slug];
  if (!config) return null;

  const listings = generateListings(config);

  return {
    config,
    listings,
  };
}