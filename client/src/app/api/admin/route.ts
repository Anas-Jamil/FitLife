import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized Access" }, { status: 403 });
    }

    
    const tickets = await prisma.ticket.findMany({

      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ message: "Tickets Fetched", data: tickets });
  } catch (error) {
    console.error("Error Fetching Tickets", error);
    return NextResponse.json({ message: "Failed to fetch Tickets" }, { status: 500 });
  }
}
