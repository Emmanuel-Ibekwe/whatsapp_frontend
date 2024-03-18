import { AttachmentIcon } from "../../../../svg";
import Menu from "./menu/Menu";

export default function Attachments({
  showAttachments,
  onSetShowAttachments,
  onSetShowPicker
}) {
  return (
    <li className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => {
          onSetShowPicker(false);
          onSetShowAttachments(prev => !prev);
        }}
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* Menu */}
      {showAttachments && <Menu />}
    </li>
  );
}
