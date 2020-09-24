import React from "react";
import '../../styles/ObjectPages/ProgressBar.scss';

const ProgressBar = ({items, progress}) => {
    return(
        <div className="progress-bar">
            {items.map((item, index) => {
                const extraClassesDot = progress >= index + 1 && 'green-dot';
                const extraClassesLine = progress >= index + 2 && 'green';

                return (
                    <>
                        {item.image}
                        <div className={`dot ${extraClassesDot}`}></div>
                        <div className={`progress-container-${index} ${extraClassesLine}`}>

                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default ProgressBar;