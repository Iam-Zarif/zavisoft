import { colors } from "@/src/lib/colors";

const HeroStatus = () => {
  return (
    <h1 className="uppercase  font-bold text-center whitespace-nowrap leading-[0.9] text-[clamp(3rem,14vw,14rem)]">
      <span style={{ color: colors.primary }}>Do it</span>{" "}
      <span style={{ color: colors.secondary }}>right</span>
    </h1>
  );
};

export default HeroStatus;
