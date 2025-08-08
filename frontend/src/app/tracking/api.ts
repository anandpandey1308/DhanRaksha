// API client for task management
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export interface Task {
  _id: string;
  name: string;
  description: string;
  category: string;
  phase: string;
  done: boolean;
  order: number;
  completedAt?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  completed: number;
  total: number;
  percentage: number;
  byPhase: Array<{
    phase: string;
    completed: number;
    total: number;
    percentage: number;
  }>;
}

export const taskApi = {
  async getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  async getTaskStats(): Promise<TaskStats> {
    const response = await fetch(`${API_BASE_URL}/tasks/stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch task stats');
    return response.json();
  },

  async updateTask(id: string, data: { done?: boolean; updatedBy?: string }): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  async initializeTasks(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/tasks/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('Failed to initialize tasks');
    return response.json();
  },
};