import { NextResponse } from "next/server";
import { updateAbout as updateAboutRepo } from "../../repositories/about/update-about.repository";

export async function updateAbouts(id: string, req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      ourMission,
      ourVision,
      carsSold,
      happyCustomers,
      yearsExperience,
    } = body;

    const setting = await updateAboutRepo(id, {
      title,
      description,
      ourMission,
      ourVision,
      carsSold,
      happyCustomers,
      yearsExperience,
    });
    if (!setting) {
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "About updated!",
      data: setting,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update about" },
      { status: 500 },
    );
  }
}
