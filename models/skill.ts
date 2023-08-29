import { Schema, model, models } from "mongoose";

interface ISkill {
  name: string;
}

const skillSchema = new Schema<ISkill>({
  name: { type: String, required: true, unique: true },
});

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;
