"use client";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import NotFound from "@/components/NotFound";

const Page = () => {
  const [isLinkFound, setIsLinkFound] = useState(true);

  const { id } = useParams();

  const [color, setColor] = useState("#ffffff");

  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") setColor("#ffffff");
    else setColor("#000");
  }, [color, theme]);

  useEffect(() => {
    async function fetchLinkData() {
      try {
        const res = await fetch(`/api/getshortedlink?shorturl=${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const resData = await res.json();
        if (res.ok) {
          if (resData.error) {
            setIsLinkFound(false);
          }
          if (resData.longUrl) {
            window.location.href = resData.longUrl;
          }
        }
      } catch (_) {}
    }
    fetchLinkData();
  }, [id]);

  return isLinkFound ? (
    <main className="w-screen h-full flex flex-col">
      <div className="capitalize text-center w-full mx-auto text-xl md:text-3xl mb-4 animate-bounce mt-8">
        Redirecting link...
      </div>
      <div className="w-full mx-auto flex justify-center mt-4">
        <BarLoader width={"50%"} color={color} />
      </div>
    </main>
  ) : (
    <NotFound />
  );
};

export default Page;
