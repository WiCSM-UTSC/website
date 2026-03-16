import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import MainSection from "../components/MainSection";
import SectionDivider from "../components/SectionDivider";
import WhoSection from "../components/WhoSection";
import OurValuesSection from "../components/OurValuesSection";
import NextEventSection from "../components/NextEventSection";
import SupportMissionSection from "../components/SupportMissionSection";

export default function Home() {
  return (
    <div className="min-h-screen pt-12">
      <Navbar />
    <main>
      <MainSection />
      <WhoSection />

      <SectionDivider direction="up" />

      <OurValuesSection />

      <SectionDivider direction="down" />

      <NextEventSection />
      <SupportMissionSection />
      </main>

      <Footer />
    </div>
  );
}
