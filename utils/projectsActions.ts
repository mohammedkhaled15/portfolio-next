"use server";
import connectDB from "@config/connectDb";
import Project from "@models/project";
import { projects } from "@app/portfolio/projects";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

//Create New Project
export const createProject = async (
  createdProject: ProjectData | undefined
) => {
  console.log(createdProject);
  try {
    connectDB();
    const newProject = await new Project(createdProject);
    await newProject.save();
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// Get Project By its Id
export const getProjectById = async (id: number) => {
  try {
    connectDB();
    const project = await Project.findOne({ id });
    return project;
  } catch (error) {
    console.log(error);
  }
};

//GET Allprojects
export const getAllProjects = async () => {
  try {
    connectDB();
    const projects = await Project.find();
    return projects;
  } catch (error) {
    console.log(error);
  }
};

//Update project by founded by its ID
export const updateProject = async (
  id: string,
  editedProject: ProjectData | undefined
) => {
  console.log(editedProject);
  try {
    connectDB();
    await Project.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      editedProject
    );
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

//Delete Project by its id
export const deleteProject = async (id: string) => {
  try {
    connectDB();
    await Project.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

//*****For developing purposes*****//
//Add many projects
export const addAllProjects = async () => {
  try {
    await connectDB();
    await Project.insertMany(projects);
    revalidatePath("/dashboard");
    console.log("Prjects Added successfully!");
  } catch (error) {
    console.log(error);
  }
};
//DELETE All projects
export const clearAllProjects = async () => {
  try {
    connectDB();
    await Project.deleteMany();
    console.log("All Projects Cleared!");
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
//*****----------------------******//
