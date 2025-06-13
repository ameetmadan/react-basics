export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

export type TaskStatus = "not_started" | "in_progress" | "completed";