import { FaHeart } from "react-icons/fa";
import { data } from "../data";
import { useAudioStore } from "../store/AudioStore";
import { LuAudioLines } from "react-icons/lu";

const LikedPage = () => {
  const { setCurrentIndex, setIsPlaying, isPlaying, currentIndex } =
    useAudioStore();
  let count = 0;

  data.forEach((song) => {
    if (song.like === true) {
      count++;
    }
  });

  const currentSong = data[currentIndex];

  const handlePlaySong = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    console.log(`Song changed. ${index} song playing`);
  };

  const clickedSong = (songId: number) => {
    handlePlaySong(songId - 1);
  };

  let count1 = 1;

  return (
    <div className="w-[60%] h-[90%] rounded-lg bg-gradient-to-b from-[#09006b] to-black flex flex-col overflow-hidden mx-4">
      <div className="flex justify-start items-center min-h-[50%] max-h-[50%] p-[2rem] mx-2">
        <div className="m-10 px-10 py-10 bg-gradient-to-br from-blue-400 to-green-600 rounded-lg">
          <FaHeart className="text-white h-[30px] w-auto" />
        </div>
        <div className="flex flex-col ml-4">
          <h4 className="mb-4">Playlist</h4>
          <h1 className="text-[30px] font-bold">Liked Songs</h1>
          <h4 className="mt-4">{count} songs</h4>
        </div>
      </div>

      <div className="overflow-auto scrollbar-hide bg-[#1c1c1c] mx-4 px-4 py-6 rounded-lg">
        <table className="m-4 w-[90%] h-auto">
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
              .filter((song) => song.like == true)
              .map((song) => (
                <tr
                  key={song.id}
                  onClick={() => clickedSong(song.id)}
                  className="text-center hover:bg-[#3c3c3c] transition duration-300"
                >
                  <td>{count1++}</td>
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
    </div>
  );
};

export default LikedPage;
