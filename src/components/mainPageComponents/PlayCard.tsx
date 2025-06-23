interface PlayCardProps {
  key: number;
  artist: string;
  artistCover: string;
  onClick: () => void;
}

const PlayCard: React.FC<PlayCardProps> = ({
  artist,
  artistCover,
  onClick,
}) => {
  return (
    <div
      className="flex rounded-lg w-[18rem] h-[90px] bg-[#1f1f1f] pr-2 m-3 items-center hover:bg-[#3a3a3a] transition duration-1s ease-in-out"
      onClick={onClick}
    >
      <img
        src={artistCover}
        alt={artist}
        className="rounded-lg h-[100%] w-auto"
      />
      <span className="ml-2 text-[20px]">{artist}</span>
    </div>
  );
};

export default PlayCard;
