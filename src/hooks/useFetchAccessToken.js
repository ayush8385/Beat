import { useEffect, useState } from "react";
import {
  API_CONSTANTS,
  client_id,
  client_secret,
  redirect_uri,
} from "../constants";
import { useNavigate } from "react-router-dom";

const useFetchAccessToken = ({fetchOnLoad=false}={}) => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const navigate = useNavigate();

  const fetchAccessToken = (code) => {
    fetch(API_CONSTANTS.TOKEN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: encodeURI(redirect_uri),
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
      if (code && fetchOnLoad) {
        fetchAccessToken(code);
      } else {
        navigate("/login");
      }
    } else {
      setLoading(false);
    }
  }, [fetchOnLoad]);
  return { accessToken, loading };
};
export default useFetchAccessToken;
