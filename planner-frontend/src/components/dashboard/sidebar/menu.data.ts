import {
	CalendarRange,
	KanbanSquare,
	LayoutDashboard,
	Settings,
	Timer,
} from 'lucide-react';

import { AppRoute } from '@/config/app-route.config';

import type { IMenuItem } from './menu.interface';

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: AppRoute.HOME,
		name: 'Dashboard',
	},
	{
		icon: KanbanSquare,
		link: AppRoute.TASKS,
		name: 'Tasks',
	},
	{
		icon: Timer,
		link: AppRoute.TIMER,
		name: 'Pomodoro',
	},
	{
		icon: CalendarRange,
		link: AppRoute.TIME_BLOCKING,
		name: 'Time blocking',
	},
	{
		icon: Settings,
		link: AppRoute.SETTINGS,
		name: 'Settings',
	},
];
