import { Controller, Post, Get, Body, UsePipes, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('api/users')
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
