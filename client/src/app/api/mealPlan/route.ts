import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const userId = session.user.id; 


    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        nutrition: true, 
      },
    });

    // Return the meal plans
    return NextResponse.json({
      message: "Meal plans fetched successfully!",
      data: mealPlans,
    });
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    return NextResponse.json(
      { message: "Failed to fetch meal plans." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
 
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const userId = session.user.id; 


    const body = await req.json();
    const { nutritionId, mealTime, dayOfWeek } = body;


    if (!nutritionId || !mealTime || !dayOfWeek) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }


    const newMealPlan = await prisma.mealPlan.create({
      data: {
        userId: Number(userId), 
        nutritionId: Number(nutritionId), 
        mealTime,
        dayOfWeek,
      },
    });


    return NextResponse.json({
      message: "Meal plan added successfully!",
      data: newMealPlan,
    });
  } catch (error) {
    console.error("Error creating meal plan:", error);
    return NextResponse.json(
      { message: "Failed to create meal plan." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const userId = session.user.id; 


    const url = new URL(req.url);
    const mealPlanId = url.searchParams.get("id");

    if (!mealPlanId) {
      return NextResponse.json(
        { message: "Meal plan ID is required." },
        { status: 400 }
      );
    }


    const deletedMealPlan = await prisma.mealPlan.deleteMany({
      where: {
        id: Number(mealPlanId),
        userId: Number(userId), 
      },
    });


    if (deletedMealPlan.count === 0) {
      return NextResponse.json(
        { message: "Meal plan not found or not authorized to delete." },
        { status: 404 }
      );
    }


    return NextResponse.json({
      message: "Meal plan deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting meal plan:", error);
    return NextResponse.json(
      { message: "Failed to delete meal plan." },
      { status: 500 }
    );
  }
}
