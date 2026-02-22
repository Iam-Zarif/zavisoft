import { colors } from "../lib/colors";


export const PrimaryButton = ({ text }: { text: string }) => {

  return (
    <button
      className="h-10 lg:h-12 rounded-lg px-4 lg:px-6 text-xs lg:text-sm font-medium uppercase tracking-wide text-white"
      style={{ backgroundColor: colors.secondary }}
    >
      {text}
    </button>
  );
};
