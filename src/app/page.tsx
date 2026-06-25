import Navigation from "@/components/Navigation";
import HeroExpansion from "@/components/HeroExpansion";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroExpansion />

        <hr
          aria-hidden="true"
          className="mx-auto h-px max-w-6xl border-0 bg-gradient-to-r from-transparent via-border-dim to-transparent"
        />

        <TechStack />

        <hr
          aria-hidden="true"
          className="mx-auto h-px max-w-6xl border-0 bg-gradient-to-r from-transparent via-border-dim to-transparent"
        />

        <Experience />

        <hr
          aria-hidden="true"
          className="mx-auto h-px max-w-6xl border-0 bg-gradient-to-r from-transparent via-border-dim to-transparent"
        />

        <Projects />
      </main>
      <Footer />
    </>
  );
}
