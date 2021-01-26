import {useState} from "react";

export default function useFile(defaultFileName = 'Choose a book') {
    const [fileName, setFileName] = useState(defaultFileName)
    const [file, setFile] = useState({})

    const handleBookFileChange = (e) => {
        if (e.target.files[0].type === 'application/pdf') {
            if (e.target.files[0].name.length > 12) {
                setFileName(() => `${e.target?.files[0].name.substring(0, 9).trim()}${e.target.files[0].name.match(/\.[0-9a-z]+$/i)}`)
            } else {
                setFileName(() => e.target.files[0].name)
            }
            setFile(() => e.target.files[0])
        }
    }
    return [handleBookFileChange, fileName, file, setFileName]
}