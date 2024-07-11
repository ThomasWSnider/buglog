import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {
  async createBug(bugData) {
    const bug = await dbContext.Bug.create(bugData)
    await bug.populate('creator', '-email')
    return bug
  }

  async getBug() {
    const bugs = await dbContext.Bug.find()
    return bugs
  }
  async getBugById(bugData) {
    const bug = await dbContext.Bug.findById(bugData).populate('creator', '-email')
    if (!bug) throw new BadRequest("WHATCHA GOING TO DO WHEN THEY COME FOR YOU")
    return bug
  }
  async updateBug(bugData, id, bugId) {
    const bug = await dbContext.Bug.findById(bugId)
    if (id != bug.creatorId) throw new Forbidden('YOU SHALL NOT PASS')
    bug.title = bugData.title
    bug.description = bugData.description
    bug.priority = bugData.priority || bug.priority
    bug.closed = bugData.closed ?? bug.closed
    await bug.save()
    return bug
  }
  async decimateBug(id, bugId) {
    const boomBoomBug = await dbContext.Bug.findById(bugId)
    if (id != boomBoomBug.creatorId) throw new Forbidden('SHTOP YOY YNDA EEST')
    await boomBoomBug.deleteOne()
    return 'Good Job on BoomBooming Bug'
  }
}
export const bugsService = new BugsService()