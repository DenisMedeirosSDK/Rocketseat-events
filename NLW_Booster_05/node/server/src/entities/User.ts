import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string

  @Column()
  email: string

  @CreateDateColumn()
  created_at: string

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
