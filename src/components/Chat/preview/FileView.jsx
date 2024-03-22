import { useSelector } from "react-redux";

export default function FileView() {
  const { files } = useSelector(state => state.chat);

  return (
    <div className="w-full max-w-[60%] mx-auto">
      <div className="flex justify-center items-center">
        <img
          src={files[0].fileData}
          alt=""
          className="max-w-[80%] object-contain hview "
        />
      </div>
    </div>
  );
}
