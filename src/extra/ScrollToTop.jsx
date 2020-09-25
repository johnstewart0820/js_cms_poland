import React from "react";
import {useLocation} from "react-router-dom";

export default function ScrollToTop({children}) {
    const location = useLocation();
    // Scroll to top if path changes
    React.useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return children;
};
