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
        options: [
            {value: 1, label: 'Problem with login', trigger: '6'},
            {value: 2, label: 'Report an issue ', trigger: '7'},
        ],
    },
    {
        id: '6',
        component: (<a
            href="mailto:sakooghly@gmail.com?subject=Mail from Our Site"
            target="_blank" rel="noreferrer noopener"
        >
            Email Customer Support
        </a>),
        trigger: '8'
    },
    {
        id: '7',
        component: (<a
            href="https://api.whatsapp.com/send?phone={{+37441121085}}"
            target="_blank" rel="noreferrer noopener"
        >
            WhatsApp
        </a>),
        trigger: '8'
    },
    {
        id: '8',
        message: 'Do you like to choose another option?',
        trigger: '9'
    },
    {
        id: '9',
        options: [
            {value: 'again', label: 'Yes', trigger: '4'},
            {value: 'bye', label: 'No, Thanks ', trigger: '10'},
        ]
    },
    {
        id: '10',
        message: 'Have a nice Day)) Good Bye',
        end: true,
    }
]