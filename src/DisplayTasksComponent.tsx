import * as React from "react";
import type {Task} from "./types.ts";

type DisplayTaskComponentProps = {
    tasks: Task[];
    onCompleteTask: () => void;
}

export const DisplayTaskComponent: React.FC<DisplayTaskComponentProps> = ({ tasks, onCompleteTask }) => {
    return (
        <div>
            {tasks.length > 0 ? <>
            {tasks.map((task) => {
                return (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <button onClick={() => onCompleteTask()}>
                            Complete Task
                        </button>
                    </div>
                )
            })}</>
                : 'No tasks available'}
        </div>
    )
}