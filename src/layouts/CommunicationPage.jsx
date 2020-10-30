import React, { useMemo, useContext, useEffect } from "react";
import '../styles/communicationPage/communicationPage.scss';
import GrayCard from "../components/CommunicationPage/GrayCard";
import Row from "../components/helpers/Row";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import SectionHeading from "../components/general/SectionHeading";
import { toggleSearchPanel } from "../extra/search-panel";

const CommunicationPage = props => {

	 useEffect(() => {
		toggleSearchPanel();
		return () => toggleSearchPanel();
	 }, [])

	 const containerTitle = props.page.acf?.field_carriers_title;
	 const map_id = props?.page?.acf?.field_new_transport_map;

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
				<section style={{ marginTop: "30px" }}>
					
					<div className="container">
						<SectionHeading heading={ containerTitle }/>

						<Row>
							{ newItems && !!newItems.length &&
								newItems.map(( item, index ) => {
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
							}) }
						</Row>

					</div>
				</section>

           
				{ map_id && 
						<MapWithPinsFiltering map_id={ map_id }/>		  
				}
        </>
    )
}

export default CommunicationPage;