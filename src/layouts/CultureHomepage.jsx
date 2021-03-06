import React from 'react';
import useEntitiesByConfig from "../hooks/useEntitiesByConfig";
import Breadcrumbs from "../components/general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import MainHeaderSection from "../components/header/MainHeaderSection";
import {getArticleLink} from "../extra/functions";
import LoopCard from "../components/loop/LoopCard";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import PicTextInfo from "../components/general/PicTextInfo";
import {WhiteTileMark} from "../svg/icons";
import InfoComponent from "../components/general/InfoComponent";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import TextCard from "../components/Cards/TextCard";
import useEntities from "../hooks/useEntities";

const CultureHomepage = props => {
    const acf = props.page.acf;
    const [items1, items1Loading] = useEntitiesByConfig(props.page.acf.field_information_modules_culture[0]);
    const [items2, items2Loading] = useEntitiesByConfig(props.page.acf.field_information_modules_culture[1]);
    const [photos] = useEntities(acf.field_photorelations_culture_category);

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={props.page.breadcrumb}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <TwoCarouselsOneRow
                first_carousel={{
                    loading: items1Loading,
                    path_to_all: getArticleLink(acf.field_information_modules_culture[0].field_section_watch_all_entity),
                    heading: acf.field_information_modules_culture[0].field_section_title_visit,
                    component: LoopCard,
                    items: items1?.contents || [],
                }}
                second_carousel={{
                    loading: items2Loading,
                    path_to_all: getArticleLink(acf.field_information_modules_culture[1].field_section_watch_all_entity),
                    heading: acf.field_information_modules_culture[1].field_section_title_visit,
                    component: LoopCard,
                    items: items2?.contents || [],
                }}
            />

            <InfoComponent
                containerTitle={acf.field_community_centre_title}
                imageSource={acf.field_community_centre_photo}
                description={acf.field_community_centre_description}
                buttonText={acf.field_community_centre_button_title}
                href={acf.field_community_centre_button_link}
                city={acf.field_community_centre_address}
                phone={acf.field_community_centre_phone}
                email={acf.field_community_centre_email}
                site={acf.field_community_centre_site}
            />

            <PicTextInfo
                href={acf.field_library_button_link || '#'}
                link_label={acf.field_library_button_title}
                heading={acf.field_library_title}
                heading_svg={<WhiteTileMark/>}
                text={acf.field_library_description}
                picture_url={acf.field_library_photo}
                extra_description={acf.field_library_extra_description}
            />

            <OneCarouseInRow carousel={{
                heading: acf.field_photorelations_culture_title,
                extra_classes: "arrows-on-right",
                items: photos,
                ItemComponent: LoopCard,
            }}/>

            <OneCarouseInRow carousel={{
                heading: acf.field_informations_culture_title,
                extra_classes: 'no-arrows',
                items: acf.field_informations_culture,
                ItemComponent: TextCard,
            }}/>

            <PicTextInfo
                href={acf.field_museum_button_link || '#'}
                link_label={acf.field_museum_button_title}
                heading={acf.field_museum_title}
                heading_svg={<WhiteTileMark/>}
                text={acf.field_museum_description}
                picture_url={acf.field_museum_photo}
                isLeft={true}
            />


        </>
    )
}

export default CultureHomepage;