import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Community from "./components/Community";
import ContentCollab from "./components/ContentCollab";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function PublicSite() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <About />
      <Community />
      <ContentCollab />
      <Testimonials />
      <Footer />
    </div>
  );
}
