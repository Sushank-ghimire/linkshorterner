import { Dispatch, SetStateAction } from "react";

export type UserDataContext = {
  email: String;
  username: String;
} | null;

export type ContextType = {
  setUserData: Dispatch<SetStateAction<UserDataContext>>;
  userData: UserDataContext;
};
