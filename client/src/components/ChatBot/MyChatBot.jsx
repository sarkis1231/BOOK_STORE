import React from 'react';
import ChatBot from "react-simple-chatbot";
import {STEPS} from "./config";


const MyChatBot = () => {

    return (
        <>
            <ChatBot
                floating
                steps={STEPS}
            />
        </>
    );
};

export default MyChatBot;