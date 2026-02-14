import { NextResponse } from "next/server";
import { createCar as createCarRepo } from "../../repositories/cars/create-cars.repository";
import { uploadImages } from "../../storage/r2.service";
import { generateSlug } from "./cars.utils";

export async function createCar(req: Request) {
  try {
    const formData = await req.formData();

    // Extract images
    const images = formData.getAll("images") as File[];

    if (!images.length) {
      return NextResponse.json(
        { message: "At least one image is required" },
        { status: 400 },
      );
    }

    // Upload images to R2
    const imageUrls = await uploadImages(images);

    // First image becomes primary
    const primaryImageUrl = imageUrls[0];

    // Extract other fields
    const category = formData.get("category") as string;
    const title = formData.get("title") as string;
    const brand = formData.get("brand") as string;
    const model = formData.get("model") as string;
    const year = Number(formData.get("year"));
    const price = Number(formData.get("price"));
    const mileage = Number(formData.get("mileage"));
    const transmission = formData.get("transmission") as string;
    const fuel_type = formData.get("fuel_type") as string;
    const condition = formData.get("condition") as string;
    const seats = Number(formData.get("seats"));
    const engine_cc_value = formData.get("engine_cc") as string;
    const engine_cc =
      engine_cc_value && engine_cc_value !== ""
        ? Number(engine_cc_value)
        : null;
    const color = formData.get("color") as string;
    const status = formData.get("status") as string;
    const is_featured = formData.get("is_featured") === "true";
    const description = formData.get("description") as string;

    // Validation
    if (!category || !title || !brand || !model) {
      return NextResponse.json(
        { message: "Category, title, brand, and model are required" },
        { status: 400 },
      );
    }

    // Generate ID and slug
    const id = `CAR-${Date.now()}`;
    const slug = generateSlug(brand, model, title, year);
    const created_at = new Date().toISOString();

    // Create car in repository
    await createCarRepo({
      id,
      category,
      title,
      slug,
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
      created_at,
    });

    return NextResponse.json({
      message: "Car created successfully!",
      data: {
        id,
        slug,
        primary_image_url: primaryImageUrl,
        image_urls: imageUrls,
      },
    });
  } catch (error) {
    console.error("CREATE CAR ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create car" },
      { status: 500 },
    );
  }
}
