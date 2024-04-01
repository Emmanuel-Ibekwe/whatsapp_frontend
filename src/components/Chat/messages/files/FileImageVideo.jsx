export default function FileImageVideo({ url, type }) {
  return (
    <div className="!bg-white rounded-lg">
      {type === "IMAGE" ? (
        <img
          src={url}
          alt=""
          className="max-w-[330px] max-h-[330px] rounded-lg cursor-pointer"
        />
      ) : (
        <video
          src={url}
          controls
          className="max-w-[330px] max-h-[330px] rounded-lg cursor-pointer"
        />
      )}
    </div>
  );
}
