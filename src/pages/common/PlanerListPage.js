import React from 'react';
import MapWithPinsFiltering from "../../components/map/MapWithPinsFiltering";
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PlanerListContainer from "../../components/PlanerList/PlanerListContainer";
import PlanerItem from "../../components/PlanerList/PlanerItem";
import PlanerHistory from "../../components/PlanerList/PlanerHistory";
import PlanerContext from "../../constants/PlanerContext";
import moment from "moment";
import Loader from "../../components/general/Loader";
import Pdf from "react-to-pdf";

const ref = React.createRef();
const PlanerListPage = () => {
    const planerContext = React.useContext(PlanerContext);
    const optionsForPdf = {
        orientation: 'landscape',
        unit: 'in',
        format: [1903, 1431]
    };

    const totalDuration = React.useMemo(() => {
        if (planerContext.data.length > 0) {
            let duration = moment.duration();

            planerContext.data.forEach(event => {
                if (typeof event.acf?.field_map_minutes === 'string')
                    duration.add(event.acf?.field_map_minutes.replace(/ .*/,''), 'minutes')
            });
            return duration;
        }
    }, [planerContext.data.length]);

    React.useEffect(() => {
        planerContext.setVisible(false);
    },[]);

    const totalRoute = React.useMemo(() => {
        let route = [];
        planerContext.data.forEach(event => {
            route.push(event.title);
            route = route.filter((name, pos) => route.indexOf(name) == pos)
        })
        return route.join(' / ');
    }, [planerContext.data.length]);

    if (planerContext.data.length <= 0)
        return <Loader/>

    return(
        <>
           <div ref={ref}>
               <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: " Jak dojechać", to: "/" }, {label: 'Wynik'}]} />

               <PlanerListContainer title={'PLANER PODROZY'}>
                   {planerContext?.data?.map((item, index) => {
                       let categoryName = '';
                       let minutes = '';

                       if (item.categories !== undefined)
                           categoryName = item.categories[0].name;

                       if (typeof item.acf?.field_map_minutes === 'string')
                           minutes = item.acf?.field_map_minutes.replace(/ .*/,'');

                       return (
                           <PlanerItem
                               key={index}
                               duration={minutes || false}
                               description={item.title}
                               step={index + 1}
                               imageSrc={item.original_image || require('../../img/errorImage.png')}
                               category={categoryName || 'N/A'}
                               deleteOnClick={() => planerContext.delete(index)}
                           />
                       )
                   })}
               </PlanerListContainer>

               {!!totalRoute && !!totalDuration && (
                   <PlanerHistory
                       route={totalRoute}
                       totalDuration={totalDuration}
                       >
                       <Pdf
                           options={optionsForPdf}
                           filename='planer.pdf'
                           targetRef={ref}>
                           {({toPdf}) => <button
                               className='button-link green full-width'
                               onClick={toPdf}>ZAPISZ TRASĘ DO PDF</button>}
                       </Pdf>
                   </PlanerHistory>
               )}

               <MapWithPinsFiltering type="attractions" />
           </div>
       </>
    )
}

export default PlanerListPage;