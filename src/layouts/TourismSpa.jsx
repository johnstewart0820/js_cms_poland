import React from 'react';
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from '../components/general/Breadcrumbs';
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import {getArticleLink} from "../extra/functions";
import LoopSpaPost from "../components/spa/LoopSpaPost";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";

export default function TourismSpa(props) {
    const acf = props.page.acf;

    /*const [items1, setItems1] = React.useState(false);
    const [items2, setItems2] = React.useState(false);
    const [photos, setPhotos] = React.useState(false);
    const [items4, setItems4] = React.useState(false);

    const phones = React.useMemo(() => {
        return acf.field_welcome_phones_description.split('<br />').map(row => {
            row = row.split(' ')
            return {
                big: row.shift(),
                small: row.join(' '),
            };
        });
    }, []);
    const numbers = React.useMemo(() => {
        return acf.field_numbers.map(item => ({
            label: item.field_numbers_before_icon_text,
            image: item.field_numbers_icon,
            which: item.field_numbers_after_icon_text,
        }));
    }, []);

    React.useEffect(() => {
        API.getByConfig(acf.field_information_modules_city[0]).then(res => setItems1(res.data.contents));
        API.getByConfig(acf.field_information_modules_city[1]).then(res => setItems2(res.data.contents));
        API.getEntities({categories: acf.field_photorelations_category}).then(res => setPhotos(res.data.contents));
        API.getEntities({categories: acf.field_safe_ustron_category}).then(res => setItems4(res.data.contents));
    }, []);*/

    return (
        <>
            <MainHeaderSection>
                <Breadcrumbs breadcrumbs={[
                    {label: "Visit.ustron.pl", to: "/"},
                    {label: props.page.title, to: getArticleLink(props.page)},
                ]}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <OneCarouseInRow carousel={{
                extra_classes: 'arrows-on-right',
                heading: props.page.acf.field_patients_title,
                items: props.page.acf.field_offer_for_patients,
                ItemComponent: LoopSpaPost,
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
