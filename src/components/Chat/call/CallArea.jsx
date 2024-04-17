import CallTimer from "./CallTimer";

export default function CallArea({
  name,
  totalSecsInCall,
  setTotalSecsInCall,
  callAccepted
}) {
  return (
    <div className="absolute top-12 w-full p-1 z-40">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-white text-lg">
            <b>{name}</b>
          </h1>
          {totalSecsInCall === 0 && (
            <span className="text-dark_text_1">Ringing...</span>
          )}
          <CallTimer
            totalSecsInCall={totalSecsInCall}
            setTotalSecsInCall={setTotalSecsInCall}
            callAccepted={callAccepted}
          />
        </div>
      </div>
    </div>
  );
}
