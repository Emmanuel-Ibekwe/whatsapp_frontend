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
  answerCall,
  stream,
  show,
  endCall,
  totalSecsInCall,
  setTotalSecsInCall
}) {
  const [showActions, setShowActions] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { receiveingCall, callEnded, name } = call;
  // console.log("receiveingCall from Call component: ", receiveingCall);
  // console.log("callAccepted from Call component: ", callAccepted);
  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg ${
          receiveingCall && !callAccepted ? "hidden" : ""
        }`}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        {/* Container */}
        <div>
          <div>
            {/* Header */}
            <CallHeader />
            {/* CallArea */}
            <CallArea
              name={name}
              totalSecsInCall={totalSecsInCall}
              setTotalSecsInCall={setTotalSecsInCall}
              callAccepted={callAccepted}
            />
            {/* Call Actions */}
            {showActions && <CallActions endCall={endCall} />}
          </div>
          {/* Video Streams */}
          <div>
            {/* User video */}
            {callAccepted && !callEnded && (
              <div>
                <video
                  ref={userVideo}
                  playsInline
                  autoPlay
                  controls
                  muted
                  className={`${toggle ? "smallVideoCall" : "largeVideoCall"} ${
                    toggle && showActions ? "moveVideoCall" : ""
                  }`}
                  onClick={() => setToggle(prev => !prev)}
                ></video>
              </div>
            )}
            {/* my video */}
            {stream && (
              <div onClick={() => setToggle(prev => !prev)}>
                <video
                  ref={myVideo}
                  playsInline
                  controls
                  muted
                  autoPlay
                  className={`${
                    !toggle ? "smallVideoCall" : "largeVideoCall"
                  }  ${showActions ? "moveVideoCall" : ""}`}
                ></video>
              </div>
            )}
          </div>
        </div>
      </div>
      {receiveingCall && !callAccepted && (
        <Ringing
          call={call}
          onSetCall={onSetCall}
          answerCall={answerCall}
          endCall={endCall}
        />
      )}
      {!callAccepted && show && (
        <audio src="../../../../audio/ringing.mp3" autoPlay></audio>
      )}
    </>
  );
}
