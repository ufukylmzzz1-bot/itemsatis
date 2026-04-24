"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { getCategoryPageData, serviceLabels, ServiceKey } from "../../data/category-pages";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CategoryDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = String(params.slug);

  const pageData = getCategoryPageData(slug);

  const initialService = (searchParams.get("service") || "") as ServiceKey | "";
  const [selectedService, setSelectedService] = useState<ServiceKey | "">(
    pageData?.config.services.includes(initialService as ServiceKey)
      ? (initialService as ServiceKey)
      : ""
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [topSearch, setTopSearch] = useState("");

  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("En Güncel");

  const sortOptions = [
    "En Güncel",
    "En Yeni",
    "En Eski",
    "En Başarılı Satıcı",
    "En Düşük Fiyat",
    "En Yüksek Fiyat",
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

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const filteredListings = useMemo(() => {
    if (!pageData) return [];

    return pageData.listings.filter((item) => {
      const matchesService = !selectedService || item.service === selectedService;

      const matchesKeyword =
        !keyword.trim() ||
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.seller.toLowerCase().includes(keyword.toLowerCase());

      const minOk = !minPrice || item.price >= Number(minPrice);
      const maxOk = !maxPrice || item.price <= Number(maxPrice);

      return matchesService && matchesKeyword && minOk && maxOk;
    });
  }, [pageData, selectedService, keyword, minPrice, maxPrice]);

  const sortedListings = useMemo(() => {
    const items = [...filteredListings];

    switch (selectedSort) {
      case "En Düşük Fiyat":
        return items.sort((a, b) => a.price - b.price);

      case "En Yüksek Fiyat":
        return items.sort((a, b) => b.price - a.price);

      case "En Başarılı Satıcı":
        return items.sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0));

      case "En Eski":
        return items.reverse();

      case "En Yeni":
      case "En Güncel":
      default:
        return items;
    }
  }, [filteredListings, selectedSort]);

  const serviceCounts = useMemo(() => {
    if (!pageData) return {} as Record<string, number>;

    const counts: Record<string, number> = {};
    pageData.config.services.forEach((service) => {
      counts[service] = pageData.listings.filter((item) => item.service === service).length;
    });

    return counts;
  }, [pageData]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setCartOpen(false);
    localStorage.setItem("hesapova-login", "false");
    window.location.href = "/";
  };

  const handleCreateListingClick = () => {
    if (!isLoggedIn) {
      window.location.href = "/";
      return;
    }

    window.location.href = "/ilan-ekle";
  };

  if (!pageData) {
    return (
      <div className="min-h-screen bg-[#ececec]">
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[180px_1fr_300px] lg:items-center lg:gap-6 lg:px-6">
            <div className="flex items-center justify-center lg:justify-start">
              <Link
                href="/"
                className={`text-2xl font-semibold tracking-[-0.5px] lg:text-3xl ${jetbrains.className}`}
              >
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
                  value={topSearch}
                  onChange={(e) => setTopSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-black outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 lg:justify-end">
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex shrink-0 items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2"
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
                          ⎋
                        </button>
                      </div>
                    </div>

                    <div className="mb-3 rounded-xl bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
                      Cüzdan: 0,00 TL
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 py-16">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-black text-black">Kategori bulunamadı</h1>
            <p className="mt-3 text-neutral-500">Bu kategori için sayfa oluşturulmamış.</p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
              >
                En Güncel
              </button>

              <button
                onClick={handleCreateListingClick}
                className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                + İlan Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { config } = pageData;

  return (
    <div className="min-h-screen bg-[#ececec] text-black">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[180px_1fr_300px] lg:items-center lg:gap-6 lg:px-6">
          <div className="flex items-center justify-center lg:justify-start">
            <Link
              href="/"
              className={`text-2xl font-semibold tracking-[-0.5px] lg:text-3xl ${jetbrains.className}`}
            >
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
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-black outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 lg:justify-end">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex shrink-0 items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2"
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
                        ⎋
                      </button>
                    </div>
                  </div>

                  <div className="mb-3 rounded-xl bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
                    Cüzdan: 0,00 TL
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:px-6">
          <div>
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <Link href="/" className="hover:text-orange-600">
                Ana Sayfa
              </Link>
              <span>/</span>
              <span className="text-orange-600">{config.title}</span>
            </div>
            <h1 className="mt-2 text-3xl font-black">{config.title} İlanları</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Bu kategorideki tüm ilanlar burada listelenir.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:from-orange-500 hover:via-orange-600 hover:to-orange-700"
              >
                <span>{selectedSort}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition ${sortOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-2xl bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 shadow-xl">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedSort(option);
                        setSortOpen(false);
                      }}
                      className={`block w-full border-b border-white/10 px-4 py-3 text-left text-sm font-semibold text-white transition last:border-b-0 hover:bg-black/10 ${
                        selectedSort === option ? "bg-black/10" : ""
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleCreateListingClick}
              className="rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:from-orange-500 hover:via-orange-600 hover:to-orange-700"
            >
              + İlan Ekle
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-6">
        <aside className="rounded-[26px] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50">
              <img src={config.image} alt={config.title} className="h-6 w-6 object-contain" />
            </div>
            <div>
              <div className="text-lg font-black">{config.title}</div>
              <div className="text-sm text-neutral-500">Filtrele</div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-5">
            <div className="mb-3 text-lg font-black">İlan Tipi</div>

            <div className="space-y-2">
              <button
                onClick={() => setSelectedService("")}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                  !selectedService
                    ? "bg-orange-50 text-orange-700"
                    : "bg-[#f5f5f5] text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <span>Tümü</span>
                <span className="text-sm text-neutral-500">{pageData.listings.length}</span>
              </button>

              {config.services.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                    selectedService === service
                      ? "bg-orange-50 text-orange-700"
                      : "bg-[#f5f5f5] text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <span>{serviceLabels[service]}</span>
                  <span className="text-sm text-neutral-500">{serviceCounts[service] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-neutral-200 pt-5">
            <div className="mb-3 text-lg font-black">Fiyat Aralığı (₺)</div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="En az"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 outline-none"
              />
              <input
                type="number"
                placeholder="En çok"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="mt-6 border-t border-neutral-200 pt-5">
            <div className="mb-3 text-lg font-black">Kelime Filtrele</div>

            <input
              type="text"
              placeholder="İlan başlığı veya satıcı ara"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 outline-none"
            />
          </div>
        </aside>

        <main>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xl font-black">{config.title}</div>
              <div className="mt-1 text-sm text-neutral-500">
                Toplam {sortedListings.length} ilan gösteriliyor
              </div>
            </div>
          </div>

          {sortedListings.length === 0 ? (
            <div className="rounded-[26px] bg-white p-10 text-center shadow-sm">
              <div className="text-2xl font-black">Sonuç bulunamadı</div>
              <p className="mt-3 text-neutral-500">Filtreleri değiştirip tekrar dene.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
              {sortedListings.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex h-full flex-col overflow-visible rounded-2xl bg-gradient-to-br from-[#ff7a00] via-[#ff8a1f] to-[#ffad42] p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gray-300" />
                    <div className="text-xs">
                      <div className="font-semibold text-black">{item.seller}</div>
                    </div>
                  </div>

                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[#1f2233]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-2 min-h-[44px] line-clamp-2 text-xs font-semibold text-black">
                    {item.title}
                  </h3>

                  <div className="mt-2 text-[10px] text-black/80">
                    <div className="border-b border-black/10 pb-1">
                      {item.delivery}
                    </div>

                    <div className="border-b border-black/10 py-1">
                      {item.rating} Değerlendirme
                    </div>

                    <div className="pt-1">
                      👁 {item.views}
                    </div>
                  </div>

                  <div className="mt-auto pt-2 flex items-baseline gap-2">
                    <div className="leading-none">
                      <span className="text-2xl font-extrabold text-black">{item.price}</span>
                      <span className="ml-1 text-sm font-semibold text-black/70">₺</span>
                    </div>

                    <span className="text-[10px] font-medium leading-none text-black/60">
                      İlan Ücreti
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

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
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-neutral-800">{item.title}</h4>
                            <p className="mt-1 text-sm text-orange-600">{item.price} TL</p>
                          </div>

                          <button
                            onClick={() => setCartItems((prev) => prev.filter((x) => x.id !== item.id))}
                            className="text-sm font-medium text-red-500 hover:underline"
                          >
                            Sil
                          </button>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() =>
                              setCartItems((prev) =>
                                prev
                                  .map((x) =>
                                    x.id === item.id ? { ...x, quantity: x.quantity - 1 } : x
                                  )
                                  .filter((x) => x.quantity > 0)
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300"
                          >
                            -
                          </button>
                          <span className="min-w-[28px] text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              setCartItems((prev) =>
                                prev.map((x) =>
                                  x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
                                )
                              )
                            }
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
                    <span>
                      {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} TL
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-lg font-bold text-neutral-900">
                    <span>Toplam</span>
                    <span>
                      {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} TL
                    </span>
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