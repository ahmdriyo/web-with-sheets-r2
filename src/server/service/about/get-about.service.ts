import { NextResponse } from "next/server";
import { findAbout } from "../../repositories/about/find-about.repository";

export async function getAbout() {
  try {
    const result = await findAbout();

    if (!result) {
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "About fetched!",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch about" },
      { status: 500 },
    );
  }
}
