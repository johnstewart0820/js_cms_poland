import React from "react";
import Breadcrumbs from "../general/Breadcrumbs";
import '../../styles/discounts/DiscountCardsHeader.scss';

const DiscountCardsHeader = ({title, sourceImg, breadcrumbs}) => {
    return(
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className='discount-cards-header'>
                <div className='discount-card-header__title'>
                    <p>
                        {title}
                    </p>
                </div>
                <div className='discount-card-header__img'>
                    <img alt='' src={sourceImg || ''}/>
                </div>
            </div>
        </>
    )
}

export default DiscountCardsHeader;