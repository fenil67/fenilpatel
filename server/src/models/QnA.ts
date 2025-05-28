import mongoose, { Schema, Document } from 'mongoose';

export interface IQnA extends Document {
  question: string;
  answer: string;
  tags: string[];
  createdAt: Date;
}

const QnASchema: Schema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create text indices for better search performance
QnASchema.index({ question: 'text', answer: 'text', tags: 'text' });

export default mongoose.model<IQnA>('QnA', QnASchema); 