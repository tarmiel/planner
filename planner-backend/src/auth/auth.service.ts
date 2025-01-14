import { UserService } from '@/user/user.service';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
	// TODO: remove from service
	EXPIRE_DAY_REFRESH_TOKEN = 7;
	REFRESH_TOKEN_NAME = 'refreshToken';

	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	async login(dto: AuthDto) {
		const { password, ...user } = await this.validateUser(dto);
		const tokens = this.issueTokens(user.id);

		return {
			user,
			...tokens,
		};
	}

	async register(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email);

		if (user) throw new BadRequestException('User already exists');

		const { password, ...newUser } = await this.userService.create(dto);

		const tokens = this.issueTokens(newUser.id);

		return {
			user: newUser,
			...tokens,
		};
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwtService.verifyAsync(refreshToken);
		if (!result) throw new UnauthorizedException('Invalid refresh token');

		const { password, ...user } = await this.userService.getById(result.id);

		const tokens = this.issueTokens(user.id);

		return {
			user,
			...tokens,
		};
	}

	private issueTokens(userId: string) {
		const data = { id: userId };

		const accessToken = this.jwtService.sign(data, {
			expiresIn: '1h',
		});

		const refreshToken = this.jwtService.sign(data, {
			expiresIn: '7d',
		});

		return { accessToken, refreshToken };
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email);

		if (!user) throw new NotFoundException('User not found');

		const isValid = await verify(user.password, dto.password);

		if (!isValid) throw new UnauthorizedException('Invalid password');

		return user;
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date();
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			expires: expiresIn,
			secure: true,
			// move to env
			domain: 'localhost',
			// lax if production
			sameSite: 'none',
		});
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			expires: new Date(0),
			secure: true,
			// move to env
			domain: 'localhost',
			// lax if production
			sameSite: 'none',
		});
	}
}
