import { useEffect, useState } from "react"
import { API_CONSTANTS } from "../constants";
import useFetchAccessToken from "./useFetchAccessToken";

const useFetchDevices = () => {
    const [devices, setDevices] = useState();
    const {accessToken} = useFetchAccessToken();
    const fetchDevices = () => {
        fetch(API_CONSTANTS.GET_DEVICES,{
            method:"GET",
            headers:{
                Authorization: "Bearer "+accessToken,
            }
        })
        .then(response => response.json()).then(data=>console.log(data));
    }
    useEffect(()=>{
        fetchDevices();
    },[])
    return {devices}
}
export default useFetchDevices;