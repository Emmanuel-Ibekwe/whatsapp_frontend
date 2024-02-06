import { useRef, useState } from "react";

function Picture({ readablePicture, onSetPicture, onSetReadablePicture }) {
  const [error, setError] = useState("");

  const inputRef = useRef();
  const handlePicture = e => {
    const pic = e.target.files[0];
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp"
    ) {
      setError(`${pic.name}'s format is not supported`);
      return;
    }
    if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large. Maximum 5mb.`);
      return;
    }

    setError("");
    onSetPicture(pic);

    const reader = new FileReader();
    reader.onload = e => {
      onSetReadablePicture(e.target.result);
    };
    reader.readAsDataURL(pic);
  };

  const handleRemovePic = () => {
    onSetPicture("");
    onSetReadablePicture("");
  };
  return (
    <div className="mt-8 dark:text-dark_text_1 space-y-1">
      <label htmlFor="" className="font-bold tracking-wide text-sm">
        Picture (Optional)
      </label>

      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="Profile Picture"
            className="w-20 h-20 object-cover rounded-full bg-white"
          />
          <div
            className="mt-2 w-20 dark:bg-dark_bg_3 rounded-md text-xs font-bold 
          flex items-center justify-center cursor-pointer"
            onClick={handleRemovePic}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold 
        flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload Picture
        </div>
      )}

      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp"
        onChange={handlePicture}
      />
      <div>
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
}

export default Picture;
