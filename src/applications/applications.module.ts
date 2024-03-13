import { ApplicationsService } from './applications.service';
import { Application } from './applications.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ ApplicationsService ],
  exports: [TypeOrmModule, ApplicationsService],
})
export class ApplicationsModule {}