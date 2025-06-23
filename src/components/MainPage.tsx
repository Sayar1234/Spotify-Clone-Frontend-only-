import PlayCard from "./mainPageComponents/PlayCard";
import SongCard from "./mainPageComponents/SongCard";
import { data } from "../data";
import { useAudioStore } from "../store/AudioStore";
import AudioPlayer from "./AudioPlayer";

interface ArtistProps {
  artist: string;
  artistCover: string;
}

interface ArtistStatus {
  setArtistClicked: (artistData: ArtistProps) => void;
}

const MainPage = ({ setArtistClicked }: ArtistStatus) => {
  const { setIsPlaying, currentIndex, setCurrentIndex } =
    useAudioStore();
  const currentSong = data[currentIndex];

  const handlePlaySong = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    console.log(`Song changed. ${index} song playing`);
  };

  const uniqueArtists = Array.from(
    new Map(data.map((song) => [song.artist, song])).values()
  ).sort((a, b) => a.artist.localeCompare(b.artist));

  return (
    <div className="w-screen h-[90%] rounded-lg bg-gradient-to-b from-[#09006b] to-black flex flex-col overflow-hidden mr-4">
      <div className="flex-1 overflow-y-scroll scrollbar-hide p-4 space-y-6">
        <div className="w-auto flex flex-wrap">
          {uniqueArtists.map((song) => (
            <PlayCard
              key={song.id}
              artistCover={song.artistCover}
              artist={song.artist}
              onClick={() =>
                setArtistClicked({
                  artist: song.artist,
                  artistCover: song.artistCover,
                })
              }
            />
          ))}
        </div>
        <div>
          <span className="mx-4 font-semibold text-[15px] text-[#7a7a7a] flex flex-col">
            Made for{" "}
            <span className=" font-bold text-[50px] text-white">You</span>
          </span>
          <div className="flex overflow-x-auto scrollbar-hide gap-2">
            {data.slice(5, 10).map((song) => (
              <SongCard
                key={song.id}
                cover={song.cover}
                title={song.title}
                artist={song.artist}
                onClick={() => handlePlaySong(song.id - 1)}
                liked={song.like}
              />
            ))}
          </div>
        </div>

        <div>
          <span className=" mx-4 text-[50px] font-bold text-white">
            Discover
          </span>
          <div className="flex overflow-x-auto scrollbar-hide gap-2">
            {data.slice(0, 17).map((song) => (
              <SongCard
                key={song.id}
                cover={song.cover}
                title={song.title}
                artist={song.artist}
                onClick={() => handlePlaySong(song.id - 1)}
                liked={song.like}
              />
            ))}
          </div>
        </div>
        <div>
          <span className=" mx-4 text-[50px] font-bold text-white">
            Recently Played
          </span>
          <div className="flex overflow-x-auto scrollbar-hide gap-2">
            {data.slice(4, 16).map((song) => (
              <SongCard
                key={song.id}
                cover={song.cover}
                title={song.title}
                artist={song.artist}
                onClick={() => handlePlaySong(song.id - 1)}
                liked={song.like}
              />
            ))}
          </div>
        </div>
        <div>
          <span className=" mx-4 text-[50px] font-bold text-white">
            Trending
          </span>
          <div className="flex overflow-x-auto scrollbar-hide gap-2">
            {data.slice(7, 15).map((song) => (
              <SongCard
                key={song.id}
                cover={song.cover}
                title={song.title}
                artist={song.artist}
                onClick={() => handlePlaySong(song.id - 1)}
                liked={song.like}
              />
            ))}
          </div>
        </div>
      </div>
      <div>{currentSong && <AudioPlayer audioSrc={currentSong.src} />}</div>
    </div>
  );
};

export default MainPage;
