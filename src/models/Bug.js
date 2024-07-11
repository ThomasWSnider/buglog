import { Schema } from "mongoose";

export const BugSchema = new Schema({
  title: { type: String, minlength: 10, maxLength: 50, required: true },
  description: { type: String, minlength: 10, maxLength: 500, required: true },
  priority: { type: Number, min: 1, max: 5, required: true },
  closed: { type: Boolean, required: true, default: false },
  closedDate: { type: Date, },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

BugSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})