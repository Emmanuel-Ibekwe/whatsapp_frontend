export default function Input({ message, onSetMessage }) {
  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg">
      {/* message input */}
      <input
        type="text"
        placeholder="type a message"
        value={message}
        onChange={e => onSetMessage(e.target.value)}
        className="w-full bg-transparent h-11 pl-12 focus:outline-none border-none dark:text-dark_text_1"
      />
    </div>
  );
}
