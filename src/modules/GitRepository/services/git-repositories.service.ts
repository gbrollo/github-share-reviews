import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HttpService } from '@nestjs/axios'
import { GitRepository } from '../entities'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GitRepositoriesService {
  constructor(
    @InjectRepository(GitRepository) private gitRepositoriesRepository: Repository<GitRepository>,
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {}

  async fetchGitRepositories(): Promise<GitRepository[]> {
    try {
      const gitUser = this.configService.get<string>('github.user')
      const gitToken = this.configService.get<string>('github.token')

      const queryString = 'q=' + encodeURIComponent(`user:${gitUser}`)

      const { data: repositories } = await this.httpService.axiosRef.get(
        `https://api.github.com/search/repositories?${queryString}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${gitToken}`
          }
        }
      )

      return repositories.items.map((repository: GitRepository) => {
        return this.buildGitRepositoryEntity(repository)
      })
    } catch (ex) {
      throw new Error(ex)
    }
  }

  async removeNotFoundGitRepositories(gitRepositories: GitRepository[]) {
    const dbGitRepositories = (await this.gitRepositoriesRepository
      .createQueryBuilder('git_repository')
      .select('id')
      .addSelect('name')
      .getRawMany()) as GitRepository[]

    for (const dbGitRepository of dbGitRepositories) {
      const hasGitRepository = gitRepositories.some(
        (gitRepository: GitRepository) => gitRepository.id === dbGitRepository.id
      )

      if (!hasGitRepository) {
        this.remove(dbGitRepository.id)
      }
    }
  }

  async save(gitRepository: GitRepository): Promise<GitRepository> {
    return this.gitRepositoriesRepository.save(gitRepository)
  }

  async update(gitRepository: GitRepository): Promise<void> {
    await this.gitRepositoriesRepository.update(gitRepository.id, gitRepository)
  }

  async remove(id: number): Promise<void> {
    await this.gitRepositoriesRepository.delete(id)
  }

  buildGitRepositoryEntity(originGitRepository: GitRepository): GitRepository {
    const gitRepository = new GitRepository()
    gitRepository.id = originGitRepository.id
    gitRepository.node_id = originGitRepository.node_id
    gitRepository.name = originGitRepository.name
    gitRepository.html_url = originGitRepository.html_url
    gitRepository.created_at = originGitRepository.created_at
    gitRepository.updated_at = originGitRepository.updated_at
    return gitRepository
  }
}
