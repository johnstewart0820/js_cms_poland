import React from "react";
import {API} from "../extra/API";

export default function useCustomField(field) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        API.getCustomField(field)
            .then(res => setData(res.data.field))
            .catch(err => {
                console.error(err);
                setData(false);
            });
    }, []);

    return data;
};
