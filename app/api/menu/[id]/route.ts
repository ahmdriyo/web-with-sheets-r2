import { sheetsData } from "@/app/lib/googleSheets";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/lib/auth";
import { r2 } from "@/app/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  // Validate JWT token
  const auth = authMiddleware(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const menuId = params.id;
    const response = await sheetsData.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "menu!A2:F",
    });
    const rows = (response.data.values ?? []) as string[][];
    const rowIndex = rows.find((row) => row[0] === menuId);
    if (!rowIndex) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }
    const data = {
      id: rowIndex[0] ?? "",
      title: rowIndex[1] ?? "",
      description: rowIndex[2] ?? "",
      price: Number(rowIndex[3] ?? 0),
      category: rowIndex[4] ?? "",
      imageUrl: rowIndex[5] ?? "",
    };
    return NextResponse.json({ message: "Menu by id fetched!", data: data });
  } catch (error) {
    console.error("GOOGLE SHEET ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch menu data" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  // Validate JWT token
  const auth = authMiddleware(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const formData = await req.formData();
    const menuId = params.id;

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const file = formData.get("image") as File | null;

    const response = await sheetsData.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "menu!A2:F",
    });

    const rows = (response.data.values ?? []) as string[][];
    const rowIndex = rows.findIndex((row) => row[0] === menuId);
    if (rowIndex === -1) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }

    // Keep existing image URL or upload new one
    let imageUrl = rows[rowIndex][5] ?? "";
    if (file && file.size > 0) {
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

      imageUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    }

    const targetRow = rowIndex + 2;
    await sheetsData.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `menu!A${targetRow}:F${targetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[menuId, title, description, price, category, imageUrl]],
      },
    });

    return NextResponse.json({ message: "Menu updated!" });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update menu" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  // Validate JWT token
  const auth = authMiddleware(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const menuId = params.id;
    const response = await sheetsData.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "menu!A2:F",
    });
    const rows = (response.data.values ?? []) as string[][];
    const rowIndex = rows.findIndex((row) => row[0] === menuId);
    if (rowIndex === -1) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }

    const targetRow = rowIndex + 2;
    await sheetsData.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: "ROWS",
                startIndex: targetRow - 1,
                endIndex: targetRow,
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({ message: "Menu deleted!" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete menu" },
      { status: 500 },
    );
  }
}
