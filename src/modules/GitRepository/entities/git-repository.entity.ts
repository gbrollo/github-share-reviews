import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class GitRepository {
  @PrimaryColumn()
  id: number

  @Column({
    unique: true
  })
  node_id: string

  @Column()
  name: string

  @Column()
  html_url: string

  @Column('timestamp')
  created_at: Date

  @Column('timestamp')
  updated_at: Date

  @Column({ type: 'timestamp', nullable: true })
  last_search_at: Date

  @Column({ type: 'bool', default: false })
  is_shared: boolean
}
