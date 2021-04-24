import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import { User } from "./User"

@Entity('connections')
export class Connection {
  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string

  @Column()
  socket_id: string

  @Column()
  user_id: string

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User

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
