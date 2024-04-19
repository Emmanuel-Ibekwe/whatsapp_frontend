export default function UnderlineInput({ name, onSetName }) {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => onSetName(e.target.value)}
        className="w-full bg-transparent border-b border-green_1 dark:text-dark_text_1 outline-none pl-1"
      />
    </div>
  );
}
