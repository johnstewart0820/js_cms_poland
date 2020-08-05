import React from 'react';
import {API} from "../../extra/API";
import MainHeaderSection from "../../components/header/MainHeaderSection";
import TwoCarouselsOneRow from "../../components/carousel/TwoCarouselsOneRow";
import LoopEventsPost from "../../components/events/LoopEventsPost";
import LoopNewsPost from "../../components/news/LoopNewsPost";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import TextLinkPic from "../../components/general/TextLinkPic";
import PicsTextLink from "../../components/general/PicsTextLink";
import PicturesSlider from "../../components/slider/PicturesSlider";
import LoopAccommodationPost from '../../components/accommodation/LoopAccommodationPost';
import LoopGastronomyPost from "../../components/gastronomy/LoopGastronomyPost";
import LinksTiles from "../../components/general/LinksTiles";
import { sample_slides } from "../../mock/slides_example";
import LoopSearchForm from "../../components/loop/LoopSearchForm";

const pics_text_link1 = {
    heading: "Miasto",
    pics: [
        { url: "/img/loop/1.jpg", label: "Fotorelacje" },
        { url: "/img/loop/3.jpg", label: "INFORMACJE PRAKTYCZNE" },
        { url: "/img/loop/1.jpg", label: "BEZPIECZNY USTROŃ" },
    ],
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit",
    link: "/aaaa",
    link_label: "dowiedz się więcej"
};
const pics_text_link2 = {
    heading: "Co zwiedzić?",
    pics: [
        { url: "/img/loop/1.jpg", label: "ATRAKCJE" },
        { url: "/img/loop/3.jpg", label: "SZLAKI" },
        { url: "/img/loop/1.jpg", label: "RABATY" },
    ],
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit",
    link: "/aaaa",
    link_label: "dowiedz się więcej"
};
const text_link_pic = {
    heading: "Uzdrowisko",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "#",
    link_label: "dowiedz się więcej",
    picture: "/img/pics/1.jpg"
};
const links_tiles = [
    { href: "/", label: "Komunikacja kolejowa" },
    { href: "/", label: "Komunikacja autobusowa" },
    { href: "/", label: "Taxi" },
    { href: "/", label: "Parkingi" },
];

export default function () {
    const [slides, setSlides] = React.useState([]);
    const [last_news, setLastNews] = React.useState([]);
    const [last_events, setLastEvents] = React.useState([]);
    const [accommodations, setAccommodations] = React.useState([]);
    const [gastronomy, setGastronomy] = React.useState([]);
    
    React.useEffect(() => {
        setTimeout(() => {
            setSlides(sample_slides);
            API.get("mock/news.json").then( res => setLastNews(res.data));
            API.get("mock/events.json").then( res => setLastEvents(res.data));
            API.get("mock/accommodations.json").then( res => setAccommodations(res.data));
            API.get("mock/gastronomy.json").then( res => setGastronomy(res.data));
        }, 500);
    }, []);
    
    const events_carousel = {loading: !last_events.length, path_to_all: "/events", heading: "Wydarzenia", items: last_events, component: LoopEventsPost};
    const news_carousel = {loading: !last_news.length, path_to_all: "/news", heading: "Ostatnie aktualności", items: last_news, component: LoopNewsPost};
    const accommodations_carousel = {loading: !accommodations.length, path_to_all: "/accommodations", heading: "BAZA NOCLEGOWA", items: accommodations, component: LoopAccommodationPost};
    const gastronomy_carousel = {loading: !gastronomy.length, path_to_all: "/gastronomy", heading: "BAZA GASTRONOMICZNA", items: gastronomy, component: LoopGastronomyPost};
    
    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl " }]} />
                <PicturesSlider slides={slides} />
            </MainHeaderSection>

            <LoopSearchForm heading="GASTRONOMIA" submitCallback={() => {}} />
            
            <TwoCarouselsOneRow first_carousel={events_carousel} second_carousel={news_carousel} />
            
            <PicsTextLink { ...pics_text_link1 } />
            <PicsTextLink { ...pics_text_link2 } />
            
            <TextLinkPic { ...text_link_pic } />
            
            {/*<TwoCarouselsOneRow first_carousel={accommodations_carousel} second_carousel={gastronomy_carousel} />*/}
            
            <LinksTiles heading="Jak dojechać?" links={links_tiles} />
        </>
    );
}
