import type { Route } from "./+types/home";
import { AboutSection } from "../components/about-section";
import { HomeSection } from "../components/home-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WiCSM UTSC" },
    { name: "description", content: "Women in Computer Science and Mathematics at UTSC" },
  ];
}

export default function Home() {
  return (
    <main>
      <HomeSection />
      <AboutSection />
    </main>
  );
}
