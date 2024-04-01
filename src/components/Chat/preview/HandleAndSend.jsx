import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import VideoThumbnail from "react-video-thumbnail";
import Add from "./Add";
import { SendIcon, CloseIcon } from "../../../svg";
import { uploadFiles } from "../../../utils/upload";
import {
  sendMessage,
  clearFiles,
  removeFileFromFiles
} from "../../../store/chatSlice";
import SocketContext from "../../../context/SocketContext";

export default function HandleAndSend({
  onSetActiveIndex,
  activeIndex,
  message
}) {
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { files, activeConversation } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.user);
  const { token } = user;
  const sendMessageHandler = async () => {
    setLoading(true);
    const uploaded_files = await uploadFiles(files);
    const values = {
      token,
      message,
      convo_id: activeConversation._id,
      files: uploaded_files.length > 0 ? uploaded_files : []
    };
    const newMsg = await dispatch(sendMessage(values));
    socket.emit("send message", newMsg.payload);
    setLoading(false);
    dispatch(clearFiles());
  };

  const handleRemoveFile = index => {
    dispatch(removeFileFromFiles(index));
    onSetActiveIndex(0);
  };
  return (
    <div className="relative w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2 ">
      <span></span>
      <div className="flex gap-x-2">
        {files.map((file, i) => (
          <div
            onClick={() => onSetActiveIndex(i)}
            key={i}
            className={`group relative w-14 h-14 border  mt-2 rounded-md overflow-hidden cursor-pointer ${
              activeIndex === i ? "border-[3px] border-green_1" : ""
            }`}
          >
            {file.type === "IMAGE" ? (
              <img
                src={file.fileData}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : file.type === "VIDEO" ? (
              <VideoThumbnail videoUrl={file.fileData} width={56} height={56} />
            ) : (
              <img
                src={`../../../../images/file/${file.type}.png`}
                alt=""
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
            <div
              onClick={() => handleRemoveFile(i)}
              className="invisible group-hover:visible dark:fill-dark_svg_1 absolute z-100 right-0 top-0 w-5 h-5"
            >
              <CloseIcon />
            </div>
          </div>
        ))}
        {/* Add another file */}
        <Add onSetActiveIndex={onSetActiveIndex} />
      </div>
      {/* Send button */}

      {loading ? (
        <div className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer">
          <ClipLoader color="#e9edef" size={25} />
        </div>
      ) : (
        <div
          className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => sendMessageHandler()}
        >
          <SendIcon className="fill-white" />
        </div>
      )}
    </div>
  );
}
