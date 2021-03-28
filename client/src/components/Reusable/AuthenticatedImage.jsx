import React, { useEffect, useState } from 'react';
import styled, {css} from "styled-components";
import { fetchBase64 } from 'react-fetch-image'


const AuthenticatedImage = ({src}) => {
    const [url, setUrl] = useState('')
    const fetcher = {
        url: src,
        settings: {
            headers: {
                authorization: `${localStorage.getItem('token')}`
            }
        }
    }
    useEffect(() => {
        fetchBase64({
            ...fetcher,
            ...{
                callback: (base64) => {
                    setUrl(base64)
                },
                callbackError: () => {
                }
            }
        })
    }, [src])

    return (
        <>
            <StyledImgContainer
                imageUrl={url}/>
        </>
    );
};

export default AuthenticatedImage;


const StyledImgContainer = styled.div`
  width: 100%;
  height: 248px;
  border-radius: 20px;
  filter: drop-shadow(0px 20px 60px rgba(0, 0, 0, 0.15));
  background: ${({imageUrl}) => css`url(${imageUrl})no-repeat center`};
  background-size: 100%;
  margin: 0 0 20px;

`



