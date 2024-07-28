import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('user')
    async createUser(@Body() createUserDto: { name: string; email: string; phno: string }) {
        return this.userService.create(createUserDto);
    }

    @Get(':name/user')
    async findByName(@Param('name') name: string): Promise<User | null> {
        return this.userService.findByName(name);
    }
}