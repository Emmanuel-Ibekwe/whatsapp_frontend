import { useState } from "react";
import Header from "./Header";
import HandleAndSend from "./HandleAndSend";
import FileView from "./FileView";
import Input from "./Input";

export default function FilesPreview() {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* Container */}
      <div className="w-full flex-col">
        {/*  */}
        <Header activeIndex={activeIndex} />
        <FileView activeIndex={activeIndex} />
        <div className="w-full flex flex-col items-center">
          <Input message={message} onSetMessage={setMessage} />
          <HandleAndSend
            activeIndex={activeIndex}
            onSetActiveIndex={setActiveIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  );
}
