import { create } from "zustand";
import { data } from "../data";

interface playListProps {
  id: number;
  title: string;
  artist: string;
  cover: string;
  artistCover: string;
  src: string;
}

interface audioStoreProps {
  currentIndex: number;
  playlist: playListProps[];
  isPlaying: boolean;
  setPlaylist: (songs: playListProps[]) => void;
  setCurrentIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const useAudioStore = create<audioStoreProps>((set, get) => ({
  currentIndex: 0,
  playlist: data,
  isPlaying: false,
  setPlaylist: (songs) => set({ playlist: songs }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  nextTrack: () => {
    const { currentIndex, playlist } = get();
    const nextIndex = (currentIndex + 1) % playlist.length;
    set({ currentIndex: nextIndex });
  },

  prevTrack: () => {
    const { currentIndex, playlist } = get();
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    set({ currentIndex: prevIndex });
  },
}));
