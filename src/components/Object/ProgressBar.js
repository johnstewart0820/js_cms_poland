import React from "react";
import '../../styles/ObjectPages/ProgressBar.scss';

const ProgressBar = ({items, progress}) => {
    return(
        <div className="progress-bar">
            {items.map((item, index) => {
                const extraClassesDot = progress >= index + 1 && 'green-dot';
                const extraClassesLine = progress >= index + 2 && 'green';
                const extraClassesItem = progress >= index + 1 && 'green-items';

                return (
                    <>
                        <div className={`progress-bar-item progress-line-${index} ${extraClassesItem}`}>
                            {item.image}
                            <div className="progress-bar-children">
                                <div className={`dot ${extraClassesDot}`}/>
                                <div className={`progress-line`}>
                                    <div className={`progress-line-inner ${extraClassesLine}`}/>
                                </div>
                            </div>
                            <p>
                                {item.name.toUpperCase()}
                            </p>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default ProgressBar;