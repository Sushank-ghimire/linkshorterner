import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getSessions } from "@/app/action";
import { Urls } from "@/models/Urls.models";
import { connectDatabase } from "@/utils/DbConnect";

// To shorting the url
export async function POST(req: NextRequest) {
  const { title, originalUrl } = await req.json();

  const sessions = await getSessions();

  if (!title || !originalUrl || title === "" || originalUrl === "") {
    return NextResponse.json(
      { message: "Title and original url must be provided" },
      { status: 400 }
    );
  }

  try {
    await connectDatabase();

    const shorted = nanoid(6);

    const dbCheckUrl = await Urls.findOne({
      originalUrl: originalUrl,
    });

    if (dbCheckUrl) {
      return NextResponse.json(
        { message: "Url is already shorted." },
        { status: 200 }
      );
    }

    if (sessions.user_id && sessions.isLoggedIn) {
      const user_id = sessions.user_id;
      const qrCode = originalUrl;
      const shortedUrl = shorted;

      const dbUrlCreate = await Urls.create({
        title,
        user_id,
        shortedUrl,
        qrcode: qrCode,
        originalUrl,
      });

      return NextResponse.json(
        {
          message: "Url shorted successfully.",
          url: `${process.env.DOMAIN_FOR_URL}/${shorted}`,
          urlData: dbUrlCreate,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User must be logged in",
        },
        { status: 401 }
      );
    }
  } catch (_) {
    return NextResponse.json(
      { message: "Error while shorteneing url." },
      { status: 501 }
    );
  }
}

// To get all the urls
export async function GET() {
  const sessions = await getSessions();
  try {
    if (sessions.isLoggedIn && sessions.user_id) {
      await connectDatabase();
      const shortedUrls = await Urls.find({ user_id: sessions.user_id });

      return NextResponse.json(
        { message: "Urls founded.", urls: shortedUrls },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "User must be logged in." },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// To delete a url
export async function DELETE(req: NextRequest) {
  const urlId = await req.json();

  const session = await getSessions();

  try {
    await connectDatabase();

    if (session.isLoggedIn && session.email) {
      const res = await Urls.findByIdAndDelete(urlId);

      if (res) {
        return NextResponse.json(
          { message: "Url deleted successfylly" },
          { status: 200 }
        );
      }
    }
    return NextResponse.json(
      { message: "User must be logged in." },
      { status: 401 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error occurred while deleting url";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
  
}
