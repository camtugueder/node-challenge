import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { RegisterRequestDto } from '../auth/dtos/register-request.dto';
import { AppRoles } from '../app.roles';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService
  ) {}

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByIdWithRoles(id: number): Promise<User | null> {
    const userResult = await this.usersRepository.find({
      where: { id },
      relations: { roles: true },
    });
    return userResult[0];
  }

  async create(user: RegisterRequestDto): Promise<User> {
    const applicantRole= await this.rolesService.findOneByName(AppRoles.APPLICANT);

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.roles = [applicantRole];

    return this.usersRepository.save(newUser);
  }

  update(userId: number, userInformation: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(userId, userInformation);
  }
}