import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider"
import { dbContext } from "../db/DbContext.js"
import { bugsService } from "../services/BugsService.js"
import BaseController from "../utils/BaseController.js"

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .use('', Auth0Provider.getAuthorizedUserInfo)
      .get('/:bugId', this.getBugsById)
      .post('', this.createBug)
      .put('/:bugId', this.updateBug)
      .delete('/:bugId', this.decimateBug)
  }
  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const user = request.userInfo
      bugData.creatorId = user.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }
  async getBugs(request, response, next) {
    try {
      const bugs = await bugsService.getBug()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }
  async getBugsById(request, response, next) {
    try {
      const bugData = request.params.bugId
      const bug = await bugsService.getBugById(bugData)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }
  async updateBug(request, response, next) {
    try {
      const user = request.userInfo
      const bugData = request.body
      const bugId = request.params.bugId
      const bug = await bugsService.updateBug(bugData, user.id, bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }
  async decimateBug(request, response, next) {
    try {
      const user = request.userInfo
      const bugId = request.params.bugId
      const bugToDecimate = await bugsService.decimateBug(user.id, bugId)
      response.send(bugToDecimate)
    } catch (error) {
      next(error)
    }
  }
}