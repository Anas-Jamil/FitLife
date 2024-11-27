import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    
    const nutritionData = await prisma.nutrition.findMany();

    
    return NextResponse.json({ message: "Success", data: nutritionData });
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    return NextResponse.json(
      { message: "Failed to fetch nutrition data" },
      { status: 500 }
    );
  }
}
