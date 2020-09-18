import React from "react";
import {useParams} from "react-router-dom";
import SiteInfoContext from "../constants/SiteInfoContext";
import {API} from "./API";
import Loader from "../components/general/Loader";
import Layouts from "../constants/Layouts";
import NotFoundPage from "../pages/NotFoundPage";
import {SITE} from "./site_settings";

export default function PageRenderer(props) {
    const {pageId, slug} = useParams();
    const defaultContent = React.useContext(SiteInfoContext).site_info.default_content;
    const [pageData, setPageData] = React.useState(null);

    React.useEffect(() => {
        if (!pageId && !slug) {
            // no page id/slug = home page
            setPageData(defaultContent);
            console.info('PAGE DATA', defaultContent);
            return;
        }

        API.getPost(pageId || slug)
            .then(res => {
                console.log(slug)
                setPageData(res.data.content);
                console.info('PAGE DATA', res.data.content);
            })
            .catch(e => {
                setPageData(false);
                console.log(e);
            });
    }, [pageId, slug, defaultContent?.id]);

    // null while loading
    if (pageData === null)
        return <Loader/>;

    // 404 if no page found in DB
    if (!pageData)
        return <NotFoundPage/>;

    let layoutValue;
    if (pageData.post_type === 'news')
        layoutValue = 'news_single';
    else if (pageData.post_type === 'events')
        layoutValue = 'events_single';
    else
        layoutValue = pageData.acf['field_layout'];
    const Layout = Layouts[layoutValue];

    if (!Layout) {
        console.error(`Could not render layout [${layoutValue}]`);
        return null;
    }

    return <Layout {...props} page={pageData} />;
}
