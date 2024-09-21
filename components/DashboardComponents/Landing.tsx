"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import UrlCards from "../UrlCards";
import CreateNewUrl from "./CreateNewUrl";
import UrlCounts from "./UrlCounts";
import { UrlCardProps } from "@/Types/UrlCards.types";
import ClickCounts from "./ClickCounts";
import { toast } from "react-toastify";

const Landing = () => {
  const [urls, setUrls] = useState<UrlCardProps[]>([]);
  useEffect(() => {
    async function fetchUrls() {
      const res = await fetch("/api/shorturl", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (resData.urls) setUrls(resData.urls);
    }
    fetchUrls();
  }, []);

  const [filtering, setFiltering] = useState("");

  const [filteredData, setFilteredData] = useState<UrlCardProps[]>([]);

  useEffect(() => {
    // Filter urls whenever the filtering value changes
    if (filtering.length > 2) {
      const filteredUrls = urls.filter((url) =>
        url.title.toUpperCase().includes(filtering.toUpperCase())
      );
      setFilteredData(filteredUrls);
    } else {
      setFilteredData([]);
    }
  }, [filtering, urls]);

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
        const filteredUrls = urls.filter((url) => url._id !== id);
        setUrls(filteredUrls);
        toast.success(resData.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error occured while deleting url.");
      } else {
        toast.error("Error occured while deleting url.");
      }
    }
  };

  return (
    <main className="h-full w-[90vw] mx-auto mt-4 md:w-[80vw]">
      <div className="w-full h-fit md:grid gap-2 md:grid-cols-2 justify-between flex flex-col p-3 md:text-2xl text-xl">
        <div className="shadow-md p-3 rounded-sm border pl-4 font-bold">
          <h1>Total Created links</h1>
          <p className="mt-4">
            <UrlCounts />
          </p>
        </div>
        <div className="shadow-md p-3 rounded-sm border pl-4 font-bold">
          <h1>Total Link Clicks</h1>
          <p className="mt-4">
            <ClickCounts />
          </p>
        </div>
      </div>

      <section className="mt-4 p-3">
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-3xl">My Links</h1>
          <CreateNewUrl />
        </div>
        <div>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFiltering(e.target.value)
            }
            type="text"
            className="p-6 relative rounded mt-4 w-full"
            placeholder="Filter your links..."
          />
        </div>
        <div className="mt-8">
          {urls.length > 0 &&
            filtering.length < 2 &&
            urls.map((url) => (
              <UrlCards deleteUrl={deleteUrl} key={url._id} urlsData={url} />
            ))}

          {filteredData.length > 0 && filtering.length > 2
            ? filteredData.map((data) => (
                <UrlCards
                  urlsData={data}
                  key={data._id}
                  deleteUrl={deleteUrl}
                />
              ))
            : ""}
        </div>
      </section>
    </main>
  );
};

export default Landing;
