import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application, ApplicationStatus } from './applications.entity';
import { DeleteResult, Repository } from 'typeorm';
import { AuthenticatedUser, User } from '../users/users.entity';
import { AppRoles } from '../app.roles';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}


  async findById( id: number, user: AuthenticatedUser):Promise<Application> {
    const application = await this.applicationRepository.findOne({where:{id}, relations: ['user']});
    if (!application) {
      throw new NotFoundException();
    }
    console.log(application.user.id)
    console.log(user)
    if (application.user.id !== user.id && !user.hasRole(AppRoles.ADMIN)) {
      throw new UnauthorizedException();
    }
    return application;
  }
  findAll(): Promise<Application[] | null> {
    return this.applicationRepository.find();
  }

  create(user: User): Promise<Application> {
    const application = new Application();
    application.user = user as User;
    application.status = ApplicationStatus.STARTED;
    return this.applicationRepository.save(application);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.applicationRepository.delete({id})
  }

}