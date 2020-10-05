import React from 'react';
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from '../components/general/Breadcrumbs';
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import {getArticleLink} from "../extra/functions";
import LoopSpaPost from "../components/spa/LoopSpaPost";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import TextLinkPic from "../components/general/TextLinkPic";
import Parser from "html-react-parser";
import {API} from "../extra/API";
import LoopAccommodationPost from "../components/accommodation/LoopAccommodationPost";

export default function TourismSpa(props) {
    const [items, setItems] = React.useState(false);

    React.useEffect(() => {
        API.getByConfig(props.page.acf.field_informations_module_sanatoriums).then(res => setItems(res.data.contents));
    }, []);

    return (
        <>
            <MainHeaderSection>
                <Breadcrumbs breadcrumbs={[
                    {label: "Visit.ustron.pl", to: "/"},
                    {label: props.page.title, to: getArticleLink(props.page)},
                ]}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <TextLinkPic
                heading={props.page.acf.field_patients_title}
                text={Parser(props.page.acf.field_patients_description)}
            />

            <OneCarouseInRow carousel={{
                extra_classes: 'arrows-on-right',
                items: props.page.acf.field_offer_for_patients,
                ItemComponent: LoopSpaPost,
            }}/>

            <TextLinkPic
                heading={props.page.acf.field_spa_town_history_title}
                text={Parser(props.page.acf.field_spa_town_history_descriprion)}
                picture={props.page.acf.field_spa_town_history_photo}
            />

            <OneCarouseInRow carousel={{
                extra_classes: 'no-arrows',
                heading: props.page.acf.field_informations_module_sanatoriums[0].field_section_title_visit,
                items: items || [],
                ItemComponent: LoopAccommodationPost,
                path_to_all: getArticleLink(props.page.acf.field_informations_module_sanatoriums[0].field_section_watch_all_entity)
            }}/>

            {/*<TwoCarouselsOneRow
                first_carousel={{
                    loading: items1 === false,
                    path_to_all: getArticleLink(acf.field_information_modules_city[0].field_section_watch_all_entity),
                    heading: acf.field_information_modules_city[0].field_section_title_visit,
                    component: LoopEventsPost,
                    items: items1 || [],
                }}
                second_carousel={{
                    loading: items2 === false,
                    path_to_all: getArticleLink(acf.field_information_modules_city[1].field_section_watch_all_entity),
                    heading: acf.field_information_modules_city[1].field_section_title_visit,
                    component: LoopNewsPost,
                    items: items2 || [],
                }}
            />

            <TextLinkExpandableInfo
                heading={acf.field_welcome_title}
                text={acf.field_welcome_description}
                link={acf.field_welcome_button_link || '#'}
                link_label={acf.field_welcome_button_title}
                expandable_label={acf.field_welcome_phones_title}
                expandable_info={phones}
            />

            <OneCarouseInRow carousel={{
                heading: acf.field_photorelations_title,
                extra_classes: "arrows-on-right",
                items: photos || [],
                ItemComponent: LoopPhotoReportPost,
            }}/>

            <AmountsWithIcon
                heading={acf.field_numbers_title}
                items={numbers}
            />

            <PicTextInfo
                heading={acf.field_turists_information_title}
                picture_url={acf.field_turists_information_image}
                text={acf.field_turists_information_description}
                href={acf.field_turists_information_button_link || '#'}
                link_label={acf.field_turists_information_button_title}
            />

            <MapWithPinsFiltering map_id={acf.field_visit_ustron_map} />

            <OneCarouseInRow carousel={{
                heading: acf.field_safe_ustron_title,
                extra_classes: "arrows-on-right",
                items: items4 || [],
                ItemComponent: LoopNewsPost,
            }}/>*/}
        </>
    );
};
