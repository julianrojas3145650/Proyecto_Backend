import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CallUser } from './call-user.entity';
import { UserRole } from '../../roles/entities/user-role.entity';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 255 })
  apellido: string;

  @Column({ length: 255 })
  documento: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ultimo_acceso: Date;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => CallUser, (llamar) => llamar.usuario)
  llamarUsuarios: CallUser[];

  @OneToMany(() => UserRole, (usuarioRol) => usuarioRol.usuario)
  usuarioRoles: UserRole[];
}
