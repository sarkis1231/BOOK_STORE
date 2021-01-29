import {useState, useCallback} from "react";

export default function useFile(defaultFileName = 'Choose a book', filetype, errorMessage, change) {
    const [fileName, setFileName] = useState(defaultFileName)
    const [file, setFile] = useState({})
    const [error, setError] = useState({message: ''})

    const handleBookFileChange = useCallback(async (e) => {
        if (filetype.includes(e.target.files[0]?.type)) {
            setError({})
            if (e.target.files[0].name.length > 12) {
               await setFileName(() => `${e.target?.files[0].name.substring(0, 9).trim()}${e.target.files[0].name.match(/\.[0-9a-z]+$/i)}`)
            } else {
               await setFileName(() => e.target.files[0].name)
            }
            setFile(() => e.target.files[0])

        } else {
            setError(prev => ({...prev, message: errorMessage}))
        }

    }, [errorMessage, filetype])

    const reset = (defaultFileName) => {
        setFileName(defaultFileName)
        setFile(() => {})
    }
    return [handleBookFileChange, fileName, file, error, reset]
}