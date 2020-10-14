import React from "react";
import Breadcrumbs from "../components/general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import MainHeaderSection from "../components/header/MainHeaderSection";
import {getArticleLink} from "../extra/functions";
import LoopEventsPost from "../components/events/LoopEventsPost";
import LoopNewsPost from "../components/news/LoopNewsPost";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import RopeRoad from "../components/sport/RopeRoad";
import PicTextInfo from "../components/general/PicTextInfo";
import LinksTiles from "../components/general/LinksTiles";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Card from "../components/StadiumReservationComponents/Card";
import useEntities from "../hooks/useEntities";
import useEntitiesByConfig from "../hooks/useEntitiesByConfig";
import BikeRoutesCard from "../components/Cards/BikeRoutesCard";
import {
    IceSkatesIcon,

} from '../svg/icons';
import LoopCard from "../components/loop/LoopCard";

const SportHomepage = props => {
    const acf = props.page.acf;
    const [items1, items1Loading] = useEntitiesByConfig(props.page.acf.field_information_modules_sport[0]);
    const [items2, items2Loading] = useEntitiesByConfig(props.page.acf.field_information_modules_sport[1]);
    const [cableWays, cableWaysLoading] = useEntities(props.page.acf.field_cableways_categories);
    const [activities, activitiesLoading] = useEntities(props.page.acf.field_active_categories);
    const [courts, courtsLoading] = useEntities(props.page.acf.field_sports_ground_categories);
    const [bikeTrails, bikeTrailsLoading] = useEntities(props.page.acf.field_bike_trails_categories);
    const [tennisCourts, tennisCourtsLoading] = useEntities(props.page.acf.field_tennis_courts_categories);

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{label: "sport.ustron.pl "}]}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <TwoCarouselsOneRow
                first_carousel={{
                    loading: items1Loading,
                    path_to_all: getArticleLink(acf.field_information_modules_sport[0].field_section_watch_all_entity),
                    heading: acf.field_information_modules_sport[0].field_section_title_visit,
                    component: LoopCard,
                    items: items1?.contents || [],
                }}
                second_carousel={{
                    loading: items2Loading,
                    path_to_all: getArticleLink(acf.field_information_modules_sport[1].field_section_watch_all_entity),
                    heading: acf.field_information_modules_sport[1].field_section_title_visit,
                    component: LoopCard,
                    items: items2?.contents || [],
                }}
            />

            <OneCarouseInRow carousel={{
                loading: courtsLoading,
                extra_classes: 'no-arrows',
                items: courts?.contents || [],
                heading: props.page.acf.field_sports_ground_title,
                path_to_all: getArticleLink(props.page.acf.field_sports_ground_page),
                ItemComponent: Card,
            }}/>

            {!cableWaysLoading && cableWays?.contents?.length && (
                <RopeRoad
                    heading={acf.field_cableways_title}
                    headingText={acf.field_cableways_description}
                    items={cableWays.contents}
                />
            )}

            <PicTextInfo
                href={acf.field_icerink_button_link || '#'}
                link_label={acf.field_icerink_button_title}
                heading={acf.field_icerink_title}
                heading_svg={<IceSkatesIcon/>}
                text={acf.field_icerink_description}
                picture_url={acf.field_icerink_photo}
                extra_description={acf.field_icerink_extra_description}
            />

            <OneCarouseInRow carousel={{
                loading: activitiesLoading,
                extra_classes: 'no-arrows',
                items: activities?.contents || [],
                heading: props.page.acf.field_active_title,
                path_to_all: getArticleLink(props.page.acf.field_active_page),
                ItemComponent: Card,
            }}/>

            <OneCarouseInRow carousel={{
                loading: bikeTrailsLoading,
                extra_classes: 'no-arrows',
                items: bikeTrails?.contents || [],
                heading: props.page.acf.field_bike_trails_title,
                path_to_all: getArticleLink(props.page.acf.field_bike_trails_page),
                ItemComponent: BikeRoutesCard,
            }}/>

            <OneCarouseInRow carousel={{
                loading: tennisCourtsLoading,
                extra_classes: 'no-arrows',
                items: tennisCourts?.contents || [],
                heading: props.page.acf.field_tennis_courts_title,
                path_to_all: getArticleLink(props.page.acf.field_tennis_courts_page),
                ItemComponent: Card,
            }}/>

            <LinksTiles
                heading={acf.field_practical_information_title}
                links={acf.field_practical_information.map(item => ({
                    href: item.field_information_link || '',
                    label: item.field_information_description,
                }))}
            />
        </>
    )
}

export default SportHomepage;
