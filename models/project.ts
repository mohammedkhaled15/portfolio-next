import { Schema, model, models } from "mongoose";

interface IProject {
  id: number,
    name: string,
    skills: string[],
    demoLink: string,
    repoLink: string,
    imgUrl:string,
}

const projectSchema = new Schema<IProject>({
    id: {type:Number},
    name: {type:String,required:[true,"DemoLink is Required"]},
    skills: {type:[],required:[true,"Enter One Skill at least"]},
    demoLink: {type:String, required:[true,"DemoLink is Required"]},
    repoLink: {type:String, required:[true,"RepoLink is Required"]},
    imgUrl:{type:String, required:[true,"Image Url is Required"]},
})

const Project = models.Project || model<IProject>("Project", projectSchema)

export default Project