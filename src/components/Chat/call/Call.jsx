import { useState } from "react";
import Ringing from "./Ringing";
import CallHeader from "./CallHeader";
import CallArea from "./CallArea";
import CallActions from "./CallActions";

export default function Call({
  call,
  onSetCall,
  callAccepted,
  userVideo,
  myVideo,
  stream
}) {
  const [showActions, setShowActions] = useState(false);
  const { receivingCall, callEnded } = call;
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg"
      onMouseOver={() => setShowActions(true)}
      onMouseOut={() => setShowActions(false)}
    >
      {/* Container */}
      <div>
        <div>
          {/* Header */}
          <CallHeader />
          {/* CallArea */}
          <CallArea name="Emmanuel Ibekwe" />
          {/* Call Actions */}
          {showActions && <CallActions />}
        </div>
        {/* Video Streams */}
        <div>
          {/* User video */}
          <div>
            <video
              ref={userVideo}
              playsInline
              muted
              autoplay
              className="largeVideoCall"
            ></video>
          </div>
          {/* my video */}
          <div>
            <video
              ref={myVideo}
              playsInline
              muted
              autoplay
              className={`smallVideoCall ${showActions ? "moveVideoCall" : ""}`}
            ></video>
          </div>
        </div>
      </div>

      {receivingCall && !callAccepted && (
        <Ringing call={call} onSetCall={onSetCall} />
      )}
    </div>
  );
}
