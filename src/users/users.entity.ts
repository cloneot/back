import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @Expose()
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Expose()
  @Column({ name: 'username', type: 'varchar', length: 64 })
  username: string;

  @Expose()
  @Column({ name: 'google_sub', type: 'varchar', length: 256, unique: true })
  googleSub: string;

  @Expose()
  @Column({ name: 'access_token', type: 'varchar', length: 2048 })
  accessToken: string;

  @Expose()
  @Column({ name: 'refresh_token', type: 'varchar', length: 512 })
  refreshToken: string;

  // @OneToMany(() => PlaylistEntity, (playlistEntity) => playlistEntity.user)
  // playlists: PlaylistEntity[];
}
