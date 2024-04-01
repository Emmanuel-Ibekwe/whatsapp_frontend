import { useEffect, useState } from "react";
import { CloseIcon, ValidIcon } from "../../../svg";

export default function Ringing({ call, onSetCall }) {
  const [timer, setTimer] = useState(0);
  const { receivingCall, callEnded } = call;
  // useEffect(() => {
  //   document.addEventListener("click", musicPlay);
  //   function musicPlay() {
  //     document.getElementById("playAudio").play();
  //     document.removeEventListener("click", musicPlay);
  //   }
  // }, []);

  let interval;
  const handlerTimer = () => {
    interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer < 5) {
      handlerTimer();
    } else {
      onSetCall({ ...call, receivingCall: false });
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
      {/* Container */}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/* Call infos */}
        <div className="flex items-center gap-x-2">
          <img
            src="https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full"
          />
          <div>
            <h1 className="dark:text-white">
              <b>Achraf Hajji</b>
            </h1>
            <span className="dark:text-dark_text_2">Whatsapp video</span>
          </div>
        </div>
        {/* Call actions */}
        <ul className="flex items-center gap-x-2">
          <li>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          <li>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500">
              <ValidIcon className="fill-white w-6 translate-y-[3px]" />
            </button>
          </li>
        </ul>
      </div>
      {/* Ringtone */}

      <audio autoplay loop id="playAudio">
        <source src="../../../../audio/ringtone.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}
