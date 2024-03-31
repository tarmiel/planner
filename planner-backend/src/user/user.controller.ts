import {
	Body,
	Controller,
	Get,
	HttpCode,
	Patch,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Auth } from '@/auth/decorators/auth.decorator';
import { CurrentUser } from '@/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id);
	}

	@HttpCode(200)
	@Patch('profile')
	@Auth()
	async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
		return this.userService.update(id, dto);
	}
}
