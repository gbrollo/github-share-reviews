import { Controller, Post } from '@nestjs/common'
import { GitRepository } from '../entities'
import { GitRepositoriesService } from '../services'

@Controller('repositories')
export class GitRepositoriesController {
  constructor(private gitRepositoriesService: GitRepositoriesService) {}

  @Post('sync')
  async fetchAndSyncRepositories(): Promise<GitRepository[]> {
    const gitRepositories = await this.gitRepositoriesService.fetchGitRepositories()

    const createdGitRepositories = [] as GitRepository[]
    for (const gitRepository of gitRepositories) {
      const createdGitRepository = await this.gitRepositoriesService.save(gitRepository)
      createdGitRepositories.push(createdGitRepository)
    }

    await this.gitRepositoriesService.removeNotFoundGitRepositories(gitRepositories)

    return createdGitRepositories
  }
}
