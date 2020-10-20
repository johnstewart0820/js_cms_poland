import React from 'react';
import useEntitiesByConfig from "../hooks/useEntitiesByConfig";
import Breadcrumbs from "../components/general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import MainHeaderSection from "../components/header/MainHeaderSection";
import {getArticleLink} from "../extra/functions";
import LoopCard from "../components/loop/LoopCard";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import PicTextInfo from "../components/general/PicTextInfo";
import {IceSkatesIcon} from "../svg/icons";

const CultureHomepage = props => {
    const acf = props.page.acf;
    const [items1, items1Loading] = useEntitiesByConfig(props.page.acf.field_information_modules_culture[0]);
    const [items2, items2Loading] = useEntitiesByConfig(props.page.acf.field_information_modules_culture[1]);

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

        </>
    )
}

export default CultureHomepage;