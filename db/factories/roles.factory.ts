import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Role } from '../../src/roles/roles.entity';

export const RolesFactory = setSeederFactory(Role, (faker: Faker) => {
  const role = new Role();
  role.name = "ADMIN";
  return role;
});