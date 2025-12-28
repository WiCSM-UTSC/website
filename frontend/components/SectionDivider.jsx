export default function SectionDivider({ direction = "down" }) {
  const gradientStyle =
    direction === "down"
      ? "linear-gradient(to bottom, #9B93E8, #A8A5F0, #B8C5FF, #D8E9FF, #FFFFFF)"
      : "linear-gradient(to bottom, #FFFFFF, #D8E9FF, #B8C5FF, #A8A5F0, #9B93E8)";

  return (
    <div className="w-full h-[300px]" style={{ background: gradientStyle }} />
  );
}
