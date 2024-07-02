import Recorder from "../assets/png/recorder.png"
import Music from "../assets/png/music.png";
import { useRef } from "react";
import "./Logo.css";
const Logo = () => {

  return (
    <div style={{ position: "relative" }}>
      <img className="recordAnimation" width={64} height={64} src={Recorder} />
      {/* <img
        style={{ position: "absolute", left: 18, top: 22}}
        className="musicAnimation"
        width={24}
        height={24}
        src={Music}
      /> */}
    </div>
  );
};
export default Logo;
