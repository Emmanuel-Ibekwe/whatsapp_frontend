import { useRef } from "react";
import { useDispatch } from "react-redux";
import { PhotoIcon } from "../../../../../svg";
import { addFiles } from "../../../../../store/chatSlice";
import { getFileType } from "../../../../../utils/file";

function PhotoAttachment() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const imageHandler = e => {
    let files = Array.from(e.target.files);
    files.forEach(file => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "image/webm"
      ) {
        files = files.filter(item => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        files = files.filter(item => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          dispatch(
            addFiles({
              file: file,
              fileData: e.target.result,
              type: getFileType(file.type)
            })
          );
        };
      }
    });
  };

  return (
    <li>
      <button
        onClick={() => inputRef.current.click()}
        type="button"
        className="bg-[#BF59CF] rounded-full"
      >
        <PhotoIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg,image/webm"
        onChange={imageHandler}
      />
    </li>
  );
}

export default PhotoAttachment;
