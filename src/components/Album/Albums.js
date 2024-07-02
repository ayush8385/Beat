import { useNavigate } from "react-router-dom";
import {PropTypes} from "prop-types";

const Albums = ({type,albums}) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        marginTop: 20,
        overflow: "scroll",
        scrollbarWidth: "none",
        padding: "0px 20px",
        boxSizing: "border-box",
      }}
    >
      {albums?.map((album, index) => {
        return (
          <div
            onClick={() => navigate(`/${type}/${album.id}`)}
            key={index}
            style={{ margin: "0px 16px" }}
          >
            <img
              width={120}
              height={120}
              style={{ borderRadius: 12 }}
              src={album.images[0].url}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Albums;

Albums.propType = {
  albums: PropTypes.arrayOf(Object),
}