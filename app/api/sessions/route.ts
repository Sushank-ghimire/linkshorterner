import { getSessions } from "@/app/action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSessions();
    if (session) {
      return NextResponse.json(
        { message: "User session found.", session: session },
        { status: 200 }
      );
    }
  } catch (_) {
    return NextResponse.json({ message: "Error occured." }, { status: 500 });
  }
}
