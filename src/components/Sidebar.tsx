import { useState } from "react";
import { AiOutlineExpand } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { FaHeart, FaPlus, FaSearch } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import { TbPinnedFilled } from "react-icons/tb";
import { data } from "../data";

const Sidebar = ({
  setCurrentView,
}: {
  setCurrentView: (view: "home" | "liked" | "artist") => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchClicked = () => setSearchClicked(!searchClicked);

  let count = 0;

  data.forEach((song) => {
    if (song.like === true) {
      count++;
    }
  });

  if (!isMenuOpen) {
    return (
      <div className="w-[7%] h-[90%] flex flex-col justify-top items-center bg-[#121212]  rounded-lg mx-2">
        <HiLibrary
          className="mt-3 hover:bg-[#3e3e3e] transition duration-3s ease-in rounded-full p-1 h-[50px] w-auto"
          onClick={handleMenuOpen}
        />
        <CiCirclePlus className="my-2 bg-[#1e1e1e] rounded-full hover:bg-[#3e3e3e] transition duration-3s ease-in h-[50px] w-auto" />
        <div className="hover:bg-[#3e3e3e] rounded-lg px-1.5 py-1.5 my-2  transition duration-3s ease-in">
          <FaHeart
            className="bg-gradient-to-br from-blue-400 to-green-600 p-3 h-[50px] w-auto rounded-lg"
            onClick={() => setCurrentView("liked")}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[35%] h-[90%] bg-[#121212] rounded-lg mx-2">
        <div className="flex justify-between items-center mx-4 mt-2">
          <div className="flex items-center justify-between">
            <HiLibrary
              className="mt-3 hover:bg-[#3e3e3e] transition duration-3s ease-in rounded-full p-1 h-[40px] w-auto"
              onClick={handleMenuOpen}
            />
            <span className="font-bold ml-2">Your Library</span>
          </div>
          <div className="flex items-center justify-around">
            <button className="flex items-center justify-between bg-[#1f1f1f] mx-2 rounded-full py-2 px-4 hover:bg-[#3e3e3e]">
              <FaPlus className="mr-2" />
              <span className="text-[15px] font-bold">Create</span>
            </button>
            <AiOutlineExpand className="h-[30px] w-auto" />
          </div>
        </div>

        <div className="flex mx-4 my-2 space-x-4">
          <button className="font-bold rounded-full bg-[#1f1f1f] px-3 py-1 hover:bg-[#3e3e3e]">
            Playlist
          </button>
          <button className="font-bold rounded-full bg-[#1f1f1f] px-3 py-1 hover:bg-[#3e3e3e]">
            Artist
          </button>
        </div>

        <div className="flex justify-between items-center mx-4 my-2">
          <div className="flex justify-start items-center my-2">
            <FaSearch
              onClick={handleSearchClicked}
              className="hover:bg-[#3a3a3a] h-[30px] w-auto rounded-full px-2 py-2 mr-2"
            />
            {searchClicked && (
              <input
                type="text"
                placeholder="Search in your library"
                className="bg-[#1f1f1f] focus:outline-none rounded-full px-3 py-1 mr-4"
              />
            )}
          </div>
          <div className="flex items-center text-[#7a7a7a] hover:text-[#aaaaaa]">
            <span className="text-[14px] font-semibold mr-2">Recents</span>
            <IoMenu />
          </div>
        </div>

        <div className="flex justify-start items-center mx-4 hover:bg-[#3a3a3a] px-4 py-2 rounded-lg cursor-pointer">
          <FaHeart className="h-[40px] bg-gradient-to-br from-blue-400 to-green-600 rounded-lg p-3 w-auto mr-3" />
          <div className="flex flex-col ">
            Liked Songs
            <div className="flex text-[14px] items-center">
              <TbPinnedFilled className="text-green-500" />
              <span className="text-[#7a7a7a] mx-2 font-semibold">
                Playlist
              </span>
              <span className="text-[#7a7a7a] mx-2 font-semibold">
                {count} songs
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
