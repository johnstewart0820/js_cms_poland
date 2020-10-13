import React from "react";
import {API} from "../extra/API";

export default function useEntities(config) {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        // if config is array, assume it is array of categories
        API.getEntities(Array.isArray(config) ? {categories: config} : config)
            .then(res => setData(res.data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return [data, loading, error];
};
