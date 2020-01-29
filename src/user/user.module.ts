import { APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { IdeaEntity } from '../idea/idea.entity';
import { CommentService } from '../comment/comment.service';
import { CommentEntity } from 'src/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IdeaEntity, CommentEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    UserResolver,
    CommentService,
  ],
})
export class UserModule {}
