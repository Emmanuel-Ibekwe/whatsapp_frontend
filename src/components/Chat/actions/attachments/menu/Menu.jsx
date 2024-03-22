import {
  PollIcon,
  ContactIcon,
  CameraIcon,
  StickerIcon
} from "../../../../../svg";
import PhotoAttachment from "./PhotoAttachment";
import DocumentAttachment from "./DocumentAttachment";

export default function Menu() {
  return (
    <ul className="absolute bottom-12 openEmojiAnimation">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full bg-[#0eabf4]">
          <ContactIcon />
        </button>
      </li>
      <DocumentAttachment />
      <li>
        <button type="button" className="rounded-full bg-[#d3396d]">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
      <PhotoAttachment />
    </ul>
  );
}
