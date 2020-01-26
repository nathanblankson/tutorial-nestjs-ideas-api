import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Logger,
  UseGuards,
  Query,
} from '@nestjs/common';

import { User } from '../user/user.decorator';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';

@Controller('api/ideas')
export class IdeaController {
  private logger = new Logger('IdeaController');

  constructor(private readonly ideaService: IdeaService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
    options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
  }

  @Get()
  showAllIdeas(@Query('page') page: number) {
    return this.ideaService.showAll(page);
  }

  @Get('/newest')
  showNewestIdeas(@Query('page') page: number) {
    return this.ideaService.showAll(page, true);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  createIdea(@User('id') user, @Body() data: IdeaDTO) {
    this.logData({ user, data });
    return this.ideaService.create(user, data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  updateIdea(
    @Param('id') id: string,
    @User('id') user,
    @Body() data: Partial<IdeaDTO>,
  ) {
    this.logData({ id, user, data });
    return this.ideaService.update(id, user, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  destroyIdea(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.ideaService.destroy(id, user);
  }

  @Post(':id/upvote')
  @UseGuards(AuthGuard)
  upvoteIdea(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.ideaService.upvote(id, user);
  }

  @Post(':id/downvote')
  @UseGuards(AuthGuard)
  downvoteIdea(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.ideaService.downvote(id, user);
  }

  @Post(':id/bookmark')
  @UseGuards(AuthGuard)
  bookmarkIdea(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.ideaService.bookmark(id, user);
  }

  @Delete(':id/bookmark')
  @UseGuards(AuthGuard)
  unbookmarkIdea(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.ideaService.unbookmark(id, user);
  }
}
