import { useMemo, useState } from "react";
import { PlayerContext } from "./PlayerContext";

const PlayerContextProvider = ({ children }) => {
  const [overlayBgUrl, setOverlayBgUrl] = useState(undefined);
  const [ isTrackPlaying, setIsTrackPlaying ] = useState(undefined);
  const value = useMemo(
    () => ({
      overlayBgUrl,
      setOverlayBgUrl,
      isTrackPlaying,
      setIsTrackPlaying,
    }),
    [overlayBgUrl, setOverlayBgUrl, isTrackPlaying, setIsTrackPlaying]
  );
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContextProvider;