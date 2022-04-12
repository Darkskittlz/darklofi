import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
    /* border-radius: 10px; */
    padding: 25px;
    display: flex;
    justify-content: center;
`

const Video = () => {
    return (
        <VideoContainer>
            <iframe width="455px" height="360" src="https://www.youtube.com/embed/J_eNHNsUKPA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </VideoContainer>
    )
}

export default Video


