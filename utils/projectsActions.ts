"use server"
import connectDB from "@config/connectDb";
import Project from "@models/project";
import { projects } from "@app/portfolio/projects";
import { revalidatePath } from "next/cache";

export const addAllProjects = async ()=>{
  try {
    await connectDB()
    await Project.insertMany(projects)
    revalidatePath("/dashboard")
    console.log("Prjects Added successfully!")
  } catch (error) {
    console.log(error)
  }
}

export const getAllProjects = async()=>{
  try {
    connectDB()
    const projects = await Project.find()
    return projects
  } catch (error) {
    console.log(error)
  }
}

export const getProjectById = async(id:number)=>{
  try {
    connectDB()
    const project = await Project.findOne({id})
    return project
  } catch (error) {
    console.log(error)
  }
}

export const clearAllProjects = async()=>{
  try {
    connectDB()
    await Project.deleteMany()
    console.log("All Projects Cleared!")
    revalidatePath("/dashboard")
  } catch (error) {
    console.log(error)
  }
}

export const updateProject = async(id:string, editedProject:ProjectData|undefined)=>{
  console.log(editedProject)
  try {
    connectDB()
    await Project.findOneAndUpdate({id},editedProject)
    revalidatePath("/dashboard")
  } catch (error) {
    console.log(error)
  }
}