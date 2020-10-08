import React from 'react';
import Card from "../StadiumReservationComponents/Card";
import '../../styles/sport/RowWithCards.scss';
import SectionHeading from "../general/SectionHeading";

const RowWithCards = ({containerTitle, items, linkToAll, headingLinkText, ...rest}) => {
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
                {items.length > 0 && items.map((item, index) => <Card key={index} extraClasses={'big-cards'}{...item}/>)}
            </div>
        </div>
    );
};

export default RowWithCards;
