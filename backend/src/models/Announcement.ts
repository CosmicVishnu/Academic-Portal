import mongoose, { Document, Schema } from 'mongoose';

// ─── Mongoose Document Interface ─────────────────────────────────────────────
export interface IAnnouncement extends Document {
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  category: 'academic' | 'facilities' | 'events' | 'financial' | 'technical' | 'assignment' | 'exam' | 'tutorial' | 'announcement';
  author: mongoose.Types.ObjectId;
  authorName: string;
  targetAudience: string;
  tags: string[];
  attachments: string[];
  status: 'published' | 'draft' | 'scheduled';
  scheduledDate?: Date;
  views: number;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────
const announcementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    category: {
      type: String,
      enum: ['academic', 'facilities', 'events', 'financial', 'technical', 'assignment', 'exam', 'tutorial', 'announcement'],
      default: 'announcement',
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    targetAudience: { type: String, default: 'all' },
    tags: [{ type: String }],
    attachments: [{ type: String }],
    status: { type: String, enum: ['published', 'draft', 'scheduled'], default: 'published' },
    scheduledDate: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model<IAnnouncement>('Announcement', announcementSchema);
