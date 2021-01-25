import React from "react";

export const STEPS = [
    {
        id: '1',
        message: 'Hello there What is your name?',
        trigger: '2',
    },
    {
        id: '2',
        user: true,
        trigger: '3',
    },
    {
        id: '3',
        message: `Hi {previousValue}, nice to meet you!, How Can I Help You?`,
        trigger: '4',
    },
    {
        id: '4',
        // user: true,
        options: [
            { value: 1, label: 'Problem with login', trigger: '6' },
            { value: 2, label: 'Report an issue ', trigger: '7' },
        ],
    },
    {
        id: '6',
        component:(<a
            href="mailto:sakooghly@gmail.com?subject=Mail from Our Site"
            target="_blank" rel="noreferrer noopener"
        >
            Email Customer Support
        </a>),
        end: true,
    },
    {
        id:'7',
        component:(<a
            href="https://api.whatsapp.com/send?phone={{+37441121085}}"
            target="_blank" rel="noreferrer noopener"
        >
            WhatsApp
        </a>),
    },
]