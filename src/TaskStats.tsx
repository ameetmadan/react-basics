// src/components/TaskStats.tsx
import React from 'react';
import type { Task, TaskStats as TaskStatsType } from './types';
import './TaskStats.css'

interface TaskStatsProps {
    tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
    const calculateStats = (): TaskStatsType => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.complete).length;
        const pending = tasks.filter(task => !task.complete).length;

        const overdue = tasks.filter(task => {
            if (!task.dueDate || task.complete) return false;
            return new Date(task.dueDate) < new Date();
        }).length;

        return { total, completed, pending, overdue };
    };

    const stats = calculateStats();
    const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    const getMotivationalMessage = (): string => {
        if (stats.total === 0) return "Ready to start your productive day!";
        if (completionPercentage === 100) return "🎉 Amazing! All tasks completed!";
        if (completionPercentage >= 75) return "🔥 You're on fire! Almost there!";
        if (completionPercentage >= 50) return "💪 Great progress! Keep it up!";
        if (completionPercentage >= 25) return "🚀 Good start! You've got this!";
        return "📝 Every journey begins with a single step!";
    };

    return (
        <div className="task-stats">
            <div className="stats-header">
                <h2>Your Progress</h2>
                <div className="motivational-message">
                    {getMotivationalMessage()}
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>{stats.total}</h3>
                        <p>Total Tasks</p>
                    </div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3>{stats.completed}</h3>
                        <p>Completed</p>
                    </div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <h3>{stats.pending}</h3>
                        <p>Pending</p>
                    </div>
                </div>

                {stats.overdue > 0 && (
                    <div className="stat-card overdue">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-content">
                            <h3>{stats.overdue}</h3>
                            <p>Overdue</p>
                        </div>
                    </div>
                )}
            </div>

            {stats.total > 0 && (
                <div className="progress-section">
                    <div className="progress-header">
                        <span>Completion Progress</span>
                        <span className="percentage">{completionPercentage}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="quick-insights">
                <h4>Quick Insights</h4>
                <ul>
                    {stats.total === 0 && (
                        <li>📝 Add your first task to get started!</li>
                    )}
                    {stats.overdue > 0 && (
                        <li>⚠️ You have {stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''}. Consider prioritizing them!</li>
                    )}
                    {stats.pending > 0 && stats.overdue === 0 && (
                        <li>🎯 Focus on completing {stats.pending} remaining task{stats.pending > 1 ? 's' : ''} today!</li>
                    )}
                    {completionPercentage === 100 && stats.total > 0 && (
                        <li>🏆 Congratulations! You've completed all your tasks!</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TaskStats;