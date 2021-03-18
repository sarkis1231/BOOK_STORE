import React, {createRef} from 'react';


const AuthenticatedLink = ({ url, filename, children }) => {
    const link = createRef()
    const authHeaders = {
        Authorization: localStorage.getItem('token')
    }

    const handleAction = async () => {
        if (link.current.href) { return }

        const result = await fetch(url, {
            headers: {...authHeaders}
        })

        const blob = await result.blob()
        const href = window.URL.createObjectURL(blob)

        link.current.download = filename
        link.current.href = href

        link.current.click()
    }

    return (
        <>
            {/*eslint-disable-next-line*/}
            <a noHref style={{width: "100%"}}  target="_blank"
               rel="noreferrer noopener" ref={link} onClick={handleAction}>{children}</a>
        </>
    )
};

export default AuthenticatedLink;
