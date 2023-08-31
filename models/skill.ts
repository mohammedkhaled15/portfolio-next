import { Schema, model, models } from "mongoose";

const skillSchema = new Schema<ISkill>({
  value: { type: String, required: true },
  label: { type: String, required: true },
  optionIsNew: { type: Boolean, default: false },
});

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;
