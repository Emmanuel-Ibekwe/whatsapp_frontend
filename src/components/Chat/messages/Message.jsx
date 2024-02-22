import moment from "moment";
import { TriangleIcon } from "../../../svg";
import { getMessageDate } from "../../../utils/date";

export default function Message({ message, me, setCornerTriangle, showDate }) {
  return (
    <div>
      {showDate && (
        // Date
        <div className="flex items-center justify-center my-5 ">
          <span className="bg-white dark:bg-dark_bg_2 text-dark_svg_2 px-3 py-2 rounded-lg">
            {getMessageDate(message.createdAt)}
          </span>
        </div>
      )}
      <div
        className={`w-full flex mt-2 space-x-3 ${me ? " justify-end " : ""}`}
      >
        <div>
          <div
            className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
              me ? "bg-green_3" : "dark:bg-dark_bg_2"
            }`}
          >
            <p className="text-left text-lg  pb-2">
              {message.message}
              <span className="relative text-sm text-dark_text_5 -bottom-[10px] pl-4">
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
      </div>
    </div>
  );
}
