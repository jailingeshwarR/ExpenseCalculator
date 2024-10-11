import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { userId: string, password: string, role: string }) {
        return this.authService.register(body.userId, body.password, body.role);
    }

    @Post('login')
    async login(@Body() body: { userId: string, password: string }) {
        return this.authService.login(body.userId, body.password);
    }
}
