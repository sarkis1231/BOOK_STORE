import React, {useState} from 'react';
import ChatBot from "react-simple-chatbot";
import {STEPS} from "./config";


const MyChatBot = () => {
    const [opened, setOpened] = useState(false)
    const [key, setKey] = useState(0)
    const handleEnd = (renderedSteps, steps, values) => {
        if (values[2] === 'bye') {
            setTimeout(() => {
                setOpened(() => false)
                setKey(() => Math.round(Math.random() * 1000000000))
            }, 1500);
        }
    }

    return (
        <>
            <ChatBot
                key={key}
                floating
                steps={STEPS}
                handleEnd={({renderedSteps, steps, values}) => handleEnd(renderedSteps, steps, values)}
                opened={opened}
                toggleFloating={() => setOpened(prev => !prev)}
            />
        </>
    );
}

export default MyChatBot;