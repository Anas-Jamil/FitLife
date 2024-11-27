import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    
    const schedules = await prisma.schedule.findMany({
      where: {
        userId: Number(userId), 
      },
      include: {
        workout: true, 
      },
    });

    return NextResponse.json({
      message: "Schedules fetched successfully",
      data: schedules,
    });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { message: "Failed to fetch schedules" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();
    const { workoutId, dayOfWeek } = body;

    if (!workoutId || !dayOfWeek) {
      return NextResponse.json(
        { message: "Missing required fields (workoutId, dayOfWeek)" },
        { status: 400 }
      );
    }

    const newSchedule = await prisma.schedule.create({
      data: {
        userId: Number(userId),
        workoutId: Number(workoutId),
        dayOfWeek,
      },
    });

    return NextResponse.json({
      message: "Schedule created successfully",
      data: newSchedule,
    });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const url = new URL(req.url);
    const scheduleId = url.searchParams.get("id");

    if (!scheduleId) {
      return NextResponse.json(
        { message: "Schedule ID is required" },
        { status: 400 }
      );
    }

    const deletedSchedule = await prisma.schedule.deleteMany({
      where: {
        id: Number(scheduleId),
        userId: Number(userId),
      },
    });

    if (deletedSchedule.count === 0) {
      return NextResponse.json(
        { message: "Schedule not found or not authorized to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
