import Project from "../../../models/project";
import connectDB from "../../../config/connectDb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    try {
      connectDB();
      const projects = await Project.find();
      return new NextResponse(JSON.stringify(projects), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify({ error: "Database Error1" }), {
        status: 500,
      });
    }
  } else {
    try {
      connectDB();
      const project = await Project.aggregate([
        {
          $lookup: {
            pipeline: [],
            from: "skills",
            localField: "skills",
            foreignField: "value",
            as: "skillsDetails",
          },
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
      ]);
      return new NextResponse(JSON.stringify(project), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify(error), {
        status: 500,
      });
    }
  }
}

export async function POST(request, response) {
  const projectToAdd = await request.json();
  try {
    connectDB();
    const newProject = new Project(projectToAdd);
    await newProject.save();
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
