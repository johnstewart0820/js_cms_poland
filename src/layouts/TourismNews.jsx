import React from 'react';
import LoopNewsPost from "../components/news/LoopNewsPost";
import Select from "../components/form/Select";
import {withDefaultOption} from "../extra/functions";
import PaginatedPage from "../components/PaginatedPage";

export default function TourismNews(props) {
    return (
        <PaginatedPage
            page={props.page}
            config={props.page.acf.field_information_module_news}
            itemComponent={LoopNewsPost}
            containerClasses={'news'}
            containerHeader={props.page.acf.field_information_module_news?.[0]?.field_section_title_visit || null}
            inputs={[{
                label: 'Kategoria',
                name: 'categories',
                options: withDefaultOption(props.page.acf.field_news_filtering_categories.map(category => ({
                    value: category.id,
                    label: category.name,
                }))),
                Component: Select,
            }]}
            mapId={props.page.acf.field_attractions_map}
        />
    );
};
