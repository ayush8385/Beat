import { useEffect, useState } from "react";
import { API_CONSTANTS } from "../constants";
import { useNavigate } from "react-router-dom";

const useFetchAccessToken = () => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const navigate = useNavigate();

  const fetchAccessToken = () => {
    fetch(API_CONSTANTS.TOKEN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(process.env.REACT_APP_CLIENT_ID + ":" + process.env.REACT_APP_CLIENT_SECRET),
      },
      body: new URLSearchParams({
        code: localStorage.getItem("code"),
        redirect_uri: encodeURI(process.env.REACT_APP_REDIRECT_URI),
        grant_type: "authorization_code",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          setAccessToken(data.access_token);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/login");
      });
  };
  useEffect(() => {
    let code = null;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      if (code) {
        localStorage.setItem("code",code);
        fetchAccessToken();
      } else {
        navigate("/login");
      }
    } else {
      setLoading(false);
    }
  }, []);
  return { accessToken, loading };
};
export default useFetchAccessToken;
