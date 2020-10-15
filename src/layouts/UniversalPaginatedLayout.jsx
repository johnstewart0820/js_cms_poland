import React from "react";
import PaginatedPage from "../components/PaginatedPage";
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";

export default function UniversalPaginatedLayout(props) {
    const inputs = React.useMemo(() => {
        const categories = props.page.acf.field_universal_information_module_categories;
        if (!props.page.acf.field_universal_information_module_show_filters || !categories?.length)
            return undefined;

        return [{
            label: 'Kategoria',
            name: 'categories',
            options: withDefaultOption(categories.map(category => ({
                value: category.id,
                label: category.name,
            }))),
            Component: Select,
        }];
    }, []);

    return (
        <PaginatedPage
            containerClasses={'wider'}
            descriptionClasses={'pb-sm'}
            page={props.page}
            config={{
                field_section_title_visit: '',
                field_section_categories_visit: props.page.acf.field_universal_information_module_categories,
                field_section_sorting_visit: props.page.acf.field_universal_information_module_orderby,
                field_section_order_visit: props.page.acf.field_universal_information_module_order,
                field_section_posts_count_visit: props.page.acf.field_universal_information_module_count,
                field_section_watch_all_entity: null,
            }}
            containerHeader={props.page.acf.field_universal_information_module_title || ''}
            description={props.page.acf.field_universal_information_module_description || ''}
            inputs={inputs}
            mapId={props.page.acf.field_universal_information_module_map_id || null}
        />
    );
};
