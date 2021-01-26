import {useState} from "react";

export default function useFile(defaultFileName = 'Choose a book') {
    const [fileName, setFileName] = useState(defaultFileName)
    const [file, setFile] = useState({})
    const [error, setError] = useState({message:''})

    const handleBookFileChange = (e) => {
        if (e.target.files[0].type === 'application/pdf') {
            setError({})
            if (e.target.files[0].name.length > 12) {
                setFileName(() => `${e.target?.files[0].name.substring(0, 9).trim()}${e.target.files[0].name.match(/\.[0-9a-z]+$/i)}`)
            } else {
                setFileName(() => e.target.files[0].name)
            }
            setFile(() => e.target.files[0])

        } else {
            console.log('working')
            setError(prev => ({...prev, message: 'The file type should be PDF'}))
        }

    }
    console.log(error)
    return [handleBookFileChange, fileName, file, error, setFileName]
}