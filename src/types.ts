// src/types.ts
export interface Task {
    id: number;
    title: string;
    complete: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    createdAt: string;
}

export interface TaskFormData {
    title: string;
    priority: Task['priority'];
    dueDate?: string;
}

export interface TaskStats {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
}