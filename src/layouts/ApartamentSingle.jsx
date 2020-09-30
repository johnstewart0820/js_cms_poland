import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Gallery from "../components/gallery/Gallery";
import Breadcrumbs from "../components/general/Breadcrumbs";
import LoopNewsPost from "../components/news/LoopNewsPost";
import {API} from "../extra/API";
import axios from "../extra/axios";
import Loader from "../components/general/Loader";
import ApartmentSingleHead from "../components/apartments/ApartmentSingleHead";
import '../styles/gastronomy/gastronomy-single-page.scss'
import GoogleMap from "../components/map/GoogleMap";
import Footer from "../components/footer/Footer";

export default function ApartamentSingle(props) {
    const pageId = props.page.id;
    let keyId = 0;

    const {categories, body} = props.page;
    const {
        field_map_gps, field_service_languages, field_rooms,
        field_additional_description_history, field_facilities_apartments,
    } = props.page.acf;

    const [date, setDate] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState(null);
    const [gallery, setGallery] = React.useState(props.page.gallery);
    const [worthSeeing, setWorthSeeing] = React.useState(props.page.acf.field_worth_seeing);

    const facilities = React.useMemo(() => {
        let temp = [...field_facilities_apartments];
        let facilities = [];

        while (temp.length > 0) {
            facilities.push(temp.splice(0, 5));
        }

        console.log(facilities)

        return facilities;
    }, []);

    React.useEffect(() => {
        API.getEntities({categories: categories})
            .then(res => setNews(res.data.contents))
            .catch(e => {
                console.error(e);
                setNews(false);
            });
    }, []);

    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/contents/posts/${pageId}`)
            .then((res) => {
                setDate(res.data.content)
            })
    }, []);


    React.useEffect(() => {
        gallery.forEach(element => {
            gallery.push({
                description: element.description,
                name: "",
                title: element.title,
                url: element.name,
            });
        });
        setLoading(false);
    }, [gallery]);

    React.useEffect(() => {
        if (worthSeeing) {
            worthSeeing.forEach(element => {
                worthSeeing.push({
                    link: element.field_worth_seeing_link,
                    title: element.field_worth_seeing_title,
                    url: element.field_worth_seeing_photo,
                });
            });
        }
        setLoading(false);
    }, [worthSeeing]);


    if (!!loading)
        return <Loader/>


    let coords = [];
    if (field_map_gps) {
        var gps = field_map_gps.split(';');
        coords.push({
            lat: gps[0],
            lng: gps[1],
        });
    }

    if (field_service_languages) {
        var nameOfLanguage = field_service_languages.map(el => {
                if (el === 'polish') el = 'polski';
                if (el === 'english') el = 'angielski';
                if (el === 'dutch') el = 'niemiecki';
                if (el === 'czech') el = 'czeski';
                return (
                    <div key={keyId++} className={'language-container'}>
                        <img alt={''} src={require('../svg/icons/ok.svg')}/>
                        <div className={'language-info'}> {el} </div>
                    </div>
                )
            },
        );
    }

    function transplateFacilities(el) {
        if (el === 'place-for-firecamp') return 'miejsce na ognisko / grila';
        else if (el === 'garden-furniture') return 'meble ogrodowe';
        else if (el === 'sun-terrace') return 'taras ogrodowy';
        else if (el === 'water-for-dogs') return 'miski dla pupila';
        else if (el === 'place-for-dogs') return 'legowisko dla pupila';
        else if (el === 'tickets-sell') return 'sprzedaż biletów narciarskich';
        else if (el === 'ski-school') return 'szkółka narciarska';
        else if (el === 'no-pets-allowed') return 'zwierzęta nie są akceptowane';
        else if (el === 'club-for-children') return 'klub dla dzieci';
        else if (el === 'transfer') return 'transfer';
        else if (el === 'bike') return 'rowery';
        else if (el === 'foot-travels') return 'piesze wycieczki';
        else if (el === 'toilets_with_handles') return 'toalety z uchwytami';
        else if (el === 'individual-checkin-checkout') return 'indywidualne zameldowania/wymeldowania';
        else if (el === 'bags-holders') return 'przechowywalnia bagażu';
        else if (el === 'tv-for-children') return 'tv dla dzieci';
        else if (el === 'playground') return 'plac zabaw';
        else if (el === 'playroom') return 'sala zabaw';
        else if (el === 'games') return 'gry planszowe / puzzle';
        else if (el === 'peeling') return 'peeling';
        else if (el === 'swiming-pool') return 'basen';
        else if (el === 'pedicure') return 'pedicure';
    }

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]}/>
                <ApartmentSingleHead {...props.page}/>
            </MainHeaderSection>

            {field_service_languages &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OBSŁUGA W JĘZYKU</div>
                </div>
                <h2>{nameOfLanguage}</h2>
            </div>
            }
            {body &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OPIS</div>
                </div>
                <h2 className={' description-main'}>{Parser(body)}</h2>
            </div>
            }

            {field_rooms &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>POKOJE</div>
                </div>

                <table>
                    <tr className={'first-row'}>
                        <td className={'first-column'}>nazwa pokoju:</td>
                        {field_rooms.map(e => (
                            <td className={'cell-first-row'}>{e['field_room_name']}</td>
                        ))}
                    </tr>
                    <tr className={'second-row'}>
                        <td className={'first-column'}>ilość miejsc:</td>
                        {field_rooms.map(e => (
                            <td className={'cell-second-row'}>{e['field_room_capacity']}</td>
                        ))}
                    </tr>
                </table>
            </div>
            }

            {field_facilities_apartments &&
            <div className="section-info">
                <div className={'section-title-facilities'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info-facilities'}>UDOGODNIENIA</div>
                </div>
                <div className={'facilities-container'}>
                    {facilities.map((column, index) => (
                        <div key={index}>
                            {column.map((item, i) => (
                                <div className={'item-facilities'} key={i}>
                                    {item && <><img alt={''} src={require('../svg/icons/ok.svg')}/>
                                        {transplateFacilities(item)}</>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            }

            {gallery && <Gallery items={gallery}/>}

            {field_additional_description_history &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>HISTORIA</div>
                </div>
                <h2 className={' description-main'}>{Parser(field_additional_description_history)}</h2>
            </div>
            }

            <OneCarouseInRow className={'news-loop'} carousel={{
                loading: news === null,
                heading: 'Ostatnie aktualności',
                ItemComponent: LoopNewsPost,
                items: news || [],
            }}/>

            {coords && <GoogleMap className={'map'} markers={coords}/>}

            <Footer/>
        </>
    );
};