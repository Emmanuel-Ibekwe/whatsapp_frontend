import moment from "moment";
import { TriangleIcon } from "../../../svg";
import { getMessageDate } from "../../../utils/date";

export default function Message({
  message,
  me,
  setCornerTriangle,
  showDate,
  showSenderPicture
}) {
  return (
    <div>
      {showDate && (
        // Date
        <div className="flex items-center justify-center my-5 ">
          <span className="bg-white dark:bg-dark_bg_2 text-dark_svg_2 px-3 py-2 rounded-lg text-sm">
            {getMessageDate(message.createdAt)}
          </span>
        </div>
      )}
      <div
        className={`w-full flex mt-2 space-x-2 ${me ? " justify-end " : ""} ${
          message.conversation.isGroup && me
            ? "-mr-5"
            : message.conversation.isGroup && !me
            ? "-ml-5"
            : ""
        }`}
      >
        {message.conversation.isGroup && showSenderPicture && !me && (
          <div>
            <img
              src={message.sender.picture}
              alt=""
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
        <div>
          <div
            className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
              me ? "bg-green_3" : "dark:bg-dark_bg_2"
            } ${
              message.conversation.isGroup && !showSenderPicture && !me
                ? "ml-10"
                : message.conversation.isGroup && !showSenderPicture && me
                ? "mr-10"
                : ""
            }`}
          >
            <p className="text-left text-sm  ">
              {message.message}
              <span className="relative text-xs text-dark_text_5 -bottom-[5px] pl-2">
                {moment(message.createdAt).format("LT")}
              </span>
            </p>
            {setCornerTriangle && (
              <span>
                <TriangleIcon
                  className={` rotate-[60deg] absolute top-[-5px] ${
                    me
                      ? "-right-1.5 fill-green_3"
                      : "-left-1.5 dark:fill-dark_bg_2 fill-white"
                  }`}
                />
              </span>
            )}
          </div>
        </div>
        {message.conversation.isGroup && showSenderPicture && me && (
          <div>
            <img
              src={message.sender.picture}
              alt=""
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
