import db from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    

    const existingUserByEmail= await db.user.findUnique({
      where: { email: email}
    });
    if(existingUserByEmail) {
      return NextResponse.json({ user: null, message: "User Already Exists"}, { status: 409})
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName
      }
    })

    
    const { password: newUserPassword, ...rest } = newUser;


    return NextResponse.json({ user: rest, message: "User Created"}, {status: 201});
  } catch(error) {
    return NextResponse.json({ message: "Something Went Wrong"}, { status: 500});
  }
}