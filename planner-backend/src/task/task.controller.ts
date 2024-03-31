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
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId);
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
		return this.taskService.create(dto, userId);
	}

	@HttpCode(200)
	@Patch(':id')
	@Auth()
	async update(
		@Body() dto: TaskDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
	) {
		return this.taskService.update(dto, id, userId);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.taskService.delete(id);
	}
}
