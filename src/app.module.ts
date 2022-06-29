import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import githubConfig from './config/github.config'
import { GitRepository } from './modules/git-repository/entities'
import { GitRepositoriesModule } from './modules/git-repository/git-repository.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [githubConfig] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [GitRepository],
      synchronize: true
    }),
    GitRepositoriesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
