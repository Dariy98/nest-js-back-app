import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect, Req, Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Response, Request} from 'express';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {
  }

  // @Get()
  // @Redirect('https://google.com', 301)
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   return 'all users array';
  // }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
    // return 'getOne ' + id;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
    // return `user name is ${user.userName}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }

  @Put(':id')
  update(@Body() user: UpdateUserDto, @Param('id') id: string): Promise<User> {
    return this.userService.update(id, user);
  }
}
