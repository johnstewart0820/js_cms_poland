import React from 'react';
import DiscountCardsHeader from "../../components/discounts/DiscountCardsHeader";
import Text from "../../components/discounts/Text";
import Carousel from "../../components/carousel/Carousel";
import YellowDiscountBlock from "../../components/discounts/YellowDiscountBlock";
import '../../styles/discounts/DiscountCardsPage.scss';

const text = 'Karty dystrybuowane w ramach akcji "Wisła, Ustroń... zostaję dłużej, dostaję więcej" uprawniają turystów\n' +
    '\n' +
    'Atrakcje objęte rabatem:\n' +
    ' \n' +
    '\n' +
    'Miejska Informacja Turystyczna - 15% na zakup pamiątek;\n' +
    'Górski Park Równica - 15% na bilety do kina 7D;\n' +
    'Figle Migle - 15% na bilety wstępu;\n' +
    'Kolej linowa Czantoria - 15% na karnet całodzienny oraz na bilety na kolej linową;\n' +
    'Kolej linowa Poniwiec - 15% na bilety na kolej linową;\n' +
    'Leśny Park Niespodzianek - 15% na bilety wstępu;\n' +
    'Muzeum Ustrońskie im. J.Jarockiego i jego oddział Muzeum Zbiory Marii Skalickiej - 15% na bilety wstępu;\n' +
    'Ustrońskie Lodowisko - 15% na bilety wstępu;\n' +
    'Baseny solankowe - 15% na bilety wstępu;\n' +
    'Wintergroup - 15% na wypożyczenie sprzętu;\n' +
    'Ustrońska Ciuchcia - 15% na przejazdy ciuchcią.';

const discountsData = [
    {
        amount: '10',
        title: 'Miejska Informacja Turystyczna ',
        description: 'na zakup pamiątek '
    },
    {
        amount: '12',
        title: 'Miejska Informacja Turystyczna ',
        description: 'na zakup pamiątek '
    },
    {
        amount: '75',
        title: 'Miejska Informacja Turystyczna ',
        description: 'na zakup pamiątek '
    },
    {
        amount: '1',
        title: 'Miejska Informacja Turystyczna ',
        description: 'na zakup pamiątek '
    },
    {
        amount: '5',
        title: 'Miejska Informacja Turystyczna ',
        description: 'na zakup pamiątek '
    },
    {
        amount: '30',
        title: 'Miejska Informacja Turystyczna ',
        description: 'na zakup pamiątek '
    },
    {
        amount: '50',
        title: 'Miejska Informacja Turystyczna ',
        description: 'na zakup pamiątek '
    },
    {
        amount: '20',
        title: 'Miejska Informacja Turystyczna ',
        description: 'na zakup pamiątek '
    },
];

const DiscountCardsPage = () => {
    return(
        <>
            <DiscountCardsHeader
                breadcrumbs={[{label: "Visit.ustron.p", to: "/"}, {label: "Co zwiedzić", to: "/"}, {label: ' Aktualne promocje i  karty rabatowe', to: ''}]}
                title={'Aktualne promocje i karty rabatowe'}
                sourceImg={require('../../img/UKK-karta-awers.png')}
            />

            <Text title={'Przygotowane karty rabatowe wydawane będą od 17 grudnia w obiektach noclegowych'} description={text}/>

            <Carousel
                extra_classes={'discount-card-carousel'}
                items={discountsData}
                ItemComponent={YellowDiscountBlock}
            />
        </>
    )
}

export default DiscountCardsPage;