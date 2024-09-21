"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UrlCounts = () => {
  const [urlCounts, setUrlCounts] = useState(0);
  useEffect(() => {
    const getShortedLinks = async () => {
      try {
        const res = await fetch("/api/getshortedlink/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const resData = await res.json();

        const countUrl = resData.urlCreated;

        setUrlCounts(countUrl);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message || "Error occured while shortning url.");
        } else {
          toast.error("Error occured while shortning url.");
        }
      }
    };
    getShortedLinks();
  }, []);

  return <>{urlCounts}</>;
};

export default UrlCounts;
