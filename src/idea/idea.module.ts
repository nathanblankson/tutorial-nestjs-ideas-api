import { APP_PIPE } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaEntity } from './idea.entity';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { ValidationPipe } from '../shared/validation.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity])],
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
