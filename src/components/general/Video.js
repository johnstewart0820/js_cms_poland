import React from 'react';
import Parser from "html-react-parser";
import '../../styles/videos/video.scss'

const Video = ({video}) => {
    const parserVideo = Parser(video)

    return (
        <div className={'section-info'}>
            <div className={'section-title'}>
                <img alt="" src={require('../../svg/icons/logo-black.svg')}/>
                <div className={'name-info-attachment'}>FILM</div>
            </div>
            <iframe className={'video'} height={'400px'} width={'810px'}
                    src={parserVideo.props.src}>
            </iframe>
        </div>
    )
};
export default Video;
