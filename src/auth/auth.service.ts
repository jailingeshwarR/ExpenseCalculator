import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';  // Import JwtService
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService  // Inject JwtService
    ) { }

    async register(userId: string, password: string, role: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ userId, password: hashedPassword, role });
        return newUser.save();
    }

    async login(userId: string, password: string) {
        const user = await this.userModel.findOne({ userId });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { userId: user.userId, role: user.role };
            return { access_token: this.jwtService.sign(payload) };  // Use JwtService to sign the token
        }
        throw new Error('Invalid credentials');
    }
}
