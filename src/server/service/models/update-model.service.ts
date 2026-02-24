import { NextResponse } from "next/server";
import { updateModel as updateModelRepo } from "../../repositories/models/update-model.repository";

export async function updateModel(id: string, req: Request) {
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

    const model = await updateModelRepo(id, { name, id_brand, id_category });

    if (!model) {
      return NextResponse.json({ message: "Model not found" }, { status: 404 });
    }

    return NextResponse.json(model);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update model" },
      { status: 500 },
    );
  }
}
