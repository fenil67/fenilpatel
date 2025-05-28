import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  title: string;
  icon: string;
  skills: string[];
  order: number;
  createdAt: Date;
}

const SkillSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String],
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ISkill>('Skill', SkillSchema); 