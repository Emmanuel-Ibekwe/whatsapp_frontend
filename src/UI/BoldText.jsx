export default function BoldedText({ text, shouldBeBold }) {
  const textArray = text.split(RegExp(shouldBeBold, "ig"));
  const match = text.match(RegExp(shouldBeBold, "ig"));

  return (
    <span>
      {textArray.map((item, index) => (
        <>
          {item}
          {index !== textArray.length - 1 && match && <b>{match[index]}</b>}
        </>
      ))}
    </span>
  );
}
