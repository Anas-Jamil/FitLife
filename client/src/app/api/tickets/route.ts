import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();



export async function GET(req: Request) {
    
    try{

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized Access"}, { status: 401});
        }

        const userId = session.user.id;

        const tickets = await prisma.ticket.findMany({
            where: {
                userId: Number(userId),
            },
        });

        return NextResponse.json({ message: "Tickets Fetched", data: tickets});

    }catch(error) {
    console.error("Error Fetching Tickets", error);
    return NextResponse.json({ message: "Failed to fetch Tickets"}, { status: 500});
    }
}



export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized Access"}, { status: 401 });
        }

        const userId = session.user.id;

        const body = await req.json();

        const { title, description } = body;

        if ( !title|| !description) {
            return NextResponse.json({ message: "Missing required fields"}, { status: 400});
        }

        const newTicket = await prisma.ticket.create({
            data: {
                userId: Number(userId),
                title,
                description,
            },
        });

        return NextResponse.json({ message: "Ticket Submitted!", data: newTicket});

    }catch(error) {
    console.error("Error Submitting Ticket", error);
    return NextResponse.json({ message: "Server Error"}, { status: 500});
    }
}



export async function DELETE(req: Request) {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized Access" }, { status: 401 });
      }
  
      const userId = session.user.id;
      const url = new URL(req.url);
      const ticketId = url.searchParams.get("id");
  
      if (!ticketId) {
        return NextResponse.json({ message: "Ticket ID is required" }, { status: 400 });
      }
  
      
      const deletedTicket = await prisma.ticket.delete({
        where: {
          id: Number(ticketId),
        },
      });
  
      return NextResponse.json({ message: "Ticket deleted!", data: deletedTicket });
    } catch (error) {
      console.error("Error deleting ticket", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }