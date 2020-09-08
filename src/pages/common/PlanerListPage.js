import React from 'react';
import MapWithPinsFiltering from "../../components/map/MapWithPinsFiltering";
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PlanerListContainer from "../../components/PlanerList/PlanerListContainer";
import PlanerItem from "../../components/PlanerList/PlanerItem";
import PlanerHistory from "../../components/PlanerList/PlanerHistory";
import PlanerContext from "../../constants/PlanerContext";
import moment from "moment";


const PlanerListPage = () => {
    const planerContext = React.useContext(PlanerContext);

    const totalDuration = React.useMemo(() => {
        let duration = moment.duration();
        planerContext.events.forEach(event => duration.add(event.acf.field_map_minutes, 'minutes'));
        return duration;
    }, [planerContext.events.length]);

    const totalRoute = React.useMemo(() => {
        let route = [];
        planerContext.events.forEach(event => {
            route.push(event.custom_data.event.place);
            route = route.filter((name, pos) => route.indexOf(name) == pos)
        })
        return route.join(' / ');
    }, [planerContext.events.length])


    return(
        <>
            <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: " Jak dojechać", to: "/" }, {label: 'Wynik'}]} />

            <PlanerListContainer title={'PLANER PODROZY'}>
                {planerContext.events.map((item, index) => {
                    let category = item.categories[0]?.name
                    return (
                        <PlanerItem
                            key={index}
                            duration={item.acf.field_map_minutes}
                            description={item.title}
                            step={index + 1}
                            imageSrc={item.original_image || require('../../img/errorImage.png')}
                            category={category || 'N/A'}
                            onClick={() => console.log('remove from map')}
                        />
                    )
                })}
            </PlanerListContainer>

            <PlanerHistory totalDuration={totalDuration} route={totalRoute}/>

            <MapWithPinsFiltering type="attractions" />
        </>
    )
}

export default PlanerListPage;