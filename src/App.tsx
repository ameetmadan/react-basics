import './App.css'
import {CreateTaskComponent} from "./CreateTaskComponent.tsx";
import {DisplayTaskComponent} from "./DisplayTasksComponent.tsx";
import {ProgressTaskComponent} from "./ProgressTaskComponent.tsx";
import {useEffect, useState} from "react";
import type {Task} from "./types.ts";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [progress, setProgress] = useState<number>(0);

    function onCreateTask(data: Task) {
        setTasks([...tasks, data]);
    }

    function increaseProgress() {
        setProgress(progress + 1)
    }

    useEffect(() => {
        setTasks([
            {
                id: '1',
                title: 'Task 1',
                description: 'Description for Task 1',
                status: 'not_started'
            },
            {
                id: '2',
                title: 'Task 2',
                description: 'Description for Task 2',
                status: 'completed'
            },
            {
                id: '3',
                title: 'Task 3',
                description: 'Description for Task 3',
                status: 'in_progress'
            }
        ])
    }, []);

  return (
    <>
        <CreateTaskComponent onCreateTask={(task) => onCreateTask(task)} />
        <DisplayTaskComponent tasks={tasks} onCompleteTask={() => increaseProgress()} />
        <ProgressTaskComponent progress={progress} />
    </>
  )
}

export default App
