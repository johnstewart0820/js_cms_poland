import React from "react";
import {useParams} from "react-router-dom";
import SiteInfoContext from "../constants/SiteInfoContext";
import {API} from "./API";
import Loader from "../components/general/Loader";
import Layouts from "../constants/Layouts";

export default function PageRenderer(props) {
    const {pageId} = useParams();
    const defaultContent = React.useContext(SiteInfoContext).site_info.default_content;
    const [pageData, setPageData] = React.useState(null);

    React.useEffect(() => {
        if (!pageId) {
            // no page id = home page
            setPageData(defaultContent);
            return;
        }

        API.getPost(pageId)
            .then(res => setPageData(res.data.content))
            .catch(e => {
                setPageData(false);
                console.log(e);
            });
    }, [pageId, defaultContent?.id]);

    // null while loading
    if (pageData === null)
        return <Loader/>;

    // false if something wrong
    if (!pageData)
        return null;

    const layoutValue = pageData.acf['field_layout'];
    const Layout = Layouts[layoutValue];

    if (!Layout) {
        console.warn(`Could not render layout [${layoutValue}]`);
        return null;
    }

    return <Layout {...props} page={pageData} />;
}