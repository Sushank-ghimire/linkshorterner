"use client";
import { UrlCardProps } from "@/Types/UrlCards.types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaStaylinked } from "react-icons/fa";
import { GoCopy } from "react-icons/go";
import { LuDownloadCloud } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";

const SpecificUrl = ({ linkId }: { linkId: string }) => {
  const { theme } = useTheme();

  const router = useRouter();

  const domain = process.env.DOMAIN;

  const [urlData, setData] = useState<UrlCardProps>();

  useEffect(() => {
    async function getUrlData() {
      try {
        const res = await fetch(`/api/shorturl/${linkId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resData = await res.json();
        if (resData.url) setData(resData.url);
      } catch (_) {}
    }
    getUrlData();
  }, [linkId]);

  const deleteUrl = async (id: string) => {
    try {
      const res = await fetch("/api/clicksdata", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      const resData = await res.json();
      if (res.status === 200) {
        toast.success(resData.message);
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error occured while deleting url.");
      } else {
        toast.error("Error occured while deleting url.");
      }
    }
  };

  const copyToClipboard = async (shortedUrl: string) => {
    try {
      await navigator.clipboard.writeText(`${domain}/${shortedUrl}`);
      toast.success("ShortedUrl copied to the clipboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to copy to the clipboard.";
      toast.error(errorMessage);
    }
  };

  const downLoadQr = async (shortedUrl: string) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=${shortedUrl}`;

    // Fetch the QR code image data
    const response = await fetch(qrUrl);
    const blob = await response.blob(); // Convert the response to a Blob

    // Create a download link
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(blob); // Create a blob URL
    a.href = url;
    a.download = `QRCode_${shortedUrl}.png`; // Set the filename
    document.body.appendChild(a); // Append to the body
    a.click(); // Trigger the download
    window.URL.revokeObjectURL(url); // Revoke the object URL to free memory
    document.body.removeChild(a); // Remove the element after download
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() => router.push("/dashboard")}
        className="btn dark:btn-ghost w-fit gap-2 text-xs font-normal mb-4 ml-16"
      >
        <IoMdArrowBack /> Go Back To Dashboard
      </button>
      <div className="w-[90vw] mx-auto">
        {urlData && (
          <div
            className={`w-full mt-4 cursor-pointer p-4 rounded flex flex-col md:flex-row mx-auto justify-between items-center shadow-md text-xs ${
              theme === "dark" ? "bg-slate-800" : ""
            }`}
          >
            <div className="min-h-[120px] min-w-[120px] border-spacing-1 border-4 border-blue-500 mb-4 md:mb-0">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${domain}/${urlData.shortedUrl}`}
                alt="QrCode"
              />
            </div>
            <div className="flex space-y-2 flex-col">
              <h1 className="capitalize text-xl md:text-3xl font-semibold tracking-wide hover:underline transition-all">
                {urlData.title}
              </h1>
              <a
                target="_blank"
                href={`${domain}/${urlData.shortedUrl}`}
                className="hover:underline text-blue-500 text-xl"
              >
                {`${domain}/${urlData.shortedUrl}`}
              </a>
              <p className="text-sm hover:underline flex gap-2 text-left items-center transition-all">
                <FaStaylinked />{" "}
                <a href={`${urlData.originalUrl}`} target="_blank">
                  {urlData.originalUrl}
                </a>
              </p>
              <p>{new Date(urlData.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-xl md:text-4xl">
              <button
                onClick={() => copyToClipboard(urlData.shortedUrl)}
                className="btn btn-ghost"
              >
                <GoCopy />
              </button>
              <button
                onClick={() => downLoadQr(urlData.shortedUrl)}
                className="btn btn-ghost"
              >
                <LuDownloadCloud />
              </button>
              <button
                onClick={() => deleteUrl(urlData._id)}
                className="btn btn-ghost"
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        )}
      </div>
      <section className="w-[90vw] mx-auto mt-4 text-xl md:text-2xl">
        {urlData && urlData.clicks > 0 && (
          <div className="shadow-md p-3 rounded-sm border pl-4 font-bold">
            <h1>Total Link Clicks</h1>
            <p className="mt-4">
              {urlData.clicks === 0 ? "No clicks yet." : urlData.clicks}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SpecificUrl;
