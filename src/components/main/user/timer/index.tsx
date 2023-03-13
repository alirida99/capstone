import React, { useState, useEffect, useRef } from 'react'
// import './styles.css'

const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
}


export default function CountdownApp(props: any) {
    const INITIAL_COUNT = props.time
    const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
    const [status, setStatus] = useState(STATUS.STOPPED)

    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

    useEffect(() => {
        setStatus(STATUS.STARTED)
    }, [])
    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
            } else {
                setStatus(STATUS.STOPPED)
            }
        },
        status === STATUS.STARTED ? 1000 : null,
        // passing null stops the interval
    )
    return (
        <div className="App">
            <div style={{ padding: 20 }}>
                {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
                {twoDigits(secondsToDisplay)}
            </div>
        </div>
    )
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: any, delay: any) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num: any) => String(num).padStart(2, '0')
