import React from 'react';
import PaginatedPage from "../components/PaginatedPage";
import useCustomField from "../hooks/useCustomField";
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";

const AttractionPage = props => {
    const recommendedFor = useCustomField('recomended_for');
    const priceVariants = useCustomField('prices_variant');
    const categories = React.useMemo(() => {
        let obj = {
            key: 'categories',
            label: 'Rodzaj',
            choices: {},
        };

        props.page.acf.field_news_filtering_categories.forEach(category => {
            obj.choices[category.id] = category.name;
        });

        return obj;
    }, []);
    const inputs = React.useMemo(() => {
        const fields = [];

        for (const field of [recommendedFor, categories, priceVariants]) {
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
    }, [recommendedFor, categories, priceVariants]);

    return (
        <PaginatedPage
            page={props.page}
            config={props.page.acf.field_information_module_news}
            inputs={inputs}
        />
    )
}

export default AttractionPage;