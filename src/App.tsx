import { useState } from "react";
import Artist from "./components/Artist";
import MainPage from "./components/MainPage";
import Searchbar from "./components/Searchbar";
import Sidebar from "./components/Sidebar";
import LikedPage from "./components/LikedPage";

const App = () => {
  const [artistClicked, setArtistClicked] = useState<{
    artist: string;
    artistCover: string;
  } | null>(null);

  const [currentView, setCurrentView] = useState<"home" | "artist" | "liked">("home");

  const resetArtistClicked = () => {
    setArtistClicked(null);
    setCurrentView("home");
  };

  const handleArtistClick = (artistData: { artist: string; artistCover: string }) => {
    setArtistClicked(artistData);
    setCurrentView("artist");
  };

  return (
    <div className="h-screen justify-between items-center bg-black text-white">
      <Searchbar resetArtistClicked={resetArtistClicked} />
      <div className="h-[90%] flex justify-around">
        <Sidebar setCurrentView={setCurrentView} />
        <MainPage setArtistClicked={handleArtistClick} />

        {currentView === "artist" && artistClicked && (
          <Artist artistName={artistClicked.artist} artistSrc={artistClicked.artistCover} />
        )}

        {currentView === "liked" && <LikedPage />}
      </div>
    </div>
  );
};

export default App;
