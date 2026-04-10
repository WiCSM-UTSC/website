import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import MainSection from "@/app/home/MainSection";
import SectionDivider from "@/components/SectionDivider";
import WhoSection from "@/app/home/WhoSection";
import OurValuesSection from "@/app/home/OurValuesSection";
import NextEventSection from "@/app/home/NextEventSection";
import SupportMissionSection from "@/app/home/SupportMissionSection";

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
