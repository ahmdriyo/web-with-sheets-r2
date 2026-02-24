import { NextResponse } from "next/server";
import { findModelById } from "../../repositories/models/find-by-id-model.repository";

export async function getOneModel(id: string) {
  try {
    const model = await findModelById(id);
    if (!model) {
      return NextResponse.json({ message: "Model not found" }, { status: 404 });
    }
    return NextResponse.json(model);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch model." },
      { status: 500 },
    );
  }
}
