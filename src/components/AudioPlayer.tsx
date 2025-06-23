import { useEffect, useRef, useState } from "react";
import { FaVolumeOff } from "react-icons/fa";
import { ImLoop, ImNext, ImPrevious } from "react-icons/im";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { LuAudioLines } from "react-icons/lu";
import { useAudioStore } from "../store/AudioStore";
import { FaVolumeHigh } from "react-icons/fa6";

interface AudioProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { isPlaying, setIsPlaying, currentIndex, nextTrack, prevTrack } =
    useAudioStore();
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((error) => console.log(error));
        console.log(`Audio ${currentIndex} playing now`);
      }
    }
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      console.log(`Audio ${currentIndex} Paused`);
    } else {
      audioRef.current.play();
      console.log(`Audio ${currentIndex} Playing`);
    }
    setIsPlaying(!isPlaying);
  };

  // const increaseVolume = () => {
  //   const newVolume = Math.min(volume + 0.05, 1);
  //   setVolume(newVolume);
  //   console.log("Volume Increased");
  // };
  // const decreaseVolume = () => {
  //   const newVolume = Math.max(volume - 0.05, 0);
  //   setVolume(newVolume);
  //   console.log("Volume Decreased");
  // };

  const muteUnmuteVolume = () => {
    let newVolume = 0.0;
    if (isMuted) {
      newVolume = 1.0;
      console.log("Volume Unmuted");
    } else {
      console.log("Volume Muted");
    }
    setVolume(newVolume);
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex justify-around items-center bottom-0 w-screen bg-black fixed left-0 h-[70px]">
      <div className="flex justify-center items-center">
        <audio
          ref={audioRef}
          src={audioSrc}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={nextTrack}
        />
        <ImPrevious className="h-[30px] w-auto mx-2" onClick={prevTrack} />
        {isPlaying && (
          <IoMdPause className="h-[30px] w-auto mx-2" onClick={togglePlay} />
        )}

        {!isPlaying && (
          <IoMdPlay className="h-[30px] w-auto mx-2" onClick={togglePlay} />
        )}

        <ImNext className="h-[30px] w-auto mx-2" onClick={nextTrack} />
        <ImLoop className="h-[30px] w-auto mx-2" />
      </div>
      <div>
        {isPlaying && (
          <LuAudioLines className="h-[40px] w-auto mx-2 text-green-600" />
        )}
      </div>
      <div className="flex justify-center items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-[100px]"
        />
        {!isMuted && (
          <FaVolumeHigh
            className="h-[30px] w-auto mx-2"
            onClick={muteUnmuteVolume}
          />
        )}

        {isMuted && (
          <FaVolumeOff
            className="h-[30px] w-auto mx-2"
            onClick={muteUnmuteVolume}
          />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
