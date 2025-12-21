import MainSection from "../components/MainSection";
import SectionDivider from "../components/SectionDivider";
import WhoWeAreSection from "../components/WhoSection";
import OurValuesSection from "../components/OurValuesSection";

export default function Home() {
  return (
    <>
      <MainSection />
      <SectionDivider direction="down" />
      <WhoWeAreSection />
      <SectionDivider direction="up" />
      <OurValuesSection />
    </>
  );
}
