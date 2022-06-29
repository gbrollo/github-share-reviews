import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { GitRepository } from './entities'
import { GitRepositoriesService } from './services'
import { GitRepositoriesController } from './controllers'

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([GitRepository]), ConfigModule],
  providers: [GitRepositoriesService],
  controllers: [GitRepositoriesController]
})
export class GitRepositoriesModule {}
