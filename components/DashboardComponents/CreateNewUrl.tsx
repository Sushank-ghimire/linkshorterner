"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormSubmitButton from "../FormSubmitButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateNewUrl = () => {
  const router = useRouter();

  const [qrData, setQrData] = useState("");

  const [showModel, setShowModel] = useState(true);

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrData(e.target.value);
  };

  const handleFormSubmit = async (formData: FormData) => {
    const urlData = {
      originalUrl: formData.get("originalUrl"),
      title: formData.get("title"),
    };

    try {
      const req = await fetch("/api/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: urlData.originalUrl,
          title: urlData.title,
        }),
      });

      const dataRes = await req.json();

      if (req.ok) {
        toast.success(dataRes.message);
        setQrData("");
        setShowModel(false);
        router.refresh();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error occured while creating url.");
      } else {
        toast.error("Error occured while creating url.");
      }
    }
  };

  return (
    showModel && (
      <Dialog>
        <DialogTrigger className="btn btn-ghost">
          Create New Links
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-2xl text-center">
            <DialogTitle>Create Links</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {qrData.length > 0 && (
              <div className="w-full justify-center items-center h-fit p-2">
                <Image
                  className="mx-auto"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}`}
                  alt="QrCode"
                />
              </div>
            )}
            <form
              className="flex flex-col space-y-4 text-xl"
              action={handleFormSubmit}
            >
              <div>
                <Label htmlFor="title">Url Title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  type="text"
                  placeholder="Enter title.."
                />
              </div>
              <div>
                <Label htmlFor="url">Long url link</Label>
                <Input
                  onChange={handleLink}
                  id="url"
                  name="originalUrl"
                  required
                  type="url"
                  placeholder="Enter long url"
                />
              </div>
              <FormSubmitButton buttonText="Create" />
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  );
};

export default CreateNewUrl;
