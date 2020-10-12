import React from "react";
import {API} from "../extra/API";

export default function useEntitiesByConfig(config, filters) {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        API.getByConfig(config, filters)
            .then(res => setData(res.data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, [filters]);

    return [data, loading, error];
};
