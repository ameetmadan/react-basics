// src/components/TaskList.tsx
import React, { useState } from 'react';
import type { Task as TaskType } from './types';
import TaskComponent from './TaskComponent.tsx';
import './TaskList.css';

interface TaskListProps {
    tasks: TaskType[];
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
}

type FilterType = 'all' | 'pending' | 'completed';
type SortType = 'newest' | 'oldest' | 'priority' | 'dueDate';

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [sortBy, setSortBy] = useState<SortType>('newest');

    const getFilteredTasks = (): TaskType[] => {
        let filtered = [...tasks];

        // Apply filter
        switch (filter) {
            case 'pending':
                filtered = filtered.filter(task => !task.complete);
                break;
            case 'completed':
                filtered = filtered.filter(task => task.complete);
                break;
            default:
                // 'all' - no filtering needed
                break;
        }

        // Apply sorting
        switch (sortBy) {
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'priority':
                { const priorityOrder = { high: 3, medium: 2, low: 1 };
                filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
                break; }
            case 'dueDate':
                filtered.sort((a, b) => {
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                });
                break;
            default: // 'newest'
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        return filtered;
    };

    const filteredTasks = getFilteredTasks();

    const getFilterCount = (filterType: FilterType): number => {
        switch (filterType) {
            case 'pending':
                return tasks.filter(task => !task.complete).length;
            case 'completed':
                return tasks.filter(task => task.complete).length;
            default:
                return tasks.length;
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No tasks yet!</h3>
                <p>Add your first task to get started with your productivity journey.</p>
            </div>
        );
    }

    return (
        <div className="task-list-container">
            <div className="task-controls">
                <div className="filters">
                    <h4>Filter Tasks:</h4>
                    <div className="filter-buttons">
                        {(['all', 'pending', 'completed'] as FilterType[]).map(filterType => (
                            <button
                                key={filterType}
                                onClick={() => setFilter(filterType)}
                                className={`filter-btn ${filter === filterType ? 'active' : ''}`}
                            >
                                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                                ({getFilterCount(filterType)})
                            </button>
                        ))}
                    </div>
                </div>

                <div className="sorting">
                    <h4>Sort by:</h4>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortType)}
                        className="sort-select"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="priority">Priority</option>
                        <option value="dueDate">Due Date</option>
                    </select>
                </div>
            </div>

            <div className="task-list">
                {filteredTasks.length === 0 ? (
                    <div className="no-tasks-message">
                        <p>No tasks match your current filter.</p>
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <TaskComponent
                            key={task.id}
                            task={task}
                            onToggle={onToggleTask}
                            onDelete={onDeleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;