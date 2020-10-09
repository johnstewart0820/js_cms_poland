import React from 'react';
import SectionHeading from "../general/SectionHeading";
import RopeRoadCard from "./RopeRoadCard";
import '../../styles/sport/RopeRoad.scss';

const RopeRoad = ({heading, headingText, items, ...rest}) => {
    return (
        <div className='rope-road-row'>
            <div className='rope-road-head'>
                <SectionHeading
                    heading={heading}
                    headingText={headingText}
                />
            </div>
            <div className='rope-road-body'>
                {items.length > 0 && items.map((item, index) => {
                    if (index + 1 > 3)
                        return;

                    return(
                        <RopeRoadCard
                            key={index}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default RopeRoad;