import { Urls } from "@/models/Urls.models";
import { connectDatabase } from "@/utils/DbConnect";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectDatabase();

    const url = await Urls.findById(id);

    if (url) {
      return NextResponse.json(
        { message: "Url found", url: url },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Error occured." }, { status: 500 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error while fetching url.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
