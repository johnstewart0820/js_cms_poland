import React from "react";
import SiteInfoContext from "../constants/SiteInfoContext";
import Loader from "../components/general/Loader";
import Layouts from "../constants/Layouts";
import NotFoundPage from "../pages/NotFoundPage";

export default function PageRenderer(props) {
    const pageData = React.useContext(SiteInfoContext).page;

    // null while loading
    if (pageData === null)
        return <Loader/>;

    // 404 if no page found in DB
    if (!pageData)
        return <NotFoundPage/>;

    let layoutValue;

    switch (pageData.post_type) {
        case 'apartments':
            layoutValue = 'apartament_single';
            break;
        case 'restaurants':
            layoutValue = 'gastronomy_single';
            break;
        case 'attractions':
            layoutValue = 'attractions_single';
            break;
        case 'news':
            layoutValue = 'news_single';
            break;
        case 'events':
            layoutValue = 'events_single';
            break;
        case 'page':
            layoutValue = pageData.acf['field_layout'];
            break;
        case 'courts':
            layoutValue = 'courts_single';
            break;
        default:
            layoutValue = 'default_single';
    }

    const Layout = Layouts[layoutValue];

    if (!Layout) {
        console.error(`Could not render layout [${layoutValue}]`);
        return <NotFoundPage/>;
    }

    return <Layout {...props} page={pageData}/>;
}
