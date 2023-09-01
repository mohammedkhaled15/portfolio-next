import { Schema, model, models } from "mongoose";

const skillSchema = new Schema<ISkill>({
  value: { type: String, required: true },
  label: { type: String, required: true },
  optionIsNew: { type: Boolean, default: false },
});

skillSchema.index({ value: 1, label: 1 }, { unique: true });

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;
