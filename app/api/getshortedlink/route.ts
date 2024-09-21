import { getSessions } from "@/app/action";
import { Urls } from "@/models/Urls.models";
import { connectDatabase } from "@/utils/DbConnect";
import { NextRequest, NextResponse } from "next/server";

// To redirect the user throw the url
export async function POST(req: NextRequest) {

  const { searchParams } = new URL(req.url);

  const shortedUrl = searchParams.get("shorturl");

  await connectDatabase();

  const databaseUrlCheck = await Urls.findOne({ shortedUrl: shortedUrl });

  if (databaseUrlCheck) {
    const longUrl = databaseUrlCheck.originalUrl;
    databaseUrlCheck.clicks = (databaseUrlCheck.clicks || 0) + 1;
    await databaseUrlCheck.save();
    return NextResponse.json({ longUrl });
  } else {
    return NextResponse.json({ error: "Url not found." });
  }
}

// To get the counts of Urls
export async function GET() {
  const session = await getSessions();

  try {
    await connectDatabase();
    if (session.isLoggedIn && session.user_id) {
      const user_id = session.user_id;
      const urlCounts = await Urls.find({ user_id }).countDocuments();
      return NextResponse.json(
        { message: "Url counts founded.", urlCreated: urlCounts },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "User must be logged in." },
      { status: 401 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ message: "Error occured while counting urls." }, { status: 500 });
  }
}
