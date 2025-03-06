import { NextRequest, NextResponse } from "next/server";
import userModel from "@/lib/models/users";
import ConnectToDb from "@/lib/connect";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  const { firstName, lastName, phone, password, DOB } = await req.json();

  const email = phone;
  let message = "";
  try {
    ConnectToDb();
    const duplicateKeyErrorCode = "E11000";
    console.log({ userModel });
    const newUser = await userModel
      .create({ firstName, lastName, DOB, email, password })
      .catch((err: any) => {
        if (err.message.includes(duplicateKeyErrorCode)) {
          message = "This email already exists in our database, login instead";
        } else {
          message = "An error occured when trying to create user";
        }
      });
    console.log(newUser);
    const id = newUser._id;
    const token = jwt.sign({ id }, process.env.jwt_secret as string);
    return NextResponse.json(
      { message: "User created successfully", success: true, data: token },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message, error }, { status: 500 });
  }
}
