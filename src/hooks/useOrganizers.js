import React from "react";
import {API} from "../extra/API";

export default function useOrganizers(forSelect = false) {
    const [organizers, setOrganizers] = React.useState(null);

    React.useEffect(() => {
        API.getOrganizers()
            .then(response => {
                setOrganizers(forSelect
                    ? response.data.organizers.map(organizer => ({
                        key: organizer.id,
                        value: organizer.id,
                        label: organizer.name,
                    }))
                    : response.data.organizers
                );
            })
            .catch(error => {
                console.error(error);
                setOrganizers(false);
            });
    }, []);

    return organizers;
};
