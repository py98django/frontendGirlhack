import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  const client = await clientPromise;
  const usersCollection = client.db("discoApp").collection("users");

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  await usersCollection.insertOne({ email, password: hashedPassword, name });

  return NextResponse.json({ success: true });
}
