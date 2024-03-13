import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BeforeInsert, OneToMany } from 'typeorm';
import { Role } from '../roles/roles.entity';
import * as bcrypt from 'bcrypt';
import { Application } from '../applications/applications.entity';

export interface AuthenticatedUser extends Omit<User, 'roles' | 'hashPassword' | 'validatePassword'> {
  roles: string[];
  hasRole: (role: string) => boolean;
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Application, application => application.user)
  applications: Application[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

}
