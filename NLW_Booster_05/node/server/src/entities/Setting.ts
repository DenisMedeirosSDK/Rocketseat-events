import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('settings')
export class Setting {

  @PrimaryColumn()
  id: string

  @Column()
  username: string

  @Column()
  chat: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
