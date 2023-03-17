
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { Grid } from '@mui/material';

export function Example(props: any) {
    const [parent, setParent] = useState(null);
    const draggable = props.question.options.map((option: any) => {
        return (
            <Draggable id={option} key={option}>
                {option}
            </Draggable>
        )
    })

    return (
        <Grid container>
            <DndContext onDragEnd={handleDragEnd}>
                <Grid container>
                    <Grid item>{props.question.sentence1}</Grid>
                    <Grid item xs={0.2}></Grid>
                    <Grid item>
                        <Droppable id="droppable">
                            {parent === "droppable" ? draggable : ''}
                        </Droppable>
                    </Grid>
                    <Grid item xs={0.2}></Grid>
                    <Grid item>{props.question.sentence2}</Grid>
                </Grid>
                {!parent ? draggable : null}
            </DndContext>
        </Grid>
    );

    function handleDragEnd({ over }: any) {
        setParent(over ? over.id : null);
        console.log(parent)
    }
}
