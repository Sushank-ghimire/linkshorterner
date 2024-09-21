"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import Link from "next/link";

const Profile = ({
  logoutFunc,
  userImage,
  username,
} : {
  logoutFunc: () => void;
  userImage: string;
  username: string;
}) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Image
            className="h-8 mx-auto my-auto mt-3 bg-transparent w-8 cursor-pointer rounded-full"
            src={userImage}
            alt="Profile"
          />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>{username}</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link href={"/dashboard"}>Dashboard</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={logoutFunc}>logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Profile;
