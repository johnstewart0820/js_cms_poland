import React from 'react';
import PageHeaderSection from "../header/PageHeaderSection";
import '../../styles/attractions/attraction-single-page.scss';
import '../../styles/courts/courts-single-page.scss';
import '../../svg/icons/tourist.svg';
import SingleContentBottom from "../common-single/SingleContentBottom";
import PlanerContext from "../../constants/PlanerContext";

function CourtSingleHead({id, title, custom_data, image, acf}) {
    const planerContext = React.useContext(PlanerContext);
    const visibleEmail = acf.field_contact_email_is_visible;
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
                    (<div className={'text'}> ODLEGŁOŚĆ OD CENTRUM
                        &nbsp;&nbsp;&nbsp;{acf.field_map_distance_from_center} KM
                    </div>)
                    }
                </div>
            </div>

            <div className={'parameters-price-container'}>

                <div>CENNIK / SLOT</div>
                <div className={'price-court'}>
                    <img src={require('../../svg/icons/price.svg')}
                         alt=''/>&nbsp;&nbsp;{minutesPerReservation} min &nbsp;&nbsp; {costPerReservation} zł
                </div>
            </div>

            {openHours &&
            <div className={"hours-open-court"}>
                <p>GODZINY OTWARCIA:</p>
                <div className={'container-hours'}>
                    <img alt="" src={require('../../svg/icons/clock.svg')}/>
                    <div className={"info"}>
                        {(openHours['1_from'] && openHours['1_to']) &&
                        <div>poniedziałek: {openHours['1_from']} - {openHours['1_to']}</div>}
                        {(openHours['2_from'] && openHours['2_to']) &&
                        <div>wtorek: {openHours['2_from']} - {openHours['2_to']}</div>}
                        {(openHours['3_from'] && openHours['3_to']) &&
                        <div>środa: {openHours['3_from']} - {openHours['3_to']}</div>}
                        {(openHours['4_from'] && openHours['4_to']) &&
                        <div>czwartek: {openHours['4_from']} - {openHours['4_to']}</div>}
                        {(openHours['5_from'] && openHours['5_to']) &&
                        <div>piątek: {openHours['5_from']} - {openHours['5_to']}</div>}
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
            <div className={'contact-container'}>
                {acf.field_contact_phone &&
                <div>
                    <img alt='' src={require('../../svg/icons/phone_white.svg')}/>
                    <div>{acf.field_contact_phone}</div>
                </div>
                }
                <br/>
                {acf.field_contact_email && visibleEmail &&
                <div>
                    <img alt='' src={require('../../svg/icons/mail.svg')}/>
                    <div>{acf.field_contact_email}</div>
                </div>
                }
                {!visibleEmail || !acf.field_contact_email ? "" : <br/>}
                {acf.field_contact_www &&
                <div className={'www-container'}>
                    <img alt='' src={require('../../svg/icons/www_white.svg')}/>
                    <div className={'www'}>{acf.field_contact_www}</div>
                </div>
                }
            </div>
            <button className="button-rezerwation button-download button-link  full-width">
                REZERWACJA
            </button>
            <div className={'buttons-container'}>
                {acf.field_map_gps && <SingleContentBottom onAddToPlaner={checkDuplicateItem}/>}
            </div>
        </PageHeaderSection>
    );
}

export default CourtSingleHead;