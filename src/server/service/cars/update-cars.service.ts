import { NextResponse } from "next/server";
import { findCarById } from "../../repositories/cars/find-by-id-cars.repository";
import { updateCar as updateCarRepo } from "../../repositories/cars/update-cars.repository";
import { uploadImages } from "../../storage/r2.service";
import { generateSlug } from "./cars.utils";

export async function updateCar(id: string, req: Request) {
  try {
    // Check if car exists
    const existingCar = await findCarById(id);

    if (!existingCar) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    const formData = await req.formData();

    // Check if new images are uploaded
    const images = formData.getAll("images") as File[];
    let imageUrls = existingCar.image_urls;
    let primaryImageUrl = existingCar.primary_image_url;

    if (images.length > 0) {
      // Upload new images
      imageUrls = await uploadImages(images);
      primaryImageUrl = imageUrls[0];
    }

    // Extract fields (use existing values if not provided)
    const category =
      (formData.get("category") as string) || existingCar.category;
    const title = (formData.get("title") as string) || existingCar.title;
    const brand = (formData.get("brand") as string) || existingCar.brand;
    const model = (formData.get("model") as string) || existingCar.model;
    const year = formData.has("year")
      ? Number(formData.get("year"))
      : existingCar.year;
    const price = formData.has("price")
      ? Number(formData.get("price"))
      : existingCar.price;
    const mileage = formData.has("mileage")
      ? Number(formData.get("mileage"))
      : existingCar.mileage;
    const transmission =
      (formData.get("transmission") as string) || existingCar.transmission;
    const fuel_type =
      (formData.get("fuel_type") as string) || existingCar.fuel_type;
    const condition =
      (formData.get("condition") as string) || existingCar.condition;
    const seats = formData.has("seats")
      ? Number(formData.get("seats"))
      : existingCar.seats;

    const engine_cc_value = formData.get("engine_cc") as string | null;
    const engine_cc = engine_cc_value
      ? engine_cc_value !== ""
        ? Number(engine_cc_value)
        : null
      : existingCar.engine_cc;

    const color = (formData.get("color") as string) || existingCar.color;
    const status = (formData.get("status") as string) || existingCar.status;
    const is_featured = formData.has("is_featured")
      ? formData.get("is_featured") === "true"
      : existingCar.is_featured;
    const description =
      (formData.get("description") as string) || existingCar.description;

    // Regenerate slug if brand, model, or title changed
    const slug = generateSlug(brand, model, title, year);

    // Update car in repository
    await updateCarRepo(id, {
      category,
      title,
      brand,
      model,
      year,
      price,
      mileage,
      transmission,
      fuel_type,
      condition,
      seats,
      engine_cc,
      color,
      status,
      is_featured,
      primary_image_url: primaryImageUrl,
      image_urls: imageUrls,
      description,
      slug,
      created_at: existingCar.created_at.toISOString(),
    });

    return NextResponse.json({
      message: "Car updated successfully!",
      data: {
        id,
        slug,
        primary_image_url: primaryImageUrl,
        image_urls: imageUrls,
      },
    });
  } catch (error) {
    console.error("UPDATE CAR ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update car" },
      { status: 500 },
    );
  }
}
