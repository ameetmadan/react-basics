import * as React from "react";
import type {Task} from "./types.ts";

type CreateTaskComponentProps = {
    onCreateTask: (data: Task) => void;
}

export const CreateTaskComponent: React.FC<CreateTaskComponentProps> = ({ onCreateTask }) => {
    return (
        <>
            <div>CreateTaskComponent</div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const task: Task = {
                    id: Math.random().toString(36).substring(2, 15),
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                    status: 'not_started'
                };
                onCreateTask(task);
            }}>
                <input type="text" name="title" placeholder="Task Title" required />
                <textarea name="description" placeholder="Task Description" required></textarea>
                <button type="submit">Create Task</button>
            </form>
        </>
    )
}