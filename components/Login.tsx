"use client";
import { useRouter } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const handleLogin = async (data: FormData) => {
    try {
      const formData = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const res = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const resData = await res.json();
      if (res.ok) {
        if (res.status === 200) {
          router.push("/dashboard");
        }
        router.refresh();
        toast.success(resData.message);
        return;
      }
      toast.error(resData.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error occured while logging in");
      } else {
        toast.error("Error occured while logging in");
      }
    }
  };
  return (
    <form className="flex flex-col gap-4 w-full" action={handleLogin}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          required
          id="email"
          className="lowercase"
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
      <FormSubmitButton buttonText="Login" />
    </form>
  );
};

export default Login;
