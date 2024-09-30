"use client";
import { GoCopy } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { LuDownloadCloud } from "react-icons/lu";
import { useTheme } from "next-themes";
import { FaStaylinked } from "react-icons/fa";
import { UrlCardProps } from "@/Types/UrlCards.types";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const UrlCards = ({
  urlsData,
  deleteUrl,
}: {
  urlsData: UrlCardProps;
  deleteUrl: (id: string) => Promise<void>;
}) => {
  const { theme } = useTheme();

  const domain = process.env.DOMAIN;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${domain}/${urlsData.shortedUrl}`);
      toast.success("ShortedUrl copied to the clipboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to copy to the clipboard.");
      } else {
        toast.error("Failed to copy to the clipboard.");
      }
    }
  };

  const downLoadQr = async () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${domain}/${urlsData.shortedUrl}`;

    // Fetch the QR code image data
    const response = await fetch(qrUrl);
    const blob = await response.blob(); // Convert the response to a Blob

    // Create a download link
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(blob); // Create a blob URL
    a.href = url;
    a.download = `QRCode_${urlsData.shortedUrl}.png`; // Set the filename
    document.body.appendChild(a); // Append to the body
    a.click(); // Trigger the download
    window.URL.revokeObjectURL(url); // Revoke the object URL to free memory
    document.body.removeChild(a); // Remove the element after download
  };

  return (
    <div
      className={`w-full mt-4 cursor-pointer p-4 rounded flex flex-col md:flex-row justify-between items-center shadow-md text-xs ${
        theme === "dark" ? "bg-slate-800" : ""
      }`}
    >
      <Link href={`/dashboard/link/${urlsData._id}`}>
        <div className="min-h-[120px] min-w-[120px] border-spacing-1 border-4 border-blue-500 mb-4 md:mb-0">
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${domain}/${urlsData.shortedUrl}`}
            alt="QrCode"
            height={120}
            width={120}
          />
        </div>
      </Link>
      <Link href={`/dashboard/link/${urlsData._id}`}>
        <div className="flex space-y-2 flex-col">
          <h1 className="capitalize text-xl md:text-3xl font-semibold tracking-wide hover:underline transition-all">
            {urlsData.title}
          </h1>
          <p className="hover:underline text-blue-500 text-xl">
            {`${domain}/${urlsData.shortedUrl}`}
          </p>
          <p className="text-sm hover:underline flex gap-2 text-left items-center transition-all">
            <FaStaylinked /> {urlsData.originalUrl}
          </p>
          <p>{new Date(urlsData.createdAt).toLocaleDateString()}</p>
        </div>
      </Link>
      <div className="text-xl md:text-4xl">
        <button onClick={copyToClipboard} className="btn btn-ghost">
          <GoCopy />
        </button>
        <button onClick={downLoadQr} className="btn btn-ghost">
          <LuDownloadCloud />
        </button>
        <button
          onClick={() => deleteUrl(urlsData._id)}
          className="btn btn-ghost"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default UrlCards;
