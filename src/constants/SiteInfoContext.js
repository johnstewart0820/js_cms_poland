import React from 'react';
import {API} from "../extra/API";
import {SITE, SITES_DOMAIN} from "../extra/site_settings";
import {isContrastThemeOn, turnOnContrastTheme} from "../extra/theme";
import FullPageLoader from '../components/general/FullPageLoader';
import LocalStorage from "./LocalStorage";
import moment from 'moment';
import 'moment/locale/pl';
import 'moment/locale/cs';
import 'moment/locale/de';
import {getArticleLink} from "../extra/functions";

const SiteInfoContext = React.createContext(null);
const SiteInfoContextConsumer = SiteInfoContext.Consumer;

const StoredLocale = localStorage.getItem(LocalStorage.Locale);

function SiteInfoContextProvider(props) {
    const [siteInfo, setSiteInfo] = React.useState(null);
    const [activeLocale, setActiveLocale] = React.useState(StoredLocale || 'pl');

    React.useEffect(() => {
        if (!StoredLocale)
            localStorage.setItem(LocalStorage.Locale, activeLocale);
        moment.locale(activeLocale);

        if (isContrastThemeOn())
            turnOnContrastTheme();
    }, []);

    React.useEffect(() => {
        getSiteInfo();
    }, [activeLocale]);

    const getSiteInfo = () => {
        setSiteInfo(null);

        const domain = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
            ? SITES_DOMAIN[SITE]
            : window.location.hostname;

        API.get(`sites/getInfo?domain=${domain}`)
            .then(res => {
                const {info} = res.data;

                const languages =
                    info.languages && info.languages !== activeLocale
                        ? info.languages.split(",")
                        : [];

                const widgets = info?.template?.layout?.["home-page"]?.widgets;
                //  console.log( widgets );

                const header_menu_structure = widgets?.["top-menu"]?.elements?.[0]?.menu?.structure || [];
                const footer_address = widgets?.["footer-contact"]?.elements?.[0]?.content;
                const toggle_menu = widgets?.["toggle-menu"]?.elements?.[0]?.menu;

                const footer_subpage_link1 = widgets?.["bottom-col-1"]?.elements?.[0]?.content;
                const footer_subpage_link2 = widgets?.["bottom-col-2"]?.elements?.[0]?.content;
                const footer_subpage_link3 = widgets?.["bottom-col-3"]?.elements?.[0]?.content;
                const footer_subpage_link4 = widgets?.["bottom-col-4"]?.elements?.[0]?.content;

                const footer_subpage_links = [footer_subpage_link1, footer_subpage_link2, footer_subpage_link3, footer_subpage_link4];
                const footer_links = widgets?.["footer-links"]?.elements?.[0]?.content;

                const header_menu = header_menu_structure.map(({item}) => (
                    {label: item.name, path: (item.article ? getArticleLink(item.article) : item.url) || "#"}
                ));

                setSiteInfo({
                    site_info: info,
                    languages,
                    header_menu,
                    toggle_menu,
                    footer_address,
                    footer_subpage_links,
                    footer_links,
                });
            })
            .catch(() => {});
    };

    const changeLanguage = language => {
        localStorage.setItem(LocalStorage.Locale, language);
        moment.locale(language);
        setActiveLocale(language);
    };

    if (siteInfo === null)
        return <FullPageLoader/>;

    return (
        <SiteInfoContext.Provider value={{
            ...siteInfo,
            active_language: activeLocale,
            changeLanguage,
        }}>
            {props.children}
        </SiteInfoContext.Provider>
    );
}

export default SiteInfoContext;
export {SiteInfoContextProvider, SiteInfoContextConsumer};
