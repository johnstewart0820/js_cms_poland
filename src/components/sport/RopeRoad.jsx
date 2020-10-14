import React from 'react';
import SectionHeading from "../general/SectionHeading";
import RopeRoadCard from "./RopeRoadCard";
import '../../styles/sport/RopeRoad.scss';

const RopeRoad = ({heading, headingText, items}) => {
    return (
        <div className='rope-road-row'>
            <div className='rope-road-head'>
                <SectionHeading
                    heading={heading}
                    headingText={headingText}
                />
            </div>
            <div className='rope-road-body'>
                {items?.length > 0 && items.map((item, index) => {
                    const newItem = item.acf;

                    if (index + 1 > 3)
                        return;

                    return(
                        <RopeRoadCard
                            key={index}
                            {...item}
                            {...newItem}
                            article={item}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default RopeRoad;