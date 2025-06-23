import type { MouseEventHandler } from "react";
import { FaHeart } from "react-icons/fa";

interface SongCardProps {
  key: number;
  cover: string;
  title: string;
  artist: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  liked: boolean;
}

const SongCard: React.FC<SongCardProps> = ({
  cover,
  title,
  artist,
  onClick,
  liked,
}) => {
  return (
    <div
      className="flex flex-col justify-center bg-[#1f1f1f] rounded-lg m-4 min-w-[200px] max-w-[200px] h-[240px] hover:bg-[#3a3a3a] transition duration-1s ease-in-out"
      onClick={onClick}
    >
      <img src={cover} alt={title} className="rounded-lg px-2 pb-2" />
      <div className="flex mx-2">
        <div>
          <h1 className="mx-2 text-[14px]">{title}</h1>
          <span className="mx-2 text-[12px] text-[#aaa]">{artist}</span>
        </div>

        {liked && <FaHeart className="h-[16px] text-red-800 mx-4" />}
      </div>
    </div>
  );
};

export default SongCard;
