import { NextResponse } from "next/server";
import { sheetsData } from "@/app/lib/googleSheets";
import { Menu } from "@/app/types/menu.type";
import { authMiddleware } from "@/app/lib/auth";
import { r2 } from "@/app/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { searchParams } = new URL(req.url);
    // Extract pagination parameters with default values
    const pageParam = Number(searchParams.get("page"));
    const limitParam = Number(searchParams.get("limit"));
    const page = !Number.isNaN(pageParam) && pageParam > 0 ? pageParam : 1;
    const limit = !Number.isNaN(limitParam) && limitParam > 0 ? limitParam : 10;

    // Calculate the starting index for pagination
    const startIndex = (page - 1) * limit;
    const range = `menu!A2:F`;

    // Fetch all menu items from Google Sheets
    const response = await sheetsData.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
    });

    // Process the fetched data
    const rows = (response.data.values ?? []) as string[][];
    const totalItems = rows.length;
    const paginatedRows = rows.slice(startIndex, startIndex + limit);

    // Map rows to Menu objects
    const data: Menu[] = paginatedRows.map((row) => ({
      id: row[0] ?? "",
      title: row[1] ?? "",
      description: row[2] ?? "",
      price: Number((row[3] ?? "0").replace(/\./g, "")),
      category: row[4] ?? "",
      imageUrl: row[5] ?? "",
    }));

    // Return the paginated response
    return NextResponse.json({
      message: "Menu fetched!",
      data,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (error) {
    console.error("GOOGLE SHEET ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch menu data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  // Validate JWT token
  const auth = authMiddleware(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `menu/${Date.now()}-${file.name}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    const imageUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    const id = `MNU-${Date.now()}`;
    await sheetsData.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "menu!A:F",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[id, title, description, price, category, imageUrl]],
      },
    });
    return NextResponse.json({
      message: "Menu added!",
      id,
      imageUrl,
    });
  } catch (error) {
    console.error("GOOGLE SHEET ERROR:", error);
    return NextResponse.json(
      { message: "Failed to add menu" },
      { status: 500 },
    );
  }
}
