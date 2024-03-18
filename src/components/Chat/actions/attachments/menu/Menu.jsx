import {
  PollIcon,
  ContactIcon,
  DocumentIcon,
  CameraIcon,
  StickerIcon,
  PhotoIcon
} from "../../../../../svg";

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
      <li>
        <button type="button" className="rounded-full bg-[#5f66cd]">
          <DocumentIcon />
        </button>
      </li>
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
      <li>
        <button type="button" className="rounded-full bg-[#bf59cf]">
          <PhotoIcon />
        </button>
      </li>
    </ul>
  );
}
