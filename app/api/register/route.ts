import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDatabase } from "@/utils/DbConnect";
import { User } from "@/models/User.models";

// To register the user
export async function POST(req: NextRequest) {
  try {
    const { name, email, password, profile } = await req.json();

    await connectDatabase();

    // Check if the user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists." },
        { status: 400 } // 400 Bad Request
      );
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      email: email,
      password: hashedPassword,
      username: name,
      profile,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Failed to create user account!" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully.", user: user },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error registering user.";
    return NextResponse.json(
      { message: `Error registering user: ${errorMessage}` },
      { status: 500 }
    );
  }
}
