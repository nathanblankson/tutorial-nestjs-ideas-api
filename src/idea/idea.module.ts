import { APP_PIPE } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidationPipe } from '../shared/validation.pipe';
import { UserEntity } from '../user/user.entity';
import { IdeaEntity } from './idea.entity';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { IdeaResolver } from './idea.resolver';
import { CommentEntity } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity, CommentEntity])],
  controllers: [IdeaController],
  providers: [
    IdeaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    IdeaResolver,
    CommentService,
  ],
})
export class IdeaModule {}
