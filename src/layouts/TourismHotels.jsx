import React from "react";
import PaginatedPage from "../components/PaginatedPage";
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";
import useCustomField from "../hooks/useCustomField";

export default function TourismHotels(props) {
    const acf = props.page.acf;
    const recommendedFor = useCustomField('recomended_for');
    const pricesVariant = useCustomField('prices_variant');
    const facilities = useCustomField('facilities_apartments');
    const categories = React.useMemo(() => {
        let obj = {
            key: 'categories',
            label: 'Rodzaj',
            choices: {},
        };

        acf.field_information_modules_attractions[0].field_section_categories_visit.forEach(category => {
            obj.choices[category.id] = category.name;
        });

        return obj;
    }, []);
    const inputs = React.useMemo(() => {
        const fields = [];

        for (const field of [categories, recommendedFor, pricesVariant, facilities]) {
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
    }, [categories, recommendedFor, pricesVariant, facilities]);

    return (
        <PaginatedPage
            page={props.page}
            config={acf.field_information_modules_attractions}
            filtersHeader={'NOCLEGI'}
            inputs={inputs}
            mapId={acf.field_attractions_map}
        />
    );
};
