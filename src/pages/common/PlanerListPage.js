import React from 'react';
import MapWithPinsFiltering from "../../components/map/MapWithPinsFiltering";
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PlanerListContainer from "../../components/PlanerList/PlanerListContainer";
import PlanerItem from "../../components/PlanerList/PlanerItem";
import PlanerHistory from "../../components/PlanerList/PlanerHistory";
import PlanerContext from "../../constants/PlanerContext";
import moment from "moment";
import Loader from "../../components/general/Loader";


const PlanerListPage = () => {
    const planerContext = React.useContext(PlanerContext);

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
            <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: " Jak dojechać", to: "/" }, {label: 'Wynik'}]} />

            <PlanerListContainer title={'PLANER PODROZY'}>
                {planerContext?.data?.map((item, index) => {

                    let category = '';
                    if (item.category !== undefined)
                        category = item.categories[0];

                    let minutes = '';
                    if (typeof item.acf?.field_map_minutes === 'string')
                        minutes = item.acf?.field_map_minutes.replace(/ .*/,'');

                    return (
                        <PlanerItem
                            key={index}
                            duration={minutes || false}
                            description={item.title}
                            step={index + 1}
                            imageSrc={item.original_image || require('../../img/errorImage.png')}
                            category={category || 'N/A'}
                            onClick={() => console.log('remove from map')}
                        />
                    )
                })}
            </PlanerListContainer>

            {!!totalRoute && !!totalDuration && <PlanerHistory route={totalRoute} totalDuration={totalDuration}/>}

            <MapWithPinsFiltering type="attractions" />
        </>
    )
}

export default PlanerListPage;