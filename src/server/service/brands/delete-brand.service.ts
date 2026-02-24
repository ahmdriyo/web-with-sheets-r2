import { NextResponse } from "next/server";
import { deleteBrand as deleteBrandRepo } from "../../repositories/brands/delete-brand.repository";

export async function deleteBrand(id: string) {
  try {
    const result = await deleteBrandRepo(id);

    if (!result) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete brand" },
      { status: 500 },
    );
  }
}
