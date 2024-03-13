import { Role } from './roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findOneByName(name: string): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ name });
  }

  findOneById(id: number): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ id: id });
  }

  create(role: Role): Promise<Role> {
    return this.rolesRepository.save(role);
  }

  update(roleId: number, roleInformation: Partial<Role>): Promise<UpdateResult> {
    return this.rolesRepository.update(roleId, roleInformation);
  }
}