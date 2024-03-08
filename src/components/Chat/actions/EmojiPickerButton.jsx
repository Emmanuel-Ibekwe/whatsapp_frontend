import { useState, useEffect } from "react";
import { EmojiIcon } from "../../../svg";
import EmojiPicker from "emoji-picker-react";

export default function EmojiPickerButton({
  textRef,
  onSetMessage,
  message,
  showPicker,
  onSetShowPicker,
  onSetShowAttachments
}) {
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    onSetMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };

  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() => {
          onSetShowAttachments(false);
          onSetShowPicker(prev => !prev);
        }}
      >
        <EmojiIcon
          className={`${
            showPicker ? "dark:fill-dark_svg_2" : "dark:fill-dark_svg_1"
          }`}
        />
      </button>
      {showPicker && (
        <div>
          {/* Modal */}
          <div
            className="absolute bottom-[60px] w-full h-screen"
            onClick={() => onSetShowPicker(false)}
          ></div>
          {/* EmojiPicker */}
          <div className="openEmojiAnimation absolute bottom-[70px] left-[50px] w-[375px]">
            <EmojiPicker onEmojiClick={handleEmoji} theme="dark" />
          </div>
        </div>
      )}
    </li>
  );
}
