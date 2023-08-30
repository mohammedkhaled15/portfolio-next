import { Schema, model, models } from "mongoose";
import { projectSchema } from "./project";

const skillSchema = new Schema<ISkill>({
  value: { type: String, required: true },
  label: { type: String, required: true },
  optionIsNew: { type: Boolean, default: false },
});

// projectSchema.virtual("skillDetails", {
//   ref: "Skill",
//   localField: "skills",
//   foreignField: "value",
//   justOne: false, // Set to true if each project can have only one skill
// });

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;
