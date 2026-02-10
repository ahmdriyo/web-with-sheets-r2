import { NextResponse } from "next/server";
import { findAllUserAdmin } from "../../repositories/user-admin/find-all-user-admin";

export async function getAllUserAdmins() {
  try {
    const data = await findAllUserAdmin();
    return NextResponse.json({
      message: "User admins fetched successfully",
      status: 200,
      data,
    });
  } catch (error) {
    console.error("GET ALL USER ADMINS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch user admins" },
      { status: 500 },
    );
  }
}
