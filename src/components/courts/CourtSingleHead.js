import React from 'react';
import PageHeaderSection from "../header/PageHeaderSection";
import '../../styles/attractions/attraction-single-page.scss';
import '../../styles/courts/courts-single-page.scss';
import '../../svg/icons/tourist.svg';
import SingleContentBottom from "../common-single/SingleContentBottom";
import PlanerContext from "../../constants/PlanerContext";
import {openHoursIsNotEmpty} from "../../extra/functions";
import PageHeaderContact from "../header/PageHeaderContact";
import {useHistory} from 'react-router-dom';
import TourismRoutes from "../../constants/TourismRoutes";

function CourtSingleHead({id, title, custom_data, image, acf}) {
    const history = useHistory();
    const planerContext = React.useContext(PlanerContext);
    const sourfaceTypeOfCourt = JSON.parse(custom_data.courts).sourface_type;
    const minutesPerReservation = JSON.parse(custom_data.courts).minutes_per_reservation;
    const costPerReservation = JSON.parse(custom_data.courts).cost_per_reservation;
    const openHours = JSON.parse(custom_data.courts).hours;

    function checkDuplicateItem() {
        let isDuplicate = planerContext.ids.includes(id);

        if (isDuplicate === true) return null;
        else return planerContext.add(id);
    }

    return (
        <PageHeaderSection extra_classes="single-attraction-head" thumbnail={image}>
            <div className='single-attraction-main-info'>
                <div className="category">{acf.field_playground_category}</div>
                <div className="page-title">{title}</div>
                <div className="single-attraction-container courts-info-container">

                    <div className={'parameters-container'}>
                        {(acf.field_playground_dimensions || sourfaceTypeOfCourt) &&
                        <>
                            PARAMETRY
                            <div className={'size-court'}>
                                {acf.field_playground_dimensions &&
                                <>
                                    <img src={require('../../svg/icons/arrows.svg')} alt=''/>
                                    {acf.field_playground_dimensions}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </>}
                                {sourfaceTypeOfCourt &&
                                <>
                                    <img src={require('../../svg/icons/grass.svg')} alt=''/>&nbsp;&nbsp;
                                    {sourfaceTypeOfCourt}
                                </>}
                            </div>
                        </>}
                    </div>
                    {acf.field_map_distance_from_center &&
                    (<div className={'text'}> ODLEG??O???? OD CENTRUM
                        &nbsp;&nbsp;&nbsp;{acf.field_map_distance_from_center} KM
                    </div>)
                    }
                </div>
            </div>

            <div className={'parameters-price-container'}>

                <div>CENNIK / SLOT</div>
                <div className={'price-court'}>
                    <img src={require('../../svg/icons/price.svg')}
                         alt=''/>&nbsp;&nbsp;{minutesPerReservation} min &nbsp;&nbsp; {costPerReservation} z??
                </div>
            </div>

            {openHoursIsNotEmpty(openHours) &&
            <div className={"hours-open-court"}>
                <p>GODZINY OTWARCIA:</p>
                <div className={'container-hours'}>
                    <img alt="" src={require('../../svg/icons/clock.svg')}/>
                    <div className={"info"}>
                        {(openHours['1_from'] && openHours['1_to']) &&
                        <div>poniedzia??ek: {openHours['1_from']} - {openHours['1_to']}</div>}
                        {(openHours['2_from'] && openHours['2_to']) &&
                        <div>wtorek: {openHours['2_from']} - {openHours['2_to']}</div>}
                        {(openHours['3_from'] && openHours['3_to']) &&
                        <div>??roda: {openHours['3_from']} - {openHours['3_to']}</div>}
                        {(openHours['4_from'] && openHours['4_to']) &&
                        <div>czwartek: {openHours['4_from']} - {openHours['4_to']}</div>}
                        {(openHours['5_from'] && openHours['5_to']) &&
                        <div>pi??tek: {openHours['5_from']} - {openHours['5_to']}</div>}
                        {(openHours['6_from'] && openHours['6_to']) &&
                        <div>sobota: {openHours['6_from']} - {openHours['6_to']}</div>}
                        {(openHours['7_from'] && openHours['7_to']) &&
                        <div>niedziela: {openHours['7_from']} - {openHours['7_to']}</div>}
                    </div>
                </div>
            </div>
            }
            {(acf.field_map_address && acf.field_map_city) &&
            <div className={'address'}>
                <p>ADRES</p>
                <div className={'info'}>{acf.field_map_postcode} {acf.field_map_city}</div>
                <div className={'info'}>{acf.field_map_address} </div>
            </div>
            }
            <PageHeaderContact acf={acf}/>
            <button
                className="button-rezerwation button-download button-link full-width"
                onClick={() => history.push(TourismRoutes.Reservation(id))}
            >
                REZERWACJA
            </button>
            <div className={'buttons-container'}>
                {acf.field_map_gps && <SingleContentBottom onAddToPlaner={checkDuplicateItem}/>}
            </div>
        </PageHeaderSection>
    );
}

export default CourtSingleHead;