"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";

interface CloudinaryUploadProps {
  setImage: Dispatch<SetStateAction<string>>;
}

const CloudinaryUpload = ({ setImage }: CloudinaryUploadProps) => {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT}
      onSuccess={(results) => {
        const { event, info } = results;

        if (event === "success" && info) {
          const imageUrl = typeof info === "string" ? info : info.url; 
          setImage(imageUrl);
        }
      }}
    >
      {({ open }) => (
        <button className="w-full btn bth-ghost" onClick={() => open()}>
          Upload Profile Image
        </button>
      )}
    </CldUploadWidget>
  );
};

export default CloudinaryUpload;
