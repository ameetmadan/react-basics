// src/App.tsx
import React, { useState, useEffect } from 'react';
import type { Task, TaskFormData } from './types';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import './App.css';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [nextId, setNextId] = useState<number>(1);

    // Load tasks from localStorage on app start
    useEffect(() => {
        const savedTasks = localStorage.getItem('react-tasks');
        const savedNextId = localStorage.getItem('react-tasks-next-id');

        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                setTasks(parsedTasks);
            } catch (error) {
                console.error('Error loading tasks from localStorage:', error);
            }
        }

        if (savedNextId) {
            setNextId(parseInt(savedNextId, 10));
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('react-tasks', JSON.stringify(tasks));
        localStorage.setItem('react-tasks-next-id', nextId.toString());
    }, [tasks, nextId]);

    // Add sample data for demo purposes
    useEffect(() => {
        if (tasks.length === 0) {
            const sampleTasks: Task[] = [
                {
                    id: 1,
                    title: "Learn React TypeScript basics",
                    complete: true,
                    priority: 'high',
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                },
                {
                    id: 2,
                    title: "Build a todo app",
                    complete: false,
                    priority: 'medium',
                    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
                    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
                },
                {
                    id: 3,
                    title: "Study for final exam",
                    complete: false,
                    priority: 'high',
                    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
                    createdAt: new Date().toISOString(),
                }
            ];
            setTasks(sampleTasks);
            setNextId(4);
        }
    }, []); // Only run once when component mounts

    const addTask = (taskData: TaskFormData): void => {
        const newTask: Task = {
            id: nextId,
            title: taskData.title,
            complete: false,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            createdAt: new Date().toISOString(),
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
        setNextId(prevId => prevId + 1);
    };

    const toggleTask = (id: number): void => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id
                    ? { ...task, complete: !task.complete }
                    : task
            )
        );
    };

    const deleteTask = (id: number): void => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        }
    };

    const clearAllTasks = (): void => {
        if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
            setTasks([]);
            setNextId(1);
        }
    };

    const clearCompletedTasks = (): void => {
        const completedCount = tasks.filter(task => task.complete).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }

        if (window.confirm(`Are you sure you want to delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            setTasks(prevTasks => prevTasks.filter(task => !task.complete));
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <h1>
                        <span className="app-icon">✅</span>
                        My Task Manager
                    </h1>
                    <p className="app-subtitle">Stay organized and productive!</p>
                </div>

                {tasks.length > 0 && (
                    <div className="header-actions">
                        <button
                            onClick={clearCompletedTasks}
                            className="clear-completed-btn"
                            disabled={tasks.filter(task => task.complete).length === 0}
                        >
                            🧹 Clear Completed
                        </button>
                        <button
                            onClick={clearAllTasks}
                            className="clear-all-btn"
                        >
                            🗑️ Clear All
                        </button>
                    </div>
                )}
            </header>

            <main className="app-main">
                <div className="app-container">
                    <TaskStats tasks={tasks} />

                    <section className="task-form-section">
                        <TaskForm onAddTask={addTask} />
                    </section>

                    <section className="task-list-section">
                        <TaskList
                            tasks={tasks}
                            onToggleTask={toggleTask}
                            onDeleteTask={deleteTask}
                        />
                    </section>
                </div>
            </main>

            <footer className="app-footer">
                <p>Built with React & TypeScript | Made for learning 🚀</p>
            </footer>
        </div>
    );
};

export default App;