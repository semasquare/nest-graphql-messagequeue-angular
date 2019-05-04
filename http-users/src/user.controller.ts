import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getSingleUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.getSingleUser(id);
  }

  @Post()
  addUser(@Body() newUser: User): Promise<void> {
    return this.userService.addUser(newUser);
  }
}
