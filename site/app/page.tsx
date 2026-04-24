"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type Product = {
  id: number;
  title: string;
  category: string;
  tags: string[];
  price: number;
  oldPrice: number;
  image: string;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type MegaChild = {
  id: string;
  title: string;
  image: string;
  services?: string[];
};

type MegaCategory = {
  id: string;
  title: string;
  children: MegaChild[];
  subTabs?: string[];
};

export default function HomePage() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"TR" | "ENG">("TR");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("Tümü");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState("hesap-satisi");
  const [activeMegaSubTab, setActiveMegaSubTab] = useState("Hesap");

  const BANNER_IMAGE_URL = "https://i.hizliresim.com/c539p5z.png";

  const closeModal = () => {
    setModal(null);
    setAcceptedTerms(false);
  };

  const socialLinks = [
    {
      name: "Netflix",
      href: "/kategori/netflix",
      icon: (
        <img
          src="https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png"
          alt="Netflix"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Windows",
      href: "/kategori/windows",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg"
          alt="Windows"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Gemini",
      href: "/kategori/gemini",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg"
          alt="Gemini"
          className="h-10 w-10 object-contain"
        />
      ),
    },
    {
      name: "Ofis Programları",
      href: "/kategori/ofis-programlari",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Microsoft_Office_logo_%282013%E2%80%932019%29.svg"
          alt="Ofis"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Steam",
      href: "/kategori/steam",
      icon: (
        <img
          src="https://cdn.simpleicons.org/steam/000000"
          alt="Steam"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Epic",
      href: "/kategori/epic",
      icon: (
        <img
          src="https://cdn.simpleicons.org/epicgames/000000"
          alt="Epic"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "TikTok",
      href: "/kategori/tiktok",
      icon: (
        <img
          src="https://cdn.simpleicons.org/tiktok/000000"
          alt="TikTok"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Discord",
      href: "/kategori/discord",
      icon: (
        <img
          src="https://cdn.simpleicons.org/discord/5865F2"
          alt="Discord"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Spotify",
      href: "/kategori/spotify",
      icon: (
        <img
          src="https://cdn.simpleicons.org/spotify/1DB954"
          alt="Spotify"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "OpenAI",
      href: "/kategori/openai",
      icon: (
        <img
          src="https://www.svgrepo.com/show/306500/openai.svg"
          alt="OpenAI"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "CapCut",
      href: "/kategori/capcut",
      icon: (
        <img
          src="https://vectorseek.com/wp-content/uploads/2023/07/Capcut-Logo-Png-Vector.svg-.png"
          alt="CapCut"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Telegram",
      href: "/kategori/telegram",
      icon: (
        <img
          src="https://cdn.simpleicons.org/telegram/26A5E4"
          alt="Telegram"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Instagram",
      href: "/kategori/instagram",
      icon: (
        <img
          src="https://cdn.simpleicons.org/instagram/E4405F"
          alt="Instagram"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "YouTube",
      href: "/kategori/youtube",
      icon: (
        <img
          src="https://cdn.simpleicons.org/youtube/FF0000"
          alt="YouTube"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "X",
      href: "/kategori/x",
      icon: (
        <img
          src="https://cdn.simpleicons.org/x/000000"
          alt="X"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      name: "Facebook",
      href: "/kategori/facebook",
      icon: (
        <img
          src="https://cdn.simpleicons.org/facebook/1877F2"
          alt="Facebook"
          className="h-8 w-8 object-contain"
        />
      ),
    },
  ];

  const marqueeLinks = [...socialLinks, ...socialLinks];

  const products: Product[] = [
    {
      id: 1,
      title: "Gemini Premium",
      category: "Yapay Zeka",
      tags: ["gemini", "yapay zeka", "premium"],
      price: 299,
      oldPrice: 399,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "ChatGPT Plus",
      category: "Yapay Zeka",
      tags: ["chatgpt", "openai", "plus"],
      price: 249,
      oldPrice: 329,
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Windows Key",
      category: "Windows",
      tags: ["windows", "key", "lisans"],
      price: 149,
      oldPrice: 199,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Office Programları",
      category: "Windows",
      tags: ["office", "word", "excel", "lisans"],
      price: 199,
      oldPrice: 259,
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "YouTube Abone Paketi",
      category: "YouTube",
      tags: ["youtube", "abone", "izlenme"],
      price: 179,
      oldPrice: 239,
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Instagram Takipçi",
      category: "Instagram",
      tags: ["instagram", "takipçi", "beğeni"],
      price: 129,
      oldPrice: 179,
      image:
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "PUBG Hesap",
      category: "Oyun",
      tags: ["pubg", "hesap", "pubg hesap"],
      price: 349,
      oldPrice: 449,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "CS2 Prime Hesap",
      category: "Oyun",
      tags: ["cs2", "counter strike", "hesap"],
      price: 279,
      oldPrice: 359,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 9,
      title: "Roblox Premium Hesap",
      category: "Oyun",
      tags: ["roblox", "hesap", "premium"],
      price: 219,
      oldPrice: 299,
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const socialMediaBoxes = [
    { name: "Instagram", href: "#", icon: "https://cdn.simpleicons.org/instagram/E4405F" },
    { name: "Telegram", href: "#", icon: "https://cdn.simpleicons.org/telegram/26A5E4" },
    { name: "Discord", href: "#", icon: "https://cdn.simpleicons.org/discord/5865F2" },
    { name: "YouTube", href: "#", icon: "https://cdn.simpleicons.org/youtube/FF0000" },
    { name: "X", href: "#", icon: "https://cdn.simpleicons.org/x/000000" },
    { name: "Facebook", href: "#", icon: "https://cdn.simpleicons.org/facebook/1877F2" },
  ];

  const publishers = [
    {
      id: 1,
      name: "Rockstar Games",
      image:
        "https://media.istockphoto.com/id/1022832300/tr/vekt%C3%B6r/erkek-avatar-profil-resmi.jpg?s=170667a&w=0&k=20&c=VQPds_8VjSJJwqoy3WTiZQ5uK-MxpmijVukYGqbSnMY=",
    },
    {
      id: 2,
      name: "Valve",
      image:
        "https://media.istockphoto.com/id/1022832300/tr/vekt%C3%B6r/erkek-avatar-profil-resmi.jpg?s=170667a&w=0&k=20&c=VQPds_8VjSJJwqoy3WTiZQ5uK-MxpmijVukYGqbSnMY=",
    },
    {
      id: 3,
      name: "Riot Games",
      image:
        "https://media.istockphoto.com/id/1022832300/tr/vekt%C3%B6r/erkek-avatar-profil-resmi.jpg?s=170667a&w=0&k=20&c=VQPds_8VjSJJwqoy3WTiZQ5uK-MxpmijVukYGqbSnMY=",
    },
    {
      id: 4,
      name: "Epic Games",
      image:
        "https://media.istockphoto.com/id/1022832300/tr/vekt%C3%B6r/erkek-avatar-profil-resmi.jpg?s=170667a&w=0&k=20&c=VQPds_8VjSJJwqoy3WTiZQ5uK-MxpmijVukYGqbSnMY=",
    },
    {
      id: 5,
      name: "Ubisoft",
      image:
        "https://media.istockphoto.com/id/1022832300/tr/vekt%C3%B6r/erkek-avatar-profil-resmi.jpg?s=170667a&w=0&k=20&c=VQPds_8VjSJJwqoy3WTiZQ5uK-MxpmijVukYGqbSnMY=",
    },
    {
      id: 6,
      name: "Electronic Arts",
      image:
        "https://media.istockphoto.com/id/1022832300/tr/vekt%C3%B6r/erkek-avatar-profil-resmi.jpg?s=170667a&w=0&k=20&c=VQPds_8VjSJJwqoy3WTiZQ5uK-MxpmijVukYGqbSnMY=",
    },
  ];

  const megaCategories: MegaCategory[] = [
  {
    id: "hesap-satisi",
    title: "Hesap Satışı",
    subTabs: ["Hesap", "Beğeni", "Yorum", "İzlenme", "Takipçi", "Abone"],
    children: [
      { id: "instagram", title: "Instagram", image: "https://cdn.simpleicons.org/instagram/E4405F", services: ["Hesap", "Beğeni", "Yorum", "İzlenme", "Takipçi"] },
      { id: "youtube", title: "YouTube", image: "https://cdn.simpleicons.org/youtube/FF0000", services: ["Hesap", "Beğeni", "Yorum", "İzlenme", "Abone"] },
      { id: "facebook", title: "Facebook", image: "https://cdn.simpleicons.org/facebook/1877F2", services: ["Hesap", "Beğeni", "Yorum", "İzlenme", "Takipçi"] },
      { id: "x", title: "X", image: "https://cdn.simpleicons.org/x/000000", services: ["Hesap", "Beğeni", "Yorum", "İzlenme", "Takipçi"] },
      { id: "tiktok", title: "TikTok", image: "https://cdn.simpleicons.org/tiktok/000000", services: ["Hesap", "Beğeni", "Yorum", "İzlenme", "Takipçi"] },
      { id: "telegram", title: "Telegram", image: "https://cdn.simpleicons.org/telegram/26A5E4", services: ["Hesap", "Takipçi", "İzlenme"] },
      { id: "discord", title: "Discord", image: "https://cdn.simpleicons.org/discord/5865F2", services: ["Hesap"] },
      { id: "spotify", title: "Spotify", image: "https://cdn.simpleicons.org/spotify/1DB954", services: ["Hesap", "Takipçi", "İzlenme"] },
      { id: "netflix", title: "Netflix", image: "https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png", services: ["Hesap"] },
      { id: "steam", title: "Steam", image: "https://cdn.simpleicons.org/steam/000000", services: ["Hesap"] },
      { id: "epic", title: "Epic Games", image: "https://cdn.simpleicons.org/epicgames/000000", services: ["Hesap"] },
      { id: "openai", title: "ChatGPT", image: "https://www.svgrepo.com/show/306500/openai.svg", services: ["Hesap"] },
      { id: "gemini", title: "Gemini", image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", services: ["Hesap"] },
      { id: "capcut", title: "CapCut", image: "https://vectorseek.com/wp-content/uploads/2023/07/Capcut-Logo-Png-Vector.svg-.png", services: ["Hesap"] },
    ],
  },
  {
    id: "item-skin",
    title: "İtem & Skin",
    children: [
      { id: "cs2", title: "Counter Strike 2", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop" },
      { id: "valorant", title: "Valorant", image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=900&auto=format&fit=crop" },
      { id: "roblox", title: "Roblox", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=900&auto=format&fit=crop" },
      { id: "minecraft", title: "Minecraft", image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=900&auto=format&fit=crop" },
      { id: "fortnite", title: "Fortnite", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
      { id: "pubg-mobile", title: "PUBG Mobile", image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=900&auto=format&fit=crop" },
      { id: "growtopia", title: "Growtopia", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
      { id: "diablo", title: "Diablo IV", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
      { id: "genshin", title: "Genshin Impact", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
    ],
  },
  {
    id: "top-up",
    title: "ID Yükleme (Top Up)",
    children: [
      { id: "valorant-vp", title: "Valorant VP", image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=900&auto=format&fit=crop" },
      { id: "pubg-uc", title: "PUBG UC", image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=900&auto=format&fit=crop" },
      { id: "robux", title: "Robux", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=900&auto=format&fit=crop" },
      { id: "v-bucks", title: "V-Bucks", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
    ],
  },
  {
    id: "epin",
    title: "Epin",
    children: [
      { id: "steam-cuzdan", title: "Steam Cüzdan", image: "https://cdn.simpleicons.org/steam/000000" },
      { id: "google-play", title: "Google Play", image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" },
      { id: "app-store", title: "App Store", image: "https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" },
      { id: "xbox", title: "Xbox", image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg" },
      { id: "playstation", title: "PlayStation", image: "https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg" },
    ],
  },
  {
    id: "boost",
    title: "Boost Hizmetleri",
    children: [
      { id: "valorant", title: "Valorant Boost", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
      { id: "pubg-mobile", title: "PUBG Boost", image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=900&auto=format&fit=crop" },
      { id: "cs2", title: "CS2 Boost", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop" },
    ],
  },
  {
    id: "yazilim",
    title: "Yazılım Ürünleri",
    children: [
      { id: "openai", title: "ChatGPT", image: "https://www.svgrepo.com/show/306500/openai.svg" },
      { id: "gemini", title: "Gemini", image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
      { id: "windows", title: "Windows", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" },
      { id: "office", title: "Ofis Programları", image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Microsoft_Office_logo_%282013%E2%80%932019%29.svg" },
      { id: "capcut", title: "CapCut", image: "https://vectorseek.com/wp-content/uploads/2023/07/Capcut-Logo-Png-Vector.svg-.png" },
    ],
  },
  {
    id: "hediye-kartlari",
    title: "Hediye Kartları",
    children: [
      { id: "steam-cuzdan", title: "Steam Gift", image: "https://cdn.simpleicons.org/steam/000000" },
      { id: "google-play", title: "Google Play Gift", image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" },
      { id: "app-store", title: "App Store Gift", image: "https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" },
    ],
  },
  {
    id: "cd-key",
    title: "CD Key",
    children: [
      { id: "windows", title: "Windows Key", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" },
      { id: "office", title: "Office Key", image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Microsoft_Office_logo_%282013%E2%80%932019%29.svg" },
      { id: "steam", title: "Steam Oyun Key", image: "https://cdn.simpleicons.org/steam/000000" },
      { id: "epic", title: "Epic Oyun Key", image: "https://cdn.simpleicons.org/epicgames/000000" },
    ],
  },
  {
    id: "oyun-parasi",
    title: "Oyun Parası",
    children: [
      { id: "valorant-vp", title: "Valorant VP", image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=900&auto=format&fit=crop" },
      { id: "pubg-uc", title: "PUBG UC", image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=900&auto=format&fit=crop" },
      { id: "robux", title: "Robux", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=900&auto=format&fit=crop" },
      { id: "v-bucks", title: "V-Bucks", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
    ],
  },
  {
    id: "sosyal-medya",
    title: "Sosyal Medya",
    children: [
      { id: "instagram", title: "Instagram", image: "https://cdn.simpleicons.org/instagram/E4405F" },
      { id: "youtube", title: "YouTube", image: "https://cdn.simpleicons.org/youtube/FF0000" },
      { id: "facebook", title: "Facebook", image: "https://cdn.simpleicons.org/facebook/1877F2" },
      { id: "x", title: "X", image: "https://cdn.simpleicons.org/x/000000" },
      { id: "tiktok", title: "TikTok", image: "https://cdn.simpleicons.org/tiktok/000000" },
      { id: "telegram", title: "Telegram", image: "https://cdn.simpleicons.org/telegram/26A5E4" },
      { id: "discord", title: "Discord", image: "https://cdn.simpleicons.org/discord/5865F2" },
      { id: "spotify", title: "Spotify", image: "https://cdn.simpleicons.org/spotify/1DB954" },
    ],
  },
];

  const quickFilters = [
  { label: "İndirimli Ürünler", href: "/" },
  { label: "CD-Key", href: "/kategori/windows" },
  { label: "CS2 Hesap", href: "/kategori/cs2" },
  { label: "Pubg Hesap", href: "/kategori/pubg-mobile" },
  { label: "Roblox Hesap", href: "/kategori/roblox" },
  { label: "Sosyal Medya Hesap", href: "/kategori/instagram" },
];

  useEffect(() => {
    const savedCart = localStorage.getItem("hesapova-cart");
    const savedLogin = localStorage.getItem("hesapova-login");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const mustOpenLogin = sessionStorage.getItem("open-login-modal");
    if (mustOpenLogin === "true") {
      setModal("login");
      sessionStorage.removeItem("open-login-modal");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hesapova-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("hesapova-login", String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    const currentCategory = megaCategories.find((cat) => cat.id === activeMegaCategory);
    const firstTab = currentCategory?.subTabs?.[0] ?? "";
    setActiveMegaSubTab(firstTab);
  }, [activeMegaCategory]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return products.filter((item) => {
      const matchesFilter =
        activeFilter === "Tümü" ||
        item.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
        item.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase()));

      const matchesSearch =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return products
      .filter((item) => {
        const q = searchTerm.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      })
      .slice(0, 5);
  }, [searchTerm]);

  const activeMegaCategoryData = useMemo(
    () => megaCategories.find((cat) => cat.id === activeMegaCategory),
    [activeMegaCategory]
  );

  const visibleMegaChildren = useMemo(() => {
    if (!activeMegaCategoryData) return [];

    if (!activeMegaCategoryData.subTabs?.length) {
      return activeMegaCategoryData.children;
    }

    return activeMegaCategoryData.children.filter((child) =>
      child.services?.includes(activeMegaSubTab)
    );
  }, [activeMegaCategoryData, activeMegaSubTab]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserMenuOpen(false);
    closeModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setCartOpen(false);
  };

  const handleCreateListingClick = () => {
    if (!isLoggedIn) {
      setModal("login");
      return;
    }

    window.location.href = "/ilan-ekle";
  };

  const handleAddToCart = (product: Product) => {
    if (!isLoggedIn) {
      setModal("login");
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nextQuantity =
            type === "increase" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: nextQuantity };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatPrice = (value: number) => `${value} TL`;

  return (
    <div className="min-h-screen text-neutral-900" style={{ backgroundColor: "#ececec" }}>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[180px_1fr_420px] lg:items-center lg:gap-6 lg:px-6 xl:grid-cols-[220px_1fr_470px]">
          <div className="flex items-center justify-center lg:justify-start">
            <Link href="/" className={`text-2xl font-semibold tracking-[-0.5px] lg:text-3xl ${jetbrains.className}`}>
              <span className="text-black">Hesap</span>
              <span className="text-orange-500">ova</span>
            </Link>
          </div>

          <div className="relative flex justify-center lg:justify-end lg:translate-x-10">
            <div className="flex w-full max-w-sm items-center rounded-full border-2 border-orange-400 bg-white px-4 py-2.5 lg:max-w-md lg:translate-x-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                id="product-search-bar"
                name="q_search_8741"
                type="search"
                placeholder="Ürün ara..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            {searchSuggestions.length > 0 && (
              <div className="absolute top-full z-50 mt-2 w-full max-w-sm rounded-2xl border border-orange-200 bg-white p-2 shadow-xl lg:max-w-md lg:translate-x-10">
                {searchSuggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
  const serviceMap: Record<string, string> = {
    Hesap: "hesap",
    Beğeni: "begeni",
    Yorum: "yorum",
    İzlenme: "izlenme",
    Takipçi: "takipci",
    Abone: "abone",
  };

  const serviceSlug = serviceMap[activeMegaSubTab] || "";
  const href = serviceSlug
    ? `/kategori/${item.id}?service=${serviceSlug}`
    : `/kategori/${item.id}`;

  window.location.href = href;
}}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-orange-50"
                  >
                    <span>{item.title}</span>
                    <span className="text-orange-600">{formatPrice(item.price)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 whitespace-nowrap lg:justify-end lg:gap-3">
            <button
              onClick={() => setSelectedLang((prev) => (prev === "TR" ? "ENG" : "TR"))}
              className="flex h-5 w-7 shrink-0 items-center justify-center rounded-xl border border-orange-300 bg-white hover:bg-orange-50"
              title="Dil Seç"
            >
              <div className="flex h-5 w-8 overflow-hidden rounded-sm shadow-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
                  alt="TR"
                  className="h-full w-1/2 object-cover"
                />
                <img
                  src="https://w7.pngwing.com/pngs/65/504/png-transparent-flag-of-england-flag-of-the-united-kingdom-flag-of-great-britain-flag-day-blue-angle-flag.png"
                  alt="ENG"
                  className="h-full w-1/2 object-cover"
                />
              </div>
            </button>

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setModal("login");
                  setUserMenuOpen(false);
                }}
                className="shrink-0 rounded-2xl border border-orange-300 px-3 py-1.5 text-sm text-orange-700 hover:bg-orange-50"
              >
                Giriş Yap / Kayıt Ol
              </button>
            ) : (
              <>
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative flex shrink-0 items-center gap-1.5 rounded-xl bg-orange-500 px-2.5 py-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13h10M9 19a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-black">Sepet</span>
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </button>

                <div className="relative shrink-0">
                  <button
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 21a8 8 0 10-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-orange-200 bg-white p-3 shadow-lg">
                      <div className="mb-3 border-b border-neutral-200 pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-sm font-semibold text-black">Ufuk Yılmaz</div>
                            <div className="mt-1 text-xs text-neutral-500">Kullanıcı Profili</div>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                            title="Çıkış Yap"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l5-5-5-5" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12H9" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mb-3 rounded-xl bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
                        Cüzdan: 0,00 TL
                      </div>

                      <div className="flex flex-col gap-2">
                        <button className="w-full rounded-xl border border-orange-500 bg-white px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50">
                          Bakiye Yükle
                        </button>

                        <button className="w-full rounded-xl border border-orange-500 bg-white px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50">
                          Para Çek
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-[#c8c7c7] shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
          <div className="relative flex flex-wrap items-center gap-4 pl-0 text-sm font-medium text-black lg:pl-10">
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 -ml-1 transition hover:text-orange-300"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Kategoriler</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition ${megaMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {megaMenuOpen && (
                <div className="absolute left-0 top-full z-40 mt-3 flex h-[620px] w-[1180px] max-w-[95vw] overflow-hidden rounded-2xl border border-gray-200 bg-[#262a42] shadow-2xl">
                  <div className="w-[230px] overflow-y-auto border-r border-white/10 bg-[#22263b] p-3">
                    <button className="mb-2 w-full rounded-xl bg-[#3a4063] px-4 py-3 text-left font-semibold text-white">
                      Tüm Kategoriler
                    </button>

                    <div className="space-y-2">
                      {megaCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveMegaCategory(cat.id)}
                          className={`flex w-full items-center rounded-xl px-4 py-3 text-left transition ${
                            activeMegaCategory === cat.id
                              ? "bg-[#4b57c7] text-white"
                              : "bg-transparent text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>{cat.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 h-[620px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#4b57c7] scrollbar-track-transparent">
                    <input
                      type="text"
                      placeholder="Kategorilerde ara..."
                      className="mb-4 w-full rounded-xl border border-white/10 bg-[#1f2235] px-4 py-3 text-sm text-white outline-none"
                    />

                    {activeMegaCategoryData?.subTabs && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {activeMegaCategoryData.subTabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveMegaSubTab(tab)}
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                              activeMegaSubTab === tab
                                ? "bg-[#4b57c7] text-white"
                                : "bg-[#34395b] text-white/80 hover:bg-[#3f456a]"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    )}

                    <h3 className="mb-4 text-lg font-bold text-white">Popüler Kategoriler</h3>

                    <div className="grid grid-cols-4 gap-4 xl:grid-cols-5">
                      {visibleMegaChildren.map((item) => (
  <button
  onClick={() => {
    const serviceMap: Record<string, string> = {
      Hesap: "hesap",
      Beğeni: "begeni",
      Yorum: "yorum",
      İzlenme: "izlenme",
      Takipçi: "takipci",
      Abone: "abone",
    };

    const serviceSlug = serviceMap[activeMegaSubTab] || "";
    const href = serviceSlug
      ? `/kategori/${item.id}?service=${serviceSlug}`
      : `/kategori/${item.id}`;

    window.location.href = href;
  }}
  className="overflow-hidden rounded-2xl bg-[#303450] text-left transition hover:-translate-y-1 hover:shadow-xl"
>
  <div className="flex h-32 items-center justify-center bg-white p-4">
    <img
      src={item.image}
      alt={item.title}
      className="max-h-full max-w-full object-contain"
    />
  </div>

  <div className="bg-gradient-to-r from-[#ff7a00] via-[#ff6a00] to-[#ff4d00] p-3 text-sm font-semibold text-white">
    {item.title}
  </div>
</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {quickFilters.map((item) => (
              <button
                key={item.label}
                onClick={() => {
  window.location.href = item.href;
}}
                className="flex items-center gap-2 transition hover:text-orange-600"
              >
                {item.label === "CD-Key" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0v4" />
                  </svg>
                ) : item.label === "İndirimli Ürünler" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <line x1="19" y1="5" x2="5" y2="19" />
                    <circle cx="6.5" cy="6.5" r="2.5" />
                    <circle cx="17.5" cy="17.5" r="2.5" />
                  </svg>
                ) : item.label === "Sosyal Medya Hesap" ? (
                  <span></span>
                ) : (
                  <span></span>
                )}
                {item.label}
              </button>
            ))}

            <div className="ml-auto" />

            <button
              onClick={handleCreateListingClick}
              className="flex items-center gap-2 rounded-xl border border-orange-300 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md transition hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 hover:shadow-lg"
            >
              <span className="text-base leading-none">+</span>
              İlan Ekle
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#ececec] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#ececec] to-transparent" />

          <div className="marquee-track flex w-max items-start gap-1 py-1">
            {marqueeLinks.map((item, index) => (
              <button
                key={`${item.name}-${index}`}
                onClick={() => {
  window.location.href = item.href;
}}
                className="flex w-20 shrink-0 flex-col items-center gap-1.5"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  {item.icon}
                </div>

                <span className="text-center text-xs font-medium text-black">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6 lg:pt-14">
        <div className="aspect-[4/1] overflow-hidden rounded-[30px] shadow-2xl">
          <img src={BANNER_IMAGE_URL} alt="Banner" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-black lg:text-2xl">Yayıncılar</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {publishers.map((item) => (
              <a
                key={item.id}
                href="#"
                className="group flex flex-col items-center justify-center rounded-[22px] border border-white/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-xl bg-[#f7f7f7]">
                  <img src={item.image} alt={item.name} className="max-h-12 w-auto object-contain" />
                </div>

                <span className="mt-3 text-center text-sm font-semibold text-neutral-800 group-hover:text-orange-600">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 pt-6 lg:px-6 lg:pb-12 lg:pt-8">
        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-black lg:text-2xl">Vitrin İlanları</h2>
              <p className="mt-1 text-sm text-neutral-500">
                {activeFilter === "Tümü" && !searchTerm
                  ? "Tüm ilanlar"
                  : `Gösterilen sonuç: ${filteredProducts.length}`}
              </p>
            </div>

            <button
              onClick={() => {
                setActiveFilter("Tümü");
                setSearchTerm("");
              }}
              className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Tümünü Gör
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <div className="text-lg font-bold text-neutral-800">Sonuç bulunamadı</div>
              <p className="mt-2 text-sm text-neutral-500">Farklı bir ürün adı veya kategori deneyebilirsin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-[22px] border border-white/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative h-36 overflow-hidden bg-gray-200 sm:h-40 xl:h-36">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover object-center" />
                    <div className="absolute left-2 top-2 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white sm:text-xs">
                      VİTRİN İLANI
                    </div>
                  </div>

                  <div className="space-y-2 p-3">
                    <div className="text-xs text-neutral-500 sm:text-sm">{item.category}</div>

                    <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-neutral-900 group-hover:text-orange-600 sm:text-[15px]">
                      {item.title}
                    </h3>

                    <div className="flex items-end gap-2">
                      <span className="text-lg font-black text-orange-600 sm:text-xl">{formatPrice(item.price)}</span>
                      <span className="text-xs text-neutral-400 line-through sm:text-sm">{formatPrice(item.oldPrice)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                      >
                        Sepete Ekle
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="rounded-xl border border-orange-500 bg-white px-3 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
                      >
                        Satın Al
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {cartOpen && isLoggedIn && (
        <div className="fixed inset-0 z-[120] flex justify-end bg-black/40">
          <div className="h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">Sepetim</h3>
                <p className="text-sm text-neutral-500">Toplam ürün: {cartCount}</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-xl text-neutral-600 hover:bg-neutral-200"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
                Sepetinde henüz ürün yok.
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-neutral-200 p-3">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.title} className="h-20 w-20 rounded-xl object-cover" />

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-neutral-800">{item.title}</h4>
                            <p className="mt-1 text-sm text-orange-600">{formatPrice(item.price)}</p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm font-medium text-red-500 hover:underline"
                          >
                            Sil
                          </button>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, "decrease")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300"
                          >
                            -
                          </button>
                          <span className="min-w-[28px] text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, "increase")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl bg-orange-50 p-4">
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span>Ara Toplam</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-lg font-bold text-neutral-900">
                    <span>Toplam</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>

                  <button className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600">
                    Siparişi Tamamla
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {modal && (
        <div onClick={closeModal} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-gray-100 p-5 shadow-2xl lg:p-6"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-normal text-neutral-900">
                  {modal === "login" ? "Giriş Yap" : "Kayıt Ol"}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {modal === "login" ? "Hesabına giriş yap." : "Yeni hesap oluştur."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-xl text-neutral-600 hover:bg-neutral-200"
              >
                ×
              </button>
            </div>

            <div className="mb-5 flex items-center justify-center gap-3">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition hover:bg-neutral-200">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/960px-Google_Favicon_2025.svg.png"
                  alt="Google"
                  className="h-9 w-9 object-contain"
                />
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition hover:bg-neutral-200">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="h-9 w-9 object-contain"
                />
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition hover:bg-neutral-200">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                  className="h-9 w-9 object-contain"
                />
              </button>
            </div>

            <div className="space-y-4">
              {modal === "register" && (
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-orange-500"
                />
              )}

              <input
                type="text"
                placeholder="E-posta veya cep telefonu"
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-orange-500"
              />

              <input
                type="password"
                placeholder="Şifre"
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-orange-500"
              />

              {modal === "login" && (
                <button className="text-sm font-medium text-orange-600 hover:underline">
                  Şifremi unuttum
                </button>
              )}

              <button
                onClick={handleLogin}
                disabled={modal === "register" && !acceptedTerms}
                className={`w-full rounded-2xl py-3 font-semibold text-white transition ${
                  modal === "register"
                    ? acceptedTerms
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "cursor-not-allowed bg-orange-300"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {modal === "login" ? "Giriş Yap" : "Kayıt Ol"}
              </button>

              {modal === "login" ? (
                <div className="text-center text-sm text-neutral-600">
                  Hesabın yoksa{" "}
                  <button
                    onClick={() => {
                      setModal("register");
                      setAcceptedTerms(false);
                    }}
                    className="font-semibold text-orange-600 hover:underline"
                  >
                    Kayıt Ol
                  </button>
                </div>
              ) : (
                <div className="text-center text-sm text-neutral-600">
                  Zaten hesabın var mı?{" "}
                  <button
                    onClick={() => {
                      setModal("login");
                      setAcceptedTerms(false);
                    }}
                    className="font-semibold text-orange-600 hover:underline"
                  >
                    Giriş Yap
                  </button>
                </div>
              )}

              {modal === "register" && (
                <div className="border-t border-neutral-200 pt-4">
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-600 shadow-sm">
                    <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <span className="flex h-5 w-5 items-center justify-center rounded-[5px] border border-neutral-400 bg-white transition peer-checked:border-orange-500 peer-checked:bg-orange-500">
                        <svg
                          className="h-3 w-3 text-white opacity-0 transition peer-checked:opacity-100"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.414 0l-3.2-3.2a1 1 0 111.414-1.42l2.493 2.494 6.493-6.494a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </span>

                    <span className="leading-5">
                      Devam ederek{" "}
                      <button type="button" className="font-medium text-orange-600 hover:underline">
                        Gizlilik Sözleşmesi
                      </button>{" "}
                      ve{" "}
                      <button type="button" className="font-medium text-orange-600 hover:underline">
                        Kullanıcı Sözleşmesi
                      </button>{" "}
                      şartlarını kabul etmiş olursun.
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="mt-14 border-t border-neutral-300 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-extrabold text-black">Sosyal Medya Hesaplarımız</h3>

              <div className="grid grid-cols-2 gap-3">
                {socialMediaBoxes.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-[#f8f8f8] px-3 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
                  >
                    <img src={item.icon} alt={item.name} className="h-5 w-5" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-extrabold text-black">İletişim Bilgileri</h3>

              <div className="rounded-xl border border-neutral-200 bg-[#f8f8f8] p-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <b>E-posta:</b> destek@site.com
                  </div>
                  <div>
                    <b>WhatsApp:</b> +90 555 555 55 55
                  </div>
                  <div>
                    <b>Destek:</b> 7/24
                  </div>
                </div>

                <a
                  href="/destek-talebi"
                  className="mt-4 inline-block w-full rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 px-3 py-2 text-center text-sm font-semibold text-white hover:from-orange-500 hover:to-orange-700"
                >
                  Destek Talebi Oluştur
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-extrabold text-black">Yasal Bilgilendirme</h3>

              <div className="flex flex-col gap-2 text-sm">
                <a href="#" className="hover:text-orange-600">Gizlilik Politikası</a>
                <a href="#" className="hover:text-orange-600">KVKK</a>
                <a href="#" className="hover:text-orange-600">Kullanıcı Sözleşmesi</a>
                <a href="#" className="hover:text-orange-600">İade & İptal</a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-extrabold text-black">Hesapova</h3>

              <p className="text-sm text-neutral-600">
                Dijital ürünler ve sosyal medya hizmetlerinde güvenli alışveriş.
              </p>

              <div className="mt-3 text-xs text-orange-600">
                ✔ Güvenli ödeme <br />
                ✔ Hızlı teslimat <br />
                ✔ 7/24 destek
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-4 text-center text-sm text-neutral-500">© 2026 Hesapova</div>
        </div>
      </footer>

      <style jsx>{`
        .marquee-track {
          animation: marquee 60s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}