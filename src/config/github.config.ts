import { registerAs } from '@nestjs/config'

export default registerAs('github', () => ({
  user: process.env.GITHUB_USERNAME,
  token: process.env.GITHUB_ACCESS_TOKEN
}))
