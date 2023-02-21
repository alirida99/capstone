import { Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { MessageTexter, SlideshowContainer } from "../../../styles/slideShow";

const messages = [
    "Welcome to E-BOARD ! ",
    "Understand programming & write basic code",
    "New to coding? Start here !",
    "Find your future career!",
    "Apply key programming concepts.",
    "Get an overview on popular languages.",
];
export default function SlideShow() {
    const containerRef = useRef();
    const [show, setShow] = useState(true);
    const [messageIndex, setMessageIndex] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);
        const intervalId = setInterval(() => {
            // get next message
            setMessageIndex((i) => (i + 1) % messages.length);

            // slide the message in
            setShow(true);

            setTimeout(() => {
                setShow(false);
            }, 3000);
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <SlideshowContainer ref={containerRef} overflow="hidden">
            <Slide
                direction={show ? "left" : "right"}
                in={show}
                container={containerRef.current}
                timeout={{
                    enter: 500,
                    exit: 100,
                }}
            >
                <Box display="flex" justifyContent="center" alignItems="center">
                    <MessageTexter>
                        {messages[messageIndex]}
                    </MessageTexter>
                </Box>
            </Slide>
        </SlideshowContainer>
    );
}