import Hero from "@/components/landing/Hero";
import ExploreProduct from "@/components/landing/ExploreProduct";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ExploreProduct />
      <Footer />
    </main>
  );
}
