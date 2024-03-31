import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { validateEnv } from './config/env.validation';
import { UserModule } from './user/user.module';
import envConfig from './config/env.config';
import { TaskModule } from './task/task.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
			validate: validateEnv,
		}),
		AuthModule,
		UserModule,
		TaskModule,
		TimeBlockModule,
		PomodoroModule,
	],
})
export class AppModule {}
