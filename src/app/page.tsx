import Hero from "@/components/landing/Hero";
import ExploreProduct from "@/components/landing/ExploreProduct";
import Footer from "@/components/landing/Footer";
import Navbar from "../components/landing/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <ExploreProduct />
      <Footer />
    </main>
  );
}
