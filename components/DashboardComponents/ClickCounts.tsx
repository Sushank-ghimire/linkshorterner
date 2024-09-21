"use client";
import { useEffect, useState } from "react";
const ClickCounts = () => {
  const [clickCounts, setClickCounts] = useState(0);

  useEffect(() => {
    const clickCounter = async () => {
      try {
        const res = await fetch("/api/clicksdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resData = await res.json();
        if (resData.click) setClickCounts(resData.click);
      } catch (_) {}
    };
    clickCounter();
  }, []);

  return <>{clickCounts}</>;
};

export default ClickCounts;
