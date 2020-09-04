import React from 'react';
import MapWithPinsFiltering from "../../components/map/MapWithPinsFiltering";
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PlanerListContainer from "../../components/PlanerList/PlanerListContainer";
import PlanerItem from "../../components/PlanerList/PlanerItem";

const items = [
    {
        id: 1,
        time: 10,
        description: 'Działaj Lokalnie 2020 - nabór wniosków',
        category: '',
    },
    {
        id: 2,
        time: 5,
        description: 'Działaj Lokalnie 2020 - nabór wniosków',
        category: '',
    },
    {
        id: 3,
        time: 30,
        description: 'Działaj Lokalnie 2020 - nabór wniosków',
        category: '',
    },
    {
        id: 4,
        time: 20,
        description: 'Działaj Lokalnie 2020 - nabór wniosków',
        category: '',
    },
    {
        id: 5,
        time: 15,
        description: 'Działaj Lokalnie 2020 - nabór wniosków',
        category: '',
    },
    {
        id: 6,
        time: 18,
        description: 'Działaj Lokalnie 2020 - nabór wniosków',
        category: '',
    },
    {
        id: 7,
        time: 5,
        description: 'Działaj Lokalnie 2020 - nabór wniosków',
        category: '',
    },
    {
        id: 8,
        time: 35,
        description: 'Działaj Lokalnie 2020 - nabór wniosków',
        category: '',
    },
];

const PlanerListPage = () => {

    return(
        <>
            <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: " Jak dojechać", to: "/" }, {label: 'Wynik'}]} />

            <PlanerListContainer title={'PLANER PODROZY'}>
                {items.map((item, index) => (
                    <PlanerItem
                        key={index}
                        duration={item.time}
                        description={item.description}
                    />
                ))}
            </PlanerListContainer>

            <MapWithPinsFiltering type="attractions" />
        </>
    )
}

export default PlanerListPage;