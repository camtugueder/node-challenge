import { Role } from '../../roles/roles.entity';
import { Application } from '../../applications/applications.entity';

export type RegisterRequestDto = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  roles: Role[];
  applications: Application[];
  hashPassword: string;
};