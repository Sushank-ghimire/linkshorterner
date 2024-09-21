"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-screen flex justify-center items-center flex-col dark:text-slate-200 space-y-4">
      <p className="text-2xl">404 | page not found</p>
      <button
        className="flex space-x-2 btn btn-ghost"
        onClick={() => router.push("/")}
      >
        Go back to home <FaArrowRight />{" "}
      </button>
    </div>
  );
};

export default NotFound;
