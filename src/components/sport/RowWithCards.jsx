import React from 'react';
import Card from "../StadiumReservationComponents/Card";
import '../../styles/sport/RowWithCards.scss';
import SectionHeading from "../general/SectionHeading";

const RowWithCards = ({containerTitle, items, linkToAll, headingLinkText, ...rest}) => {
    console.log(items)
    return (
        <div className='row-cards-container'>
            <div className='row-cards-title'>
                <SectionHeading
                    heading={containerTitle}
                    headingLink={linkToAll}
                    headingLinkText={headingLinkText}
                />
            </div>
            <div className='row-cards'>
                {items.length > 0 && items.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            address={item.address}
                            title={item.title}
                            extraClasses={'big-cards'}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default RowWithCards;