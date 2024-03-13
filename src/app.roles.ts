import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  APPLICANT = 'APPLICANT',
  ADMIN = 'ADMIN',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.APPLICANT)
  .createOwn('application')
  .readOwn('application')
  .updateOwn('application')
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.APPLICANT)
  .readAny('application')
  .deleteAny('application');