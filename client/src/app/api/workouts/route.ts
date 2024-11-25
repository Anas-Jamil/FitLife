import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust the path to your NextAuth config

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch the workouts for the logged-in user
    const workouts = await prisma.workout.findMany({
        where: {
          userId: Number(userId), // Ensure userId is passed as a number
        },
      });

    // Return the workouts in the response
    return NextResponse.json({
      message: "Workouts fetched successfully",
      data: workouts,
    });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json(
      { message: "Failed to fetch workouts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);

 
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" }, 
        { status: 401 }
      );
    }

    const userId = session.user.id; 


    const body = await req.json();
    const { exercise, description, reps, sets } = body;

    if (!exercise || !reps || !sets) {
      return NextResponse.json(
        { message: "Missing required fields (exercise, reps, sets)" },
        { status: 400 }
      );
    }

    
    const newWorkout = await prisma.workout.create({
      data: {
        userId: Number(userId), 
        exercise,
        description: description || null, 
        reps: Number(reps),
        sets: Number(sets),
      },
    });

    // Respond with the newly created workout
    return NextResponse.json(
      { message: "Workout created successfully", data: newWorkout }
    );
  } catch (error) {
    console.error("Error creating workout:", error);
    return NextResponse.json(
      { message: "Internal Server Error"},
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id; // Extract user ID from the session

    // Extract the workout ID from the query parameters
    const url = new URL(req.url);
    const workoutId = url.searchParams.get("id");

    // Validate the workout ID
    if (!workoutId) {
      return NextResponse.json(
        { message: "Workout ID is required" },
        { status: 400 }
      );
    }

    // Ensure the workout belongs to the authenticated user and delete it
    const deletedWorkout = await prisma.workout.deleteMany({
      where: {
        id: Number(workoutId),
        userId: Number(userId),
      },
    });

    // Check if any workout was deleted
    if (deletedWorkout.count === 0) {
      return NextResponse.json(
        { message: "Workout not found or not authorized to delete" },
        { status: 404 }
      );
    }

    // Respond with success
    return NextResponse.json(
      { message: "Workout deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json(
      { message: "Internal Server Error"},
      { status: 500 }
    );
  }
}
