import { useEffect, useState } from "react";
import { API_CONSTANTS } from "../constants";
import useFetchAccessToken from "./useFetchAccessToken";

const useFetchProfile = ({ fetchOnLoad = false }= {}) => {
  const [userProfileData, setUserProfile] = useState(false);
  const { accessToken } = useFetchAccessToken();
  const getUserProfile = () => {
    fetch(API_CONSTANTS.USER_PROFILE, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserProfile(data);
      });
  };
  useEffect(() => {
    if (fetchOnLoad) {
      getUserProfile();
    }
  }, [fetchOnLoad]);
  return { userProfileData };
};

export default useFetchProfile;