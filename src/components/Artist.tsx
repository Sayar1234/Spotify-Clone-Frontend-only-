import { FaHeart } from "react-icons/fa";
import { data } from "../data";
import { useAudioStore } from "../store/AudioStore";
import AudioPlayer from "./AudioPlayer";
import { LuAudioLines } from "react-icons/lu";

interface Artist {
  artistSrc: string;
  artistName: string;
}

const Artist = ({ artistSrc, artistName }: Artist) => {
  const { setCurrentIndex, setIsPlaying, currentIndex, isPlaying } =
    useAudioStore();

  const currentSong = data[currentIndex];

  const handlePlaySong = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    console.log(`Song changed. ${index} song playing`);
  };

  const clickedSong = (songId: number) => {
    handlePlaySong(songId - 1);
  };

  let count = 1;

  return (
    <div className="w-[60%] h-[90%] rounded-lg bg-gradient-to-b from-[#09006b] to-black flex flex-col overflow-hidden mx-4">
      <div className="flex justify-start items-center min-h-[50%] max-h-[50%] p-[2rem] mx-2">
        <img src={artistSrc} alt={artistName} className="rounded-lg ml-4" />
        <div className="flex flex-col ml-4 text-[30px] relative top-8">
          <h1>{artistName}</h1>
        </div>
      </div>

      <div className="overflow-auto scrollbar-hide bg-[#1c1c1c] mx-4 px-4 py-6 rounded-lg">
        <table className="m-4 w-[95%] h-auto">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Liked</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((song) => song.artist == artistName)
              .map((song) => (
                <tr
                  key={song.id}
                  onClick={() => clickedSong(song.id)}
                  className="text-center hover:bg-[#3c3c3c] transition duration-300"
                >
                  <td>{count++}</td>
                  <td className="flex justify-center items-center">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="h-[30px] w-auto rounded-full m-4"
                    />
                  </td>
                  <td>{song.title}</td>
                  {song.like && (
                    <td className="flex justify-center items-center">
                      <FaHeart className="h-[20px] w-auto text-red-800" />
                    </td>
                  )}
                  {currentSong.id === song.id && isPlaying && (
                    <td>
                      <LuAudioLines className="h-[20px] w-auto mx-2 text-green-600" />
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>{currentSong && <AudioPlayer audioSrc={currentSong.src} />}</div>
    </div>
  );
};

export default Artist;
