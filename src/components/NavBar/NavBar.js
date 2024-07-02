import "./NavBar.css";
import Home from "../../assets/png/home-button.png";
import Heart from "../../assets/png/heart.png";
import User from "../../assets/png/user.png";
import { useNavigate } from "react-router-dom";
import useFetchAccessToken from "../../hooks/useFetchAccessToken";
const NavBar = () => {
  const navigate = useNavigate();
  useFetchAccessToken({fetchOnLoad:true});
  return (
    <div
      style={{
        width: "95%",
        height: "fit-content",
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20,
        alignItems: "center",
      }}
    >
      <img onClick={() => navigate('/')} className="menuBtnBg" src={Home} width={30} height={30} />
      <input
        type="text"
        placeholder="Search..."
        className="menuBtnBg searchBox"
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="menuBtnBg"
          style={{ marginRight: 20 }}
          src={Heart}
          width={30}
          height={30}
        />
        <img className="menuBtnBg" src={User} width={30} height={30} />
      </div>
    </div>
  );
};
export default NavBar;
