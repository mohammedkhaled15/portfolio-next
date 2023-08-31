import { Schema, model, models } from "mongoose";

export const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: [true, "DemoLink is Required"],
    unique: true,
  },
  skills: [{ type: String, ref: "Skill" }],
  skillsDetails: { type: [], default: [] },
  demoLink: {
    type: String,
    required: [true, "DemoLink is Required"],
    unique: true,
  },
  repoLink: {
    type: String,
    required: [true, "RepoLink is Required"],
    unique: true,
  },
  imgUrl: {
    type: String,
    required: [true, "Image Url is Required"],
    // unique: true,
  },
});

const Project = models.Project || model<IProject>("Project", projectSchema);

export default Project;
