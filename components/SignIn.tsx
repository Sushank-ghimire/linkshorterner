"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import CloudinaryUpload from "./CloudinaryUpload";
import { useState } from "react";
import FormSubmitButton from "./FormSubmitButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const signUpFormHandle = async (data: FormData, imageUrl: string) => {
    try {
      const formData = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profile: imageUrl,
        }),
      });

      const resData = await res.json();

      console.log(resData);
      if (res.ok) {
        toast.success(resData.message);
        router.refresh();
        return;
      }
      toast.error(resData.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error occured while signin");
      } else {
        toast.error("Error occured while signin");
      }
    }
  };

  const [imageUrl, setImageUrl] = useState("");

  return (
    <form
      className="flex flex-col gap-4 w-full"
      action={async (formData: FormData) =>
        await signUpFormHandle(formData, imageUrl)
      }
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          required
          id="name"
          type="name"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          required
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <Label htmlFor="pass">Password</Label>
        <Input
          required
          id="pass"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <Label>Profile image</Label>
        {imageUrl === "" ? (
          <CloudinaryUpload setImage={setImageUrl} />
        ) : (
          <button className="w-full btn btn-disabled">Profile uploaded</button>
        )}
      </div>
      <FormSubmitButton buttonText="SignUp" />
    </form>
  );
};

export default SignUp;
