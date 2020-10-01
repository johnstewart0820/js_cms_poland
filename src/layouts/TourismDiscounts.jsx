import React from 'react';
import DiscountCardsHeader from "../components/discounts/DiscountCardsHeader";
import Carousel from "../components/carousel/Carousel";
import YellowDiscountBlock from "../components/discounts/YellowDiscountBlock";
import Parser from "html-react-parser";
import '../styles/discounts/DiscountCardsPage.scss';
import SingleContainer from "../components/common-single/SingleContainer";
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from "../components/general/Breadcrumbs";
import NewsSingleHead from "../components/news/NewsSingleHead";

export default function TourismDiscounts(props) {
    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[
                    {label: "Visit.ustron.p", to: "/"},
                    {label: props.page.title},
                ]}/>
                <NewsSingleHead {...props.page}/>
            </MainHeaderSection>

            <SingleContainer extra_classes="single-news-container">
                <div>{Parser(props.page.acf.field_post_description)}</div>
            </SingleContainer>

            {props.page.acf.field_information_modules_promotions && (
                <Carousel
                    extra_classes={'discount-card-carousel'}
                    items={props.page.acf.field_information_modules_promotions}
                    ItemComponent={YellowDiscountBlock}
                />
            )}
        </>
    );
};
