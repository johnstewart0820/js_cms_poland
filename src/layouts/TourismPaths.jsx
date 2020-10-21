import React from 'react';
import Select from "../components/form/Select";
import {withDefaultOption} from "../extra/functions";
import PaginatedPage from "../components/PaginatedPage";
import useCustomField from "../hooks/useCustomField";

export default function TourismPaths(props) {
    const recommendedFor = useCustomField('recomended_for');
    const categories = React.useMemo(() => {
        let obj = {
            key: 'categories',
            label: 'Rodzaj',
            choices: {},
        };

        props.page.acf.field_information_modules_attractions[0].field_section_categories_visit.forEach(category => {
            obj.choices[category.id] = category.name;
        });

        return obj;
    }, []);
    const inputs = React.useMemo(() => {
        const fields = [];

        for (const field of [categories, recommendedFor]) {
            if (!field)
                return null;

            fields.push({
                label: field.label,
                name: field.key,
                options: withDefaultOption(Object.keys(field.choices).map(key => ({value: key, label: field.choices[key]}))),
                Component: Select,
            });
        }

        return fields;
    }, [categories, recommendedFor]);

    return (
        <PaginatedPage
            page={props.page}
            config={props.page.acf.field_information_modules_attractions}
            containerClasses={'news'}
            containerHeader={props.page.acf.field_information_modules_attractions?.[0]?.field_section_title_visit || null}
            inputs={inputs}
            mapId={props.page.acf.field_attractions_map}
        />
    );
};
