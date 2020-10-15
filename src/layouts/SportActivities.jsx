import React from 'react';
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";
import Card from "../components/StadiumReservationComponents/Card";
import PaginatedPage from "../components/PaginatedPage";

const SportActivities = (props) => {
    const [filters, setFilters] = React.useState({
        page: 0,
    });

    const filteringCategories = React.useMemo(() => {
        let categories = props.page.acf.field_active_categories;
        let newFilters = [];

        categories.forEach(element => {
            newFilters.push({
               label: element.name,
               value: element.slug,
            });
        });

        return newFilters;
    },[filters]);

    return (
        <PaginatedPage
            page={props.page}
            filtersHeader={'filtr kategorii'}
            config={props.page.acf.field_sport_activities_information_modules}
            inputs={[{
                label: 'Kategoria',
                name: 'category_id',
                selectImageColor: 'green',
                options: withDefaultOption(filteringCategories || []),
                Component: Select,
            }]}
            itemComponent={Card}
            mapId={props.page.acf.field_active_map}
        />
    )
}

export default SportActivities;