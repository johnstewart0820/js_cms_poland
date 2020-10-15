import React from 'react';
import Card from "../components/StadiumReservationComponents/Card";
import PaginatedPage from "../components/PaginatedPage";

const SportTenisCourts = (props) => (
    <PaginatedPage
        page={props.page}
        containerHeader={props.page.acf.field_tennis_courts_title || null}
        config={props.page.acf.field_tenis_courts_information_modules}
        itemComponent={Card}
        mapId={props.page.acf.field_tennis_courts_map}
    />
)

export default SportTenisCourts;