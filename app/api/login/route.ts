import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDatabase } from "@/utils/DbConnect";
import { User } from "@/models/User.models";
import { getSessions } from "@/app/action";

// To login the user
export async function POST(req: NextRequest) {
  const session = await getSessions();
  try {
    const { email, password } = await req.json();

    await connectDatabase();

    const userInDb = await User.findOne({ email });

    if (!userInDb) {
      return NextResponse.json({ message: "User not found." }, { status: 401 });
    }

    const passwordCheck = await bcrypt.compare(password, userInDb.password);

    if (!passwordCheck) {
      return NextResponse.json(
        { message: "Wrong user password." },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email }).select("-password");

    if (user) {
      session.user_id = user._id;
      session.username = user.username;
      session.email = user.email;
      session.isLoggedIn = true;
      session.userImage = user.profile;
      await session.save();
    }

    return NextResponse.json(
      { message: "User loggedin successfully.", user: user },
      { status: 201 }
    );
  } catch (_) {
    return NextResponse.json(
      { message: "Error occured while login user" },
      { status: 500 }
    );
  }
}

// To logout user
export async function DELETE() {
  const session = await getSessions();
  try {
    session.destroy();
    return NextResponse.json(
      {
        message: "User logout successfully",
      },
      { status: 201 }
    );
  } catch (_) {
    return NextResponse.json(
      { message: "Error occured while logout the user." },
      { status: 500 }
    );
  }
}
