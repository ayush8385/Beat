import { msToMinutesAndSeconds } from "../../utils";

const Tracks = ({ type = "album", tracks, onPlayClick }= {}) => {
  return (
    <div
      style={{
        padding: "0px 40px",
        width: "100%",
        height: "100%",
        overflow: "scroll",
        scrollbarWidth: "none",
      }}
    >
      {tracks.map((track, index) => {
        if (type === "playlist") {
          track = track?.track;
        }
        return (
          <div
            key={index}
            onClick={() => onPlayClick(track?.id)}
            style={{
              marginBottom: 40,
              display: "flex",
              padding: "20px 30px",
              alignItems: "center",
              opacity: 0.8,
              justifyContent: "space-between",
            }}
            className="viewMoreBg"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <i
                style={{ fontSize: 28, color: "whitesmoke" }}
                class="fa fa-play"
                aria-hidden="true"
              />
              <div style={{ marginLeft: 20 }}>
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: 14,
                    fontFamily: "Oxygen",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {track?.name}
                </p>
                <div style={{ display: "flex" }}>
                  {track?.artists.map((item, ind) => {
                    return (
                      <p
                        key={ind}
                        style={{
                          padding: 0,
                          margin: 0,
                          fontSize: 10,
                          fontFamily: "Oxygen",
                          fontWeight: 700,
                          color: "white",
                          opacity: 0.8,
                        }}
                      >
                        {ind > 0 ? ", " : ""}
                        {item.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <p
              style={{
                padding: 0,
                margin: 0,
                fontSize: 14,
                fontFamily: "Oxygen",
                fontWeight: 700,
                color: "white",
              }}
            >
              {msToMinutesAndSeconds(track?.duration_ms)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Tracks;
