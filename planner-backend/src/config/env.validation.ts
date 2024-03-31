import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
	development = 'development',
	production = 'production',
}

class EnvironmentVariables {
	@IsEnum(Environment)
	NODE_ENV: Environment;

	@IsNumber()
	PORT: number;

	@IsString()
	DATABASE_URL: string;

	@IsString()
	JWT_SECRET: string;

	@IsString()
	CLIENT_URL: string;
}

export function validateEnv(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}
