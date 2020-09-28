import React from 'react';
import LoopPhotoReportPost from "../components/photoreports/LoopPhotoReportPost";
import PaginatedPage from "../components/PaginatedPage";
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";

export default function PhotoReportsPage(props) {
    const inputs = React.useMemo(() => ([{
        name: 'categories',
        label: 'Kategoria',
        options: withDefaultOption(props.page.acf.field_information_modules_photorelations[0].field_section_categories_visit.map(category => ({
            key: category.id,
            value: category.id,
            label: category.name,
        }))),
        Component: Select,
    }]), []);

    return (
        <PaginatedPage
            page={props.page}
            config={props.page.acf.field_information_modules_photorelations}
            itemComponent={LoopPhotoReportPost}
            containerClasses={'photo-reports'}
            inputs={inputs}
            mapId={props.page.acf.field_attractions_map}
        />
    );
};
