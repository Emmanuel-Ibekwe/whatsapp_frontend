export default function Input({ message, onSetMessage }) {
  const onChangeHandler = e => {
    onSetMessage(e.target.value);
  };
  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full rounded-lg pl-4"
        placeholder="type a message"
        onChange={onChangeHandler}
        value={message}
      />
    </div>
  );
}
