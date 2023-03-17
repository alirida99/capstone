
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: any) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
        border: '1px solid white',
        width: '200px',
        height: '30px',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
