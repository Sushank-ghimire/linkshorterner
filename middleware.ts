import { NextResponse } from "next/server";
import { getSessions } from "./app/action";

export async function middleware() {
  const sessions = await getSessions();
  if (!sessions.isLoggedIn) {
    return NextResponse.json(
      {
        message: "User must be logged in to send requests.",
      },
      { status: 401 }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/shorturl/:path*",
  ],
};
