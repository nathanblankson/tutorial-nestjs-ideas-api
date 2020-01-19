import { APP_PIPE } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaEntity } from './idea.entity';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity])],
  controllers: [IdeaController],
  providers: [
    IdeaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class IdeaModule {}
