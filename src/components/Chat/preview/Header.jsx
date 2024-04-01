import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../../svg";
import { clearFiles } from "../../../store/chatSlice";

export default function Header({ activeIndex }) {
  const dispatch = useDispatch();
  const { files } = useSelector(state => state.chat);
  const clearFilesHandler = () => {
    dispatch(clearFiles());
  };

  return (
    <div className="w-full pl-4">
      <div className="w-full flex items-center justify-between ">
        <div
          className="cursor-pointer flex w-[5%] z-20"
          onClick={() => clearFilesHandler()}
        >
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        {/* File name */}
        <h1 className="dark:text-dark_text_1 text-[15px] text-center w-[95%] mx-auto ml-[-5%]">
          {files[activeIndex]?.file?.name}
        </h1>
      </div>
    </div>
  );
}
