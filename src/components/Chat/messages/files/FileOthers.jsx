import { DownloadIcon } from "../../../../svg";

export default function FileOthers({ type, file }) {
  return (
    <div className="bg-green_4 p-2 flex justify-between w-[332px] rounded-lg">
      <div className="flex justify-between gap-x-8 w-full ">
        {/* file info */}
        <div className="flex items-center gap-2">
          <img
            src={`../../../../images/file/${type}.png`}
            className="w-8 object-contain"
          />
          <div className="flex flex-col gap-1">
            <h1 className="">{file.original_filename}</h1>
            <span className="text-[0.6875rem] text-left text-[#FFFFFF99]">
              {type} . {(file.bytes / (1024 * 1024)).toFixed(2)}MB
            </span>
          </div>
        </div>
        {/* Download button */}
        <a href={file.secure_url} target="_blank" download>
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
}
