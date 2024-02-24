import { EmojiIcon } from "../../../svg";

export default function EmojiPickerButton() {
  return (
    <li>
      <button className="btn" type="button">
        <EmojiIcon className="dark:fill-dark_svg_1" />
      </button>
    </li>
  );
}
