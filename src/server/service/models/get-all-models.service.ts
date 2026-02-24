import { NextResponse } from "next/server";
import { findAllModels } from "../../repositories/models/find-all-models.repository";

export async function getModels(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const result = await findAllModels(page, limit);
    return NextResponse.json({
      message: "Models fetched!",
      ...result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch models." },
      { status: 500 },
    );
  }
}
