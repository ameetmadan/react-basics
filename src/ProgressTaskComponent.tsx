import * as React from "react";

type ProgressTaskComponentProps = {
    progress: number;
}

export const ProgressTaskComponent: React.FC<ProgressTaskComponentProps> = ({ progress }) => {
    return (
        <div>{progress}</div>
    )
}