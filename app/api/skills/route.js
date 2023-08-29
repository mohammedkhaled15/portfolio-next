import { NextResponse } from "next/server";
import connectDB from "../../../config/connectDb";
import Skill from "../../../models/skill";

export async function GET(request) {
  try {
    connectDB();
    const skills = await Skill.find();
    return new NextResponse(JSON.stringify(skills), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
}

export async function POST(request, response) {
  const skillsToAdd = await request.json();
  try {
    connectDB();
    await Skill.insertMany(skillsToAdd);
    return new NextResponse(JSON.stringify({ message: "Added Successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
