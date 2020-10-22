import React, { useMemo, useContext, useEffect } from "react";
import '../styles/communicationPage/communicationPage.scss';
import GrayCard from "../components/CommunicationPage/GrayCard";
import Row from "../components/helpers/Row";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import SearchPanelContext from "../constants/SearchPanelContext";

const CommunicationPage = props => {

	 const search_panel_context = useContext( SearchPanelContext );
	 useEffect(() => {
		search_panel_context.toggleSearchPanel()
		return () => search_panel_context.toggleSearchPanel();
	 }, [])

    const containerTitle = props.page.acf?.field_carriers_title;
    const newItems = useMemo(() => {
        return [
            {
                type: 'rails',
                title: props.page.acf?.field_rail_title,
                routes: props.page.acf?.field_rail?.map(route => ({
                    address: route.field_rail_address,
                    carrier: route.field_rail_station,
                    phoneNumber: route.field_rail_telephone,
                })) || [],
                link: props.page.acf?.field_rails_link,
                buttonText: 'rozklad-pkp.pl',
            },
            {
                type: 'buses',
                title: props.page.acf?.field_bus_title,
                routes: props.page.acf?.field_bus?.map(route => ({
                    address: route.field_bus_address,
                    carrier: route.field_bus_carrier,
                    mail: route.field_bus_mail,
                    phoneNumber: route.field_bus_telephone,
                    website: route.field_bus_website
                })) || [],
                link: props.page.acf?.field_buses_link,
                buttonText: 'kolejeslaskie.com',
            },
            {
                type: 'taxi',
                title: props.page.acf?.field_taxi_title,
                routes: props.page.acf?.field_taxi?.map(route => ({
                    carrier: route.field_taxi_carrier,
                    phoneNumber: route.field_taxi_telephone,
                })) || [],
                link: props.page.acf?.field_taxi_link,
                buttonText: 'www.intercity.pl',
            },
            {
                type: 'parking',
                title: props.page.acf?.field_parking_title,
                routes: props.page.acf?.field_parking?.map(route => ({
                    carrier: route.field_parking_name,
                    address: route.field_parking_address,
                })) || [],
            }
        ];
    },[]);

	


    return (
        <>
 
            <div className='title-container'>
                <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                <div className='title'>
                    <h2>
                        {containerTitle}
                    </h2>
                </div>
            </div>

            <Row extraClasses='cards-row'>
                {newItems.map((item, index) => {
                    return (
                        <GrayCard
                            key={index}
                            title={item.title}
                            items={item.routes}
                            greenButtonText={item.buttonText}
                            onClickGreenButton={() => window.open(item.link)}
                            type={item.type}
                        />
                    )
                })}
            </Row>

            <MapWithPinsFiltering map_id={props.page.acf.field_new_transport_map}/>
        </>
    )
}

export default CommunicationPage;