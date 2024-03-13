// applications.controller.ts
import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ApplicationsService } from './applications.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from '../auth/decorators/user.decorator';
import { AuthenticatedUser } from '../users/users.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // Create a new application (APPLICANT)
  @Post()
  @UseGuards(JwtGuard, ACGuard)
  @UseRoles({
    resource: 'application',
    action: 'create',
    possession: 'own',
  })
  create(@User() user) {
    console.log(user);
    return this.applicationsService.create(user);
  }

  // Get one application (APPLICANT)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(JwtGuard, ACGuard)
  @UseRoles({
    resource: 'application',
    action: 'read',
    possession: 'own',
  })
  findById(@Param('id') id: number, @User() user: AuthenticatedUser) {
    return this.applicationsService.findById(id, user);
  }

  // Get all applications (ADMIN)
  @Get()
  @UseGuards(JwtGuard, ACGuard)
  @UseRoles({
    resource: 'application',
    action: 'read',
    possession: 'any',
  })
  findAll() {
    return this.applicationsService.findAll();
  }

  // Delete an application (ADMIN)
  @Delete(':id')
  @UseGuards(JwtGuard, ACGuard)
  @UseRoles({
    resource: 'application',
    action: 'delete',
    possession: 'any',
  })
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}