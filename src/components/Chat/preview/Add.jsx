import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../../svg";
import { getFileType } from "../../../utils/file";
import { addFiles } from "../../../store/chatSlice";

export default function Add({ onSetActiveIndex }) {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { files } = useSelector(state => state.chat);

  const fileHandler = e => {
    let inputfiles = Array.from(e.target.files);
    inputfiles.forEach(file => {
      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !== "application/msword" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "application/zip" &&
        file.type !== "audio/mpeg" &&
        file.type !== "audio/wav" &&
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "image/webm"
      ) {
        inputfiles = inputfiles.filter(item => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        inputfiles = inputfiles.filter(item => item.name !== file.name);
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

    let index = files.length;
    onSetActiveIndex(index);
  };

  return (
    <>
      <div
        onClick={() => inputRef.current.click()}
        className="w-14 h-14 mt-2 border dark:border-white rounded-md flex items-center justify-center cursor-pointer"
      >
        <span className="rotate-45">
          <CloseIcon className="dark:fill-dark_svg_1" />
        </span>
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain,audio/mpeg,audio/wav,image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg,image/webm"
        onChange={fileHandler}
      />
    </>
  );
}
