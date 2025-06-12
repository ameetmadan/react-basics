// src/components/TaskForm.tsx
import React, { useState } from 'react';
import type { TaskFormData } from './types';
import './TaskForm.css'

interface TaskFormProps {
    onAddTask: (taskData: TaskFormData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        priority: 'medium',
        dueDate: ''
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (formData.title.trim() === '') {
            alert('Please enter a task title');
            return;
        }

        onAddTask({
            title: formData.title.trim(),
            priority: formData.priority,
            dueDate: formData.dueDate || undefined
        });

        // Reset form
        setFormData({
            title: '',
            priority: 'medium',
            dueDate: ''
        });
        setIsExpanded(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="task-form-container">
            {!isExpanded ? (
                <button
                    className="add-task-trigger"
                    onClick={() => setIsExpanded(true)}
                >
                    ➕ Add New Task
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-header">
                        <h3>Add New Task</h3>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="close-btn"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Task Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="What needs to be done?"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                            >
                                <option value="low">🟢 Low</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="high">🔴 High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date (Optional)</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            ✅ Add Task
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TaskForm;