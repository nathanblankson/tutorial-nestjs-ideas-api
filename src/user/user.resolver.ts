import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveProperty,
} from '@nestjs/graphql';

import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Query()
  users(@Args('page') page: number) {
    return this.userService.showAll(page);
  }

  @ResolveProperty()
  comments(@Parent() user) {
    const { id } = user;
    return this.commentService.showByUser(id);
  }
}
