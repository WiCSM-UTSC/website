export default function SectionDivider({ direction = "down" }) {
    const gradient =
      direction === "down"
        ? "bg-gradient-to-b from-[#9B93E8] via-[#D8E9FF] to-white"
        : "bg-gradient-to-b from-white via-[#D8E9FF] to-[#9B93E8]";
  
    return (
      <div className={`w-full h-[380px] ${gradient}`} />
    );
  }
  