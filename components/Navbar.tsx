"use client";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { MdOutlineLightMode } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleLogout } from "@/app/action";
import { toast } from "react-toastify";
import Profile from "./DashboardComponents/Profile";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState("");

  const [username, setUsername] = useState("");

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const changeTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const logout = async () => {
    const logout = await handleLogout();
    toast.success(logout.message);
    setIsLoggedIn(false);
    router.refresh();
  };

  useEffect(() => {
    setMounted(true);
    async function isLoggedIn() {
      const res = await fetch("/api/sessions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (resData.session) {
        const session = resData.session;
        setIsLoggedIn(session.isLoggedIn);
        if (session.userImage) setImageUrl(session.userImage);
        if (session.username) setUsername(session.username);
      }
    }
    isLoggedIn();
    router.refresh();
  }, [router]);

  if (!mounted) return null;

  return (
    <nav className="w-full h-fit p-4 px-8 text-xl flex justify-between md:text-2xl">
      <div className="cursor-pointer">
        <span>Shortify</span>
      </div>
      <div className="flex justify-between w-fit space-x-4 mr-0 md:mr-3">
        {isLoggedIn ? (
          <Profile
            username={username}
            logoutFunc={logout}
            userImage={imageUrl}
          />
        ) : (
          <button
            onClick={() => router.push("/auth")}
            className="btn dark:bg-transparent dark:btn-ghost dark:text-white"
          >
            Login
          </button>
        )}

        <button onClick={changeTheme} className="btn btn-ghost px-2 text-2xl">
          {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
