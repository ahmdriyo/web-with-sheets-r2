import { NextResponse } from "next/server";
import { deleteModel as deleteModelRepo } from "../../repositories/models/delete-model.repository";

export async function deleteModel(id: string) {
  try {
    const result = await deleteModelRepo(id);

    if (!result) {
      return NextResponse.json({ message: "Model not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete model" },
      { status: 500 },
    );
  }
}
