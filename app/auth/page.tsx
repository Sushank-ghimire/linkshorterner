import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import SignIn from "@/components/SignIn";

const Authentication = async () => {
  return (
    <main className="h-fit w-screen mt-4 md:mt-8 flex justify-center items-center">
      <Tabs defaultValue="login" className="mx-auto md:w-[50vw] w-[80vw]">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/2" value="login">Login</TabsTrigger>
          <TabsTrigger className="w-1/2" value="signin">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signin">
          <SignIn />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Authentication;
