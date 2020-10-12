import React from 'react';
import GoogleMap from '../../components/map/GoogleMap';
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PlanerListContainer from "../../components/PlanerList/PlanerListContainer";
import PlanerItem from "../../components/PlanerList/PlanerItem";
import PlanerHistory from "../../components/PlanerList/PlanerHistory";
import PlanerContext from "../../constants/PlanerContext";
import moment from "moment";
import EmptyList from "../../components/general/EmptyList";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

const PlanerListPage = () => {
    const ref = React.useRef();
    const buttonRef = React.useRef();
    const height = document.documentElement.scrollHeight;
    const planerContext = React.useContext(PlanerContext);
    let coords = [];
    const [isEmpty, setIsEmpty] = React.useState(false);

    const createPdf = () => {
        if (ref.current !== undefined) {
            const planer = ref.current;

            html2canvas(planer)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png'),
                        pdf = new jsPDF({
                            orientation: "portrait",
                            unit: "in",
                            format: [height, 20],
                        });
                    pdf.addImage(imgData, 'JPEG', 0, 0);
                    pdf.save('planer.pdf');
                });
        }
    }

    const generatePdf = () => {
        let head = document.head.innerHTML,
            planer = document.getElementById('planer').innerHTML,
            pdfWindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

        pdfWindow.document.write(`<html><head>${head}</head><body>`);
        pdfWindow.document.write(planer);
        pdfWindow.document.write('</body></html>');

        pdfWindow.focus();

        setTimeout(() => {
            pdfWindow.print();
        }, 1000)

        return true;
    }

    const totalDuration = React.useMemo(() => {
        if (planerContext.data.length > 0) {
            let duration = moment.duration();

            planerContext.data.forEach(event => {
                if (typeof event.acf?.field_map_minutes === 'string')
                    duration.add(event.acf?.field_map_minutes.replace(/ .*/, ''), 'minutes')
            });
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
            <button ref={buttonRef} onClick={() => createPdf()}>
                create pdf
            </button>
            <div id='planer' ref={ref} style={{width: '100%', height: '100%'}}>
                <Breadcrumbs breadcrumbs={[{label: "Visit.ustron.pl", to: "/"}, {
                    label: " Jak dojechać",
                    to: "/",
                }, {label: 'Wynik'}]}/>

                <PlanerListContainer title={'PLANER PODROZY'}>
                    {isEmpty?
                        <EmptyList
                            className={'empty-list-comunicate'}
                            children={"Planer podróży jest pusty. Dodaj coś do planera, korzystając z wyszukiwarki na gorze stron"}/>
                        :<div>
                    {planerContext?.data?.map((item, index) => {
                        let categoryName = '';
                        let minutes = '';
                        let gps = '';

                        if (!!gps) {
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
                                duration={minutes || false}
                                description={item.title}
                                step={index + 1}
                                imageSrc={item.original_image || require('../../img/errorImage.png')}
                                category={categoryName || 'N/A'}
                                deleteOnClick={() => planerContext.delete(index)}
                                onMapCheck={scrollToMap}
                            />
                        )
                    })}</div>}
                </PlanerListContainer>

                {!!totalRoute && !!totalDuration && (
                    <PlanerHistory
                        route={totalRoute}
                        totalDuration={totalDuration}
                        generatePdfOnClick={generatePdf}
                    />
                )}

                {coords && !!coords.length &&
                <div style={{position: "relative", height: "500px"}}>
                    <GoogleMap markers={coords}/>
                </div>
                }

            </div>
        </>
    )
}

export default PlanerListPage;