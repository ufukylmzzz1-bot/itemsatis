import { Suspense } from "react";
import CategoryDetailPageClient from "./CategoryDetailPageClient";

export function generateStaticParams() {
  return [
    { slug: "netflix" },
    { slug: "windows" },
    { slug: "gemini" },
    { slug: "steam" },
    { slug: "epic" },
    { slug: "instagram" },
    { slug: "youtube" },
    { slug: "cs2" },
    { slug: "pubg-mobile" },
    { slug: "roblox" },
  ];
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CategoryDetailPageClient />
    </Suspense>
  );
}