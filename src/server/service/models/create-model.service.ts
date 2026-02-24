import { NextResponse } from "next/server";
import { createModel as createModelRepo } from "../../repositories/models/create-model.repository";

export async function createModel(req: Request) {
  try {
    const body = await req.json();
    const { name, id_brand, id_category } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    if (!id_brand) {
      return NextResponse.json(
        { message: "Brand is required" },
        { status: 400 },
      );
    }

    const model = await createModelRepo({ name, id_brand, id_category });
    return NextResponse.json(model);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add model." },
      { status: 500 },
    );
  }
}
