import React from 'react';
import useEntities from "../hooks/useEntities";
import BikeRoutesCard from "../components/Cards/BikeRoutesCard";
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";
import useCustomField from "../hooks/useCustomField";
import PaginatedPage from "../components/PaginatedPage";

const SportBikesPage = props => {
    const recommendedFor = useCustomField('recomended_for');
    const trailsInfoDifficulty = useCustomField('trails_info_difficulty');

    const inputs = React.useMemo(() => {
        const fields = [];

        for (const field of [recommendedFor, trailsInfoDifficulty]) {
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
    },[recommendedFor]);

    return (
        <>
            <PaginatedPage
                page={props.page}
                filtersHeader={props.page.acf.field_bike_trails_title || null}
                config={props.page.acf.field_bike_trails_impormation_modules}
                itemComponent={BikeRoutesCard}
                mapId={props.page.acf.field_bikes_map}
                inputs={inputs}
            />
        </>
    )
}

export default SportBikesPage;