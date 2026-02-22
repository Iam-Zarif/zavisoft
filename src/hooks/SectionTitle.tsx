interface SectionTitleProps {
  text: string;
  color: string;
}

const SectionTitle = ({ text, color }: SectionTitleProps) => {
  const lines = text.split("\n");

  return (
    <h2
      className="text-2xl lg:text-6xl font-semibold uppercase tracking-[-0.02em]"
      style={{ color }}
    >
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index !== lines.length - 1 && <br />}
        </span>
      ))}
    </h2>
  );
};

export default SectionTitle;
