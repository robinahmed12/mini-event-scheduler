import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://server-rosy-eta.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;