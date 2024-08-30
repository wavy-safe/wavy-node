import Header from "./component/landing/Header";
import MainContent from "./component/landing/MainContent";
import Footer from './component/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
