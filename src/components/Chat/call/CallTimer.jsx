import { useEffect } from "react";

export default function CallTimer({
  totalSecsInCall,
  setTotalSecsInCall,
  callAccepted
}) {
  useEffect(() => {
    let interval = null;
    if (callAccepted) {
      interval = setInterval(() => {
        setTotalSecsInCall(seconds => seconds + 1);
      }, 1000);
    } else if (!callAccepted && totalSecsInCall !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [callAccepted, totalSecsInCall, setTotalSecsInCall]);
  return (
    <div
      classname={`text-dark_text_2 ${totalSecsInCall > 0 ? "block" : "hidden"}`}
    >
      <span>
        {parseInt(totalSecsInCall / 3600).toString().length < 2
          ? "0" + parseInt(totalSecsInCall / 3600)
          : parseInt(totalSecsInCall / 3600)}
      </span>
      <span>:</span>
      <span>
        {parseInt((totalSecsInCall % 3600) / 60).toString().length < 2
          ? "0" + parseInt((totalSecsInCall % 3600) / 60)
          : parseInt((totalSecsInCall % 3600) / 60)}
      </span>
      <span>:</span>
      <span>
        {parseInt(totalSecsInCall % 60).toString().length < 2
          ? "0" + parseInt(totalSecsInCall % 60)
          : parseInt(totalSecsInCall % 60)}
      </span>
    </div>
  );
}
