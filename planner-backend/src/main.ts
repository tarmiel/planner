import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	const configService = app.get(ConfigService);
	const PORT = configService.get<number>('PORT');
	const CLIENT_URL = configService.get<string>('CLIENT_URL');

	app.setGlobalPrefix('api');
	app.use(cookieParser());
	app.enableCors({
		origin: [CLIENT_URL],
		credentials: true,
		exposedHeaders: 'set-cookie',
	});

	await app.listen(PORT);
}
bootstrap();
