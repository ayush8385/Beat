import { createContext } from "react";

export const PlayerContext = createContext({
  overlayBgUrl: undefined,
  setOverlayBgUrl: () => {},
  isTrackPlaying: undefined,
  setIsTrackPlaying: () => {},
});
