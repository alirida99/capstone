import React, { useState, useRef } from 'react';
import styles from './exam.module.scss'
// import './App.css';

const DragAndDrop = () => {

    const [widgets, setWidgets] = useState<string[]>([]);

    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        console.log("widgetType", widgetType);
        setWidgets([...widgets, widgetType]);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault;
    }

    return (
        <>
            <div>
                <div>
                    <div
                        style={{ width: '50px', height: '50px' }}
                        draggable
                        onDragStart={(e: any) => handleOnDrag(e, "Widget A")}>
                        Widget A
                    </div>
                    <div
                        style={{ width: '50px', height: '50px' }}
                        draggable
                        onDragStart={(e: any) => handleOnDrag(e, "Widget B")}>
                        Widget B
                    </div>
                    <div
                        style={{ width: '50px', height: '50px' }}
                        draggable
                        onDragStart={(e: any) => handleOnDrag(e, "Widget C")}>
                        Widget C
                    </div>
                </div>
                <div className={styles.drop} onDrop={handleOnDrop} onDragOver={handleDragOver}>
                    {widgets.map((widget: any, index: any) => (
                        <div key={index}>
                            {widget}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default DragAndDrop;
