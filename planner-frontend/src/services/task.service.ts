import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types';

import { axiosWithAuth } from '@/api/interceptors';

class TaskService {
	private BASE_URL = '/tasks';

	async getTasks() {
		const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL);
		return response;
	}

	async createTask(data: TypeTaskFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data);
		return response;
	}

	async updateTask(id: string, data: TypeTaskFormState) {
		const response = await axiosWithAuth.patch(`${this.BASE_URL}/${id}`, data);
		return response;
	}

	async deleteTask(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		return response;
	}
}

export const taskService = new TaskService();
