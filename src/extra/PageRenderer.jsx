import React from "react";
import {useParams} from "react-router-dom";
import SiteInfoContext from "../constants/SiteInfoContext";
import {API} from "./API";
import Loader from "../components/general/Loader";
import Layouts from "../constants/Layouts";
import NotFoundPage from "../pages/NotFoundPage";

export default function PageRenderer(props) {
    const {locale, slug} = useParams();
    const siteInfo = React.useContext(SiteInfoContext).site_info;
    const [pageData, setPageData] = React.useState(null);

    React.useEffect(() => {
        if (!locale || !siteInfo.languages.split(',').includes(locale)) {
            /* show 404 if invalid locale */
            setPageData(false);
            return;
        }

        if (!slug) {
            // no page id/slug = home page
            setPageData(siteInfo.default_content);
            console.info('PAGE DATA', siteInfo.default_content);
            return;
        }

        API.getPost(slug)
            .then(res => {
                setPageData(res.data.content);
                console.info('PAGE DATA', res.data.content);
            })
            .catch(e => {
                setPageData(false);
                console.log(e);
            });
    }, [locale, slug, siteInfo.default_content?.id]);

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
    else if (pageData.post_type === 'attractions')
        layoutValue = 'attractions_single';
    else
        layoutValue = pageData.acf['field_layout'];
    const Layout = Layouts[layoutValue];

    if (!Layout) {
        console.error(`Could not render layout [${layoutValue}]`);
        return <NotFoundPage/>;
    }

    return <Layout {...props} page={pageData} />;
}
