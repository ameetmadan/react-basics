// src/components/Task.tsx
import React from 'react';
import type {Task} from './types';
import './Task.css';

interface TaskProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, onToggle, onDelete }) => {
    const getPriorityColor = (priority: Task['priority']): string => {
        switch (priority) {
            case 'high': return '#ff4757';
            case 'medium': return '#ffa502';
            case 'low': return '#2ed573';
            default: return '#747d8c';
        }
    };

    const isOverdue = (): boolean => {
        if (!task.dueDate) return false;
        return new Date(task.dueDate) < new Date() && !task.complete;
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className={`task ${task.complete ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
            <div className="task-content">
                <div className="task-header">
                    <h3 className={task.complete ? 'completed-text' : ''}>{task.title}</h3>
                    <div
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                        {task.priority.toUpperCase()}
                    </div>
                </div>

                <div className="task-meta">
          <span className="status">
            {task.complete ? "✅ Completed" : "⏳ Pending"}
          </span>
                    {task.dueDate && (
                        <span className={`due-date ${isOverdue() ? 'overdue-text' : ''}`}>
              📅 Due: {formatDate(task.dueDate)}
            </span>
                    )}
                </div>
            </div>

            <div className="task-actions">
                <button
                    onClick={() => onToggle(task.id)}
                    className={`toggle-btn ${task.complete ? 'mark-pending' : 'mark-complete'}`}
                    aria-label={task.complete ? 'Mark as pending' : 'Mark as complete'}
                >
                    {task.complete ? '↶ Undo' : '✓ Done'}
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="delete-btn"
                    aria-label="Delete task"
                >
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
};

export default TaskComponent;