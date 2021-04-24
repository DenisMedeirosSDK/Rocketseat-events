import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import { User } from "./User"

@Entity('messages')
export class Message {
  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string

  @Column()
  text: string

  @Column()
  user_id: string

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
