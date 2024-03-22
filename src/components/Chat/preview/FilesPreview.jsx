import React from "react";
import Header from "./Header";
import HandleAndSend from "./HandleAndSend";
import FileView from "./FileView";
import Input from "./Input";

export default function FilesPreview() {
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* Container */}
      <div className="w-full flex-col">
        {/*  */}
        <Header />
        <FileView />
        <div className="w-full flex flex-col items-center">
          <Input />
          <HandleAndSend />
        </div>
      </div>
    </div>
  );
}
