import { sheetsData } from "@/app/lib/googleSheets";
import { User } from "@/app/types/user.type";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// export async function GET() {
//   try {
//     const response = await sheetsData.spreadsheets.values.get({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID!,
//       range: "user-admin!A2:B",
//     });
//     const rows = (response.data.values ?? []) as string[][];
//     const data: User[] = rows.map((row) => ({
//       username: row[0] ?? "",
//       password: row[1] ?? "",
//     }));
//     return NextResponse.json({
//       message: "Login endpoint",
//       status: 200,
//       response: data,
//     });
//   } catch (error) {
//     console.error("GOOGLE SHEET ERROR:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch user data" },
//       { status: 500 },
//     );
//   }
// }

export async function POST(req: Request) {
  try {
    const body: User = await req.json();
    const response = await sheetsData.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "user-admin!A2:B",
    });

    const rows = (response.data.values ?? []) as string[][];
    const user = rows.find(
      (row) => row[0] === body.username && row[1] === body.password,
    );
    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 },
      );
    }
    const token = jwt.sign(
      { username: body.username },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: Number(process.env.JWT_EXPIRES_IN!) },
    );
    const refreshToken = jwt.sign(
      { username: body.username },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: 604800 }, // 7 days
    );
    const responseData = NextResponse.json({
      message: "Login successful",
      status: 200,
      data: {
        user: {
          username: body.username,
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
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Failed to process login" },
      { status: 500 },
    );
  }
}
