"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type Step = 1 | 2 | 3 | 4;

type CategoryItem = {
  id: string;
  title: string;
  image: string;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

const categories: CategoryItem[] = [
  { id: "sosyal-medya", title: "Sosyal Medya", image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=900&auto=format&fit=crop" },
  { id: "mobil-oyunlar", title: "Mobil Oyunlar", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop" },
  { id: "freelancer", title: "Freelancer Hizmet", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=900&auto=format&fit=crop" },
  { id: "reklam", title: "Reklam Satışı", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop" },
  { id: "mmo", title: "MMO Oyunlar", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
  { id: "boost", title: "Boost Hizmetleri", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop" },
  { id: "platform", title: "Platformlar", image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=900&auto=format&fit=crop" },
  { id: "yazilim", title: "Yazılım Ürünleri", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=900&auto=format&fit=crop" },
  { id: "random", title: "Random Hesap", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop" },
  { id: "diger", title: "Diğer Ürün Satışları", image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=900&auto=format&fit=crop" },
  { id: "valorant", title: "Valorant", image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=900&auto=format&fit=crop" },
  { id: "roblox", title: "Roblox", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=900&auto=format&fit=crop" },
  { id: "discord", title: "Discord", image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=900&auto=format&fit=crop" },
  { id: "growtopia", title: "Growtopia", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
  { id: "pubg-mobile", title: "PUBG Mobile", image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=900&auto=format&fit=crop" },
  { id: "cs2", title: "Counter Strike CS2", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop" },
  { id: "minecraft", title: "Minecraft", image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=900&auto=format&fit=crop" },
  { id: "fortnite", title: "Fortnite", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
  { id: "diablo", title: "Diablo IV", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
  { id: "genshin", title: "Genshin Impact", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop" },
];

const dopingPackages = [
  {
    id: "showcase",
    title: "Ana Sayfa Vitrini",
    desc: "İlanın ana sayfa vitrin alanında görünür.",
    price: 150,
  },
  {
    id: "top",
    title: "Üst Sıraya Çık",
    desc: "Kategori sıralamasında daha yukarıda listelenir.",
    price: 90,
  },
  {
    id: "highlight",
    title: "Öne Çıkar",
    desc: "İlan kartı daha dikkat çekici görünür.",
    price: 60,
  },
];

export default function IlanEklePage() {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [listingType, setListingType] = useState("manuel");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("3 Saat");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [selectedDoping, setSelectedDoping] = useState<string[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const login = localStorage.getItem("hesapova-login");
    const savedCart = localStorage.getItem("hesapova-cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    if (login !== "true") {
      sessionStorage.setItem("open-login-modal", "true");
      window.location.href = "/";
      return;
    }

    setIsLoggedIn(true);
    setReady(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("hesapova-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return categories;
    return categories.filter((item) => item.title.toLowerCase().includes(q));
  }, [search]);

  const commission = useMemo(() => {
    const numericPrice = Number(price || 0);
    return numericPrice > 0 ? numericPrice * 0.07 : 0;
  }, [price]);

  const netEarning = useMemo(() => {
    const numericPrice = Number(price || 0);
    return numericPrice > 0 ? numericPrice - commission : 0;
  }, [price, commission]);

  const totalDoping = useMemo(() => {
    return dopingPackages
      .filter((item) => selectedDoping.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
  }, [selectedDoping]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const toggleDoping = (id: string) => {
    setSelectedDoping((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setCartOpen(false);
    localStorage.setItem("hesapova-login", "false");
    window.location.href = "/";
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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

  const formatPrice = (value: number) => `${value} TL`;

  const nextStep = () => {
    if (step === 1 && !selectedCategory) {
      alert("Önce kategori seçmelisin.");
      return;
    }

    if (step === 2 && (!title || !description || !price)) {
      alert("Başlık, açıklama ve fiyat alanları zorunlu.");
      return;
    }

    if (step < 4) setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as Step);
  };

  if (!ready || !isLoggedIn) return null;

  return (
    <div className="min-h-screen text-black" style={{ backgroundColor: "#ececec" }}>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[180px_1fr_300px] lg:items-center lg:gap-6 lg:px-6">
          <div className="flex items-center justify-center lg:justify-start">
            <Link href="/" className={`text-2xl font-semibold tracking-[-0.5px] lg:text-3xl ${jetbrains.className}`}>
              <span className="text-black">Hesap</span>
              <span className="text-orange-500">ova</span>
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="flex w-full max-w-md items-center rounded-full border-2 border-orange-400 bg-white px-4 py-2.5">
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
                type="search"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-black outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 lg:justify-end">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(90deg, #ff7a00, #ff6a00, #ff4d00)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13h10M9 19a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
                />
              </svg>
              <span className="text-sm font-semibold text-white">Sepet</span>
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
          </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-[#c8c7c7] shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-black lg:pl-10">
            <a href="/" className="transition hover:text-orange-600">
              Ana Sayfa
            </a>
            <span>/</span>
            <span className="text-orange-600">İlan Ekle</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-5 lg:px-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-black">İlan Ekle</h1>
            <p className="mt-2 text-sm text-neutral-600">
              İlanını oluştur, detaylarını gir, istersen doping ekle.
            </p>
          </div>

          <a
            href="/"
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Ana Sayfaya Dön
          </a>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-md">
          <div className="bg-white px-6 py-6">
            <div className="px-2">
              {[
                { id: 1, title: "Kategori Seçimi" },
                { id: 2, title: "İlan Detayları" },
                { id: 3, title: "Doping" },
                { id: 4, title: "Sözleşme" },
              ].map((item, index, arr) => {
                const active = step === item.id;
                const done = step > item.id;
                const isLast = index === arr.length - 1;

                return (
                  <div
                    key={item.id}
                    className="relative inline-flex w-1/4 flex-col items-center align-top"
                  >
                    {!isLast && (
                      <div
                        className={`absolute left-[50%] top-5 h-[4px] w-full ${
                          done ? "bg-neutral-500" : "bg-neutral-300"
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition ${
                        done
                          ? "bg-neutral-500 text-white"
                          : active
                          ? "border-[4px] border-neutral-500 bg-white text-neutral-600"
                          : "bg-neutral-300 text-neutral-500"
                      }`}
                    >
                      {item.id}
                    </div>

                    <div className="mt-4 text-center text-sm font-medium text-black">
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-neutral-200" />

          <div className="bg-white px-6 py-6">
            {step === 1 && (
              <div>
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">İlan Kategorileri</h2>
                    <p className="mt-1 text-sm text-black/60">
                      İlanın hangi kategori altında yayınlanacağını seç.
                    </p>
                  </div>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Kategori ara..."
                    className="w-full max-w-md rounded-xl border border-neutral-200 bg-[#e3e3e3] px-4 py-3 text-sm text-black outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                  {filteredCategories.map((item) => {
                    const active = selectedCategory === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedCategory(item.id)}
                        className={`overflow-hidden rounded-2xl border text-left transition ${
                          active
                            ? "border-[#ff6a00] bg-[#fff5ee] shadow-lg"
                            : "border-neutral-200 bg-[#fdfcfb] hover:border-neutral-300 hover:bg-[#fdfcfb]"
                        }`}
                      >
                        <div className="h-24 overflow-hidden bg-[#fdfcfb]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="bg-gradient-to-r from-[#ff7a00] via-[#ff6a00] to-[#ff4d00] p-2.5">
                          <div className="text-sm font-semibold text-white">{item.title}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3 text-xl font-bold">İlan Detayları</h2>
                    <p className="text-sm text-black/60">
                      Kategori seçildi. Şimdi ilan bilgilerini doldur.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">İlan Tipi</label>
                    <div className="grid gap-3 md:grid-cols-3">
                      {[
                        { id: "manuel", title: "Manuel Teslimat", sub: "Teslimatı sen yaparsın." },
                        { id: "stoklu", title: "Stoklu Ürün", sub: "Hazır ürün / hesap satışı." },
                        { id: "alim", title: "Alım İlanı", sub: "Satın almak için ilan aç." },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setListingType(item.id)}
                          className={`rounded-2xl border p-4 text-left ${
                            listingType === item.id
                              ? "border-[#ff6a00] bg-[#fff5ee]"
                              : "border-neutral-200 bg-[#fdfcfb]"
                          }`}
                        >
                          <div className="font-semibold">{item.title}</div>
                          <div className="mt-1 text-xs text-neutral-500">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">İlan Başlığı</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={48}
                      placeholder="Örn: Valorant Full Access Hesap"
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Açıklama</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={8}
                      maxLength={4000}
                      placeholder="İlan detaylarını yaz..."
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Teslimat Süresi</label>
                      <select
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none"
                      >
                        <option>30 Dakika</option>
                        <option>1 Saat</option>
                        <option>3 Saat</option>
                        <option>6 Saat</option>
                        <option>12 Saat</option>
                        <option>24 Saat</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">İlan Fiyatı</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Fiyat gir"
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Kapak Fotoğrafı</label>
                    <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-[#fdfcfb] p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                      />
                      <div className="text-lg font-semibold">
                        {coverImage ? coverImage.name : "Görsel yüklemek için tıkla"}
                      </div>
                      <div className="mt-2 text-sm text-neutral-500">
                        PNG / JPG desteklenir
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-neutral-200 bg-[#fdfcfb] p-4">
                    <div className="mb-3 text-lg font-bold">Fiyat Özeti</div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">İlan fiyatı</span>
                        <span>{price ? `${price} TL` : "0 TL"}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Site komisyonu (%7)</span>
                        <span>{commission.toFixed(2)} TL</span>
                      </div>

                      <div className="border-t border-neutral-200 pt-3">
                        <div className="flex items-center justify-between font-bold">
                          <span>Net kazanç</span>
                          <span className="text-green-600">{netEarning.toFixed(2)} TL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-neutral-200 bg-[#fdfcfb] p-4">
                    <div className="mb-2 text-lg font-bold">Seçilen Kategori</div>
                    <div className="text-sm text-neutral-500">
                      {selectedCategory
                        ? categories.find((x) => x.id === selectedCategory)?.title
                        : "Henüz seçilmedi"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-bold">Doping Seçenekleri</h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    İstersen ilanını daha görünür yapabilirsin.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {dopingPackages.map((item) => {
                    const active = selectedDoping.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleDoping(item.id)}
                        className={`rounded-2xl border p-5 text-left transition ${
                          active
                            ? "border-[#ff6a00] bg-[#fff5ee]"
                            : "border-neutral-200 bg-[#fdfcfb]"
                        }`}
                      >
                        <div className="text-lg font-bold">{item.title}</div>
                        <div className="mt-2 text-sm text-neutral-500">{item.desc}</div>
                        <div className="mt-4 text-2xl font-extrabold text-orange-500">
                          {item.price} TL
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-xl border border-neutral-200 bg-[#fdfcfb] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Toplam doping ücreti</span>
                    <span className="text-2xl font-black text-orange-500">{totalDoping} TL</span>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="rounded-xl border border-neutral-200 bg-[#fdfcfb] p-6">
                <h2 className="mb-3 text-xl font-bold">Sözleşme Detayları</h2>
                <p className="text-sm text-neutral-500">
                  Bu alan şimdilik boş bırakıldı. Daha sonra kullanıcı sözleşmesi ve onay alanı eklenebilir.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-neutral-200 bg-white px-6 py-5">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-neutral-50"
              >
                Geri
              </button>

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(90deg, #ff7a00, #ff6a00, #ff4d00)",
                  }}
                >
                  Sonraki Adım
                </button>
              ) : (
                <button
                  className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
                >
                  İlanı Yayınla
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {cartOpen && (
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
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300 text-black"
                          >
                            -
                          </button>
                          <span className="min-w-[28px] text-center font-semibold text-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, "increase")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300 text-black"
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
    </div>
  );
}