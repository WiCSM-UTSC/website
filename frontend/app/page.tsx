import MainSection from "../components/MainSection";
import SectionDivider from "../components/SectionDivider";
import WhoWeAreSection from "../components/WhoSection";
import OurValuesSection from "../components/OurValuesSection";
import NextEventSection from "../components/NextEventSection";
import SupportMissionSection from "../components/SupportMissionSection";

export default function Home() {
  return (
    <>
      <MainSection />
      <WhoWeAreSection />
      <SectionDivider direction="up" />
      <OurValuesSection />
      <SectionDivider direction="down" />
      <NextEventSection />
      <SupportMissionSection />
    </>
  );
}
