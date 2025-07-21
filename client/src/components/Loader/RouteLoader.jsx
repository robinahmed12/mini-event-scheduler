import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";


const RouteLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Simulate loading delay, replace with real fetch logic if any
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay (adjust as needed)

    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <Loader /> : children;
};

export default RouteLoader;
