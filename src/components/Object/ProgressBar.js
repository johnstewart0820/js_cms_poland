import React from "react";
import '../../styles/ObjectPages/ProgressBar.scss';

const Breakpoints = [
    {
        title: 'zolupa',
        progress: 50,
    },
    {
        title: 'gaeeee',
        progress: 75,
    },
];

const sortBreakpoints = arr => arr.sort((a, b) => a.progress - b.progress);

const ProgressBar = props => {
    const {bgcolor, completed} = props;

    let segment;
    for (const breakpoint of Breakpoints) {
        if (completed <= breakpoint.progress)
            segment = breakpoint;
    }

    return(
        <div className="progress-bar">
            <div className='dot'>

            </div>
            <div className="progress-container">
                {completed > 25 && (
                    <div style={{width: `${completed}%`, backgroundColor: bgcolor,}} className="filler">

                    </div>
                )}
            </div>
            <div className='dot'>

            </div>
            <div className="progress-container">
                {completed > 50 && (
                    <div style={{width: `${completed}%`, backgroundColor: bgcolor,}} className="filler">

                    </div>
                )}
            </div>
            <div className='dot'>

            </div>
            <div className="progress-container">
                {completed > 75 && (
                    <div style={{width: `${completed}%`, backgroundColor: bgcolor,}} className="filler">

                    </div>
                )}
            </div>
            <div className='dot'>

            </div>
            <div className="progress-container">
                {completed > 100 && (
                    <div style={{width: `${completed}%`, backgroundColor: bgcolor,}} className="filler">

                    </div>
                )}
            </div>
            <div className='dot'>

            </div>
        </div>
    )
}

export default ProgressBar;