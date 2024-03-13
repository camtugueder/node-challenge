import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from '../../src/users/users.entity';
import { Role } from '../../src/roles/roles.entity';
import { AppRoles } from '../../src/app.roles';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {

    const userFactory = factoryManager.get(User);
    const roleFactory = factoryManager.get(Role);

    const rolesRepository = dataSource.getRepository(Role);
    const usersRepository = dataSource.getRepository(User);
    await usersRepository.delete({});
    await rolesRepository.delete({});

    const adminRole = await roleFactory.save({name: AppRoles.ADMIN});
    const applicantRole = await roleFactory.save({name: AppRoles.APPLICANT});

    await userFactory.save({roles: [adminRole]});
    await userFactory.save({roles: [applicantRole]});


  }
}