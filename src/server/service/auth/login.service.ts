import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { validateUserCredentials } from "../../repositories/auth/validate-user.repository";

export async function loginUser(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 },
      );
    }

    const user = await validateUserCredentials(username, password);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: Number(process.env.JWT_EXPIRES_IN!) },
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: 604800 }, // 7 days
    );

    const responseData = NextResponse.json({
      message: "Login successful",
      status: 200,
      data: {
        user: {
          username: user.username,
          name: user.name,
        },
        token: {
          accessToken: token,
          refreshToken: refreshToken,
        },
      },
    });

    responseData.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Number(process.env.JWT_EXPIRES_IN),
      path: "/",
    });

    return responseData;
  } catch (error) {
    console.error("LOGIN SERVICE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to process login" },
      { status: 500 },
    );
  }
}
