import { useContext } from "react";
import "./BgOverlay.css";
import { PlayerContext } from "../contexts/PlayerContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const BgOverlay = () => {
  const { overlayBgUrl } = useContext(PlayerContext);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <TransitionGroup>
        {overlayBgUrl ? (
          <CSSTransition key={overlayBgUrl} timeout={2000} classNames="fade">
            <img
              width={"100%"}
              height={"100%"}
              src={overlayBgUrl}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </CSSTransition>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></div>
        )}
      </TransitionGroup>

      <div
        className="overlay"
        style={{
          backgroundColor: overlayBgUrl
            ? "rgba(0, 0, 0, 0)"
            : "rgba(0, 0, 0, 0.5)",
        }}
      />
    </div>
  );
};

export default BgOverlay;
