import { getSessions } from "@/app/action";
import { Urls } from "@/models/Urls.models";
import { connectDatabase } from "@/utils/DbConnect";
import { NextRequest, NextResponse } from "next/server";

// To get the total clicks of the urls from the database
export async function GET() {
  try {
    await connectDatabase();
    const sessions = await getSessions();
    if (sessions.isLoggedIn && sessions.email) {
      const userUrls = await Urls.find({ user_id: sessions.user_id });
      if (userUrls) {
        let clickCounts = 0;
        userUrls.map((urls) => {
          clickCounts += urls.clicks;
        });
        return NextResponse.json(
          { message: "User clicks founded.", click: clickCounts },
          { status: 200 }
        );
      }
    }
    return NextResponse.json({ message: "Error occured" }, { status: 500 });
  } catch (_) {}
}

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  try {
    await connectDatabase();

    const resData = await Urls.findOneAndDelete(_id);

    if (resData) {
      return NextResponse.json(
        { message: "Url deleted successfully." },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error occurred while deleting URL";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
