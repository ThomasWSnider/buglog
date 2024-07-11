import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugSchema } from "../models/Bug.js";

class DbContext {
  Bug = mongoose.model('Bug', BugSchema)
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
