class AppRouter {
	private root = '/app';

	HOME = this.root;
	TASKS = `${this.root}/tasks`;
	HABITS = `${this.root}/habits`;
	TIMER = `${this.root}/timer`;
	TIME_BLOCKING = `${this.root}/time-blocking`;
	SETTINGS = `${this.root}/settings`;
}

export const AppRoute = new AppRouter();
