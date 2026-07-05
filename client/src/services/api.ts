import { Task } from '../types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Standard API response interface matching backend format
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data?: T;
}

// Fetch all tasks from backend
export const getTasks = async (): Promise<ApiResponse<Task[]>> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch tasks: ${response.statusText}`);
  }

  return response.json();
};

// Create a new task
export const createTask = async (title: string): Promise<ApiResponse<Task>> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create task: ${response.statusText}`);
  }

  return response.json();
};

// Mark a task as completed
export const completeTask = async (id: string): Promise<ApiResponse<Task>> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to complete task: ${response.statusText}`);
  }

  return response.json();
};

// Delete a task
export const deleteTask = async (id: string): Promise<ApiResponse<void>> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to delete task: ${response.statusText}`);
  }

  return response.json();
};
