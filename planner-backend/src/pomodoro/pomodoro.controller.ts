import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Auth } from '@/auth/decorators/auth.decorator';
import { CurrentUser } from '@/auth/decorators/user.decorator';
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/pomodoro.dto';
import { PomodoroService } from './pomodoro.service';

@Controller('timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroService.getTodaySession(userId);
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.create(userId);
	}

	@HttpCode(200)
	@Patch('/round/:id')
	@Auth()
	async updateRound(@Param('id') id: string, @Body() dto: PomodoroRoundDto) {
		return this.pomodoroService.updateRound(dto, id);
	}

	@HttpCode(200)
	@Patch(':id')
	@Auth()
	async update(
		@Body() dto: PomodoroSessionDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
	) {
		return this.pomodoroService.update(dto, id, userId);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteSession(
		@Param('id') id: string,
		@CurrentUser('id') userId: string,
	) {
		return this.pomodoroService.deleteSession(id, userId);
	}
}
