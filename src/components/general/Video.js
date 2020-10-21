import React from 'react';
import Parser from "html-react-parser";

const Video = ({video}) => {
    const parserVideo = Parser(video)
    return (

            <iframe height={parserVideo.props.height} width={parserVideo.props.width}
                    src={parserVideo.props.src}>
            </iframe>

    )
};


export default Video;
