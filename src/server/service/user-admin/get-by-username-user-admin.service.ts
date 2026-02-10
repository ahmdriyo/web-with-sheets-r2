import { NextResponse } from "next/server";
import { findUserAdminByUsername } from "../../repositories/user-admin/find-by-username-user-admin";

export async function getUserAdminByUsername(username: string) {
  try {
    const data = await findUserAdminByUsername(username);

    if (!data) {
      return NextResponse.json(
        { message: "User admin not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "User admin fetched successfully",
      status: 200,
      data,
    });
  } catch (error) {
    console.error("GET USER ADMIN BY USERNAME ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch user admin" },
      { status: 500 },
    );
  }
}
