"use server";
import { defaultSession, sessionOptions } from "@/utils/SessionUtils";
import { SessionData } from "@/Types/SessionData.types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const handleLogout = async () => {
  const session = await getSessions();
  try {
    session.destroy();
    return { message: "Successfully logged out" };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Logout unsuccessful.";
    return { message: errorMessage };
  }
};

export const getSessions = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};
