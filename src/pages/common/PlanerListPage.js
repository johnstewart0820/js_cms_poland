import React from 'react';
import GoogleMap from '../../components/map/GoogleMap';
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PlanerListContainer from "../../components/PlanerList/PlanerListContainer";
import PlanerItem from "../../components/PlanerList/PlanerItem";
import PlanerHistory from "../../components/PlanerList/PlanerHistory";
import PlanerContext from "../../constants/PlanerContext";
import moment from "moment";
import EmptyList from "../../components/general/EmptyList";
import Loader from "../../components/general/Loader";


const PlanerListPage = () => {
    const ref = React.useRef();
    const planerContext = React.useContext(PlanerContext);
    const coords = [];
    const [isEmpty, setIsEmpty] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const generatePdf = () => {
        const printContents = document.getElementById('planer').innerHTML;

        document.body.innerHTML = printContents;

        window.print();
        window.location.assign('/planer-basket');
    }

    const totalDuration = React.useMemo(() => {
        if (planerContext.data.length > 0) {
            let duration = moment.duration();

            planerContext.data.forEach(event => {
                if (typeof event.acf?.field_map_minutes === 'string')
                    duration.add(event.acf?.field_map_minutes.replace(/ .*/, ''), 'minutes')
            });
            setIsEmpty(false);
            return duration;
        } else {
            setIsEmpty(true);
        }
    }, [planerContext.data.length]);

    React.useEffect(() => {
        planerContext.setVisible(false);
    }, []);

    const totalRoute = React.useMemo(() => {
        let route = [];
        planerContext.data.forEach(event => {
            route.push(event.title);
            route = route.filter((name, pos) => route.indexOf(name) == pos)
        })
        return route.join(' / ');
    }, [planerContext.data.length]);

    const scrollToMap = () => window.scrollTo(0, document.body.scrollHeight);

    return (
        <>
            <Breadcrumbs breadcrumbs={[{label: "Visit.ustron.pl", to: "/"}, {label: " Planer",}]}/>
            <div id='planer' ref={ref}>
                {loading && <Loader/>}
                {isEmpty
                    ? (
                        <EmptyList
                            className={'empty-list-comunicate'}
                            children={"Planer podróży jest pusty. Dodaj coś do planera, korzystając z wyszukiwarki na górze strony"}
                        />
                    ) : (
                        <PlanerListContainer title={'PLANER PODROZY'}>

                            {planerContext?.data?.map((item, index) => {
                                let categoryName = '';
                                let minutes = '';
                                let gps = [];

                                if (item.acf.field_map_gps != undefined) {
                                    gps = item.acf.field_map_gps.split(';');
                                    coords.push({
                                        lat: gps[0],
                                        lng: gps[1],
                                    });
                                }

                                if (item.categories !== undefined)
                                    categoryName = item.categories[0].name;

                                if (typeof item.acf?.field_map_minutes === 'string')
                                    minutes = item.acf?.field_map_minutes.replace(/ .*/, '');

                                return (
                                    <PlanerItem
                                        key={index}
                                        acf={item.acf}
                                        duration={minutes || false}
                                        description={item.title}
                                        step={index + 1}
                                        imageSrc={item.original_image || require('../../img/errorImage.png')}
                                        category={categoryName || 'N/A'}
                                        deleteOnClick={() => planerContext.delete(index)}
                                        onMapCheck={() => scrollToMap()}
                                    />
                                )
                            })}
                        </PlanerListContainer>
                    )}

                {!!totalRoute && !!totalDuration && !isEmpty && (
                    <PlanerHistory
                        route={totalRoute}
                        totalDuration={totalDuration}
                        generatePdfOnClick={generatePdf}
                    />
                )}
            </div>

            {!isEmpty &&
                <div className="planer-history-button">
                    <button
                        className='button-link green full-width'
                        onClick={generatePdf}
                    >
                        ZAPISZ TRASĘ DO PDF
                    </button>
                </div>
            }

            {coords && !!coords.length &&
                <div style={{position: "relative", height: "500px"}}>
                    <GoogleMap markers={coords}/>
                </div>
            }
        </>
    )
}

export default PlanerListPage;