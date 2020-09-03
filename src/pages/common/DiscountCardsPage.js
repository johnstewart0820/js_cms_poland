import React from 'react';
import DiscountCardsHeader from "../../components/discounts/DiscountCardsHeader";

const DiscountCardsPage = () => {
    return(
        <>
            <DiscountCardsHeader
                breadcrumbs={[{label: "Visit.ustron.p", to: "/"}, {label: "Co zwiedzić", to: "/"}, {label: ' Aktualne promocje i  karty rabatowe', to: ''}]}
                title={'Aktualne promocje i karty rabatowe'}
                sourceImg={require('../../img/UKK-karta-awers.png')}
            />


        </>
    )
}

export default DiscountCardsPage;