import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBell, FaHome, FaSearch, FaUserFriends } from "react-icons/fa";
import { IoBrowsersOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { data } from "../data";
import { useAudioStore } from "../store/AudioStore";
import { LuAudioLines } from "react-icons/lu";

interface SearchBarProps {
  resetArtistClicked: () => void;
}

const Searchbar = ({ resetArtistClicked }: SearchBarProps) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const handleDropDown = () => setIsDropDown(!isDropDown);

  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");

  const handleSearchItem = (e: HTMLInputElement) => {
    setSearchItem(e.value.toLowerCase());
  };

  const newData = data.filter((song) =>
    song.title.toLowerCase().includes(searchItem)
  );

  const { setCurrentIndex, setIsPlaying, currentIndex } =
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

  return (
    <div className="flex items-center justify-between mx-4 w-[95%]">
      <div className="flex">
        <BsThreeDots
          onClick={handleDropDown}
          className="hover:bg-[#1f1f1f] transition duration-1s ease-in-out rounded-full p-2 h-[40px] w-auto"
        />
        {isDropDown && (
          <ul className="absolute top-20 left-10 w-[15%] bg-[#1f1f1f] rounded-lg px-2 py-1 text-[12px]">
            <li className="flex justify-between items-center my-2">
              File
              <MdKeyboardArrowRight size="20px" />
            </li>
            <li className="flex justify-between items-center my-2">
              Edit
              <MdKeyboardArrowRight size="20px" />
            </li>
            <li className="flex justify-between items-center my-2">
              View
              <MdKeyboardArrowRight size="20px" />
            </li>
            <li className="flex justify-between items-center my-2">
              Help
              <MdKeyboardArrowRight size="20px" />
            </li>
          </ul>
        )}
        <MdKeyboardArrowLeft size="30px" />
        <MdKeyboardArrowRight size="30px" />
      </div>

      <div className="flex mt-4 p-2 mb-4">
        <FaHome
          className="p-2 h-[40px] w-auto bg-[#1f1f1f] rounded-full mx-2 hover:bg-[#3a3a3a]"
          onClick={resetArtistClicked}
        />
        <div className="flex bg-[#1f1f1f] rounded-full">
          <FaSearch className="p-2 h-[40px] w-auto mx-2" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="py-2 px-2 border-r border-[#7c7c7c] bg-[#1f1f1f] focus:outline-none"
            onChange={(e) => handleSearchItem(e.target)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setTimeout(() => setSearchFocus(false), 1000)}
          />
          <IoBrowsersOutline className="p-2 h-[40px] w-auto mx-2" />
        </div>
      </div>

      {searchFocus && (
        <div className="absolute top-20 left-1/4 max-h-[30%] min-h-auto w-[50%] bg-[#1c1c1c] overflow-y-auto scrollbar-hide rounded-lg">
          <ul className="text-white space-y-4 px-3 py-2">
            {newData.map((song) => (
              <li
                className="flex justify-between items-center hover:bg-[#3c3c3c] transition duration-300 ease-in px-4 py-2"
                onClick={() => clickedSong(song.id)}
              >
                <img
                  src={song.cover}
                  className="h-[30px] w-auto rounded-full"
                />
                {song.title}
                {currentSong.id === song.id && (
                  <LuAudioLines className="h-[30px] w-auto text-green-500" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button className="bg-white text-black rounded-full font-bold px-2 mx-2 py-2">
          Explore Premium
        </button>
        <FaBell size="30px" className="mx-2" />
        <FaUserFriends size="30px" className="mx-2" />
        <button className="bg-blue-600 text-black rounded-full font-bold px-2 mx-2 py-2">
          Account
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
