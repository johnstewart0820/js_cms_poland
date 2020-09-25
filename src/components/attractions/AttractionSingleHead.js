import React from 'react';
import PageHeaderSection from "../header/PageHeaderSection";
import '../../styles/attractions/AttractionSinglePage.scss';
import '../../svg/icons/tourist.svg';


function AttractionSingleHead  ({title, categories_labels, image, acf})  {

    const iconsBoard = acf.field_recomended_for;
    const openHours = acf.field_openinghours;


    const icons =  iconsBoard.map( result => {
        if (result === 'bike')
            return <img
                className={'icons'}
                key={result}
                alt=''
                src = {require('../../svg/icons/' + result + '_green.svg')}/>;
            return <img
                className={'icons'}
                key={result}
                alt=''
                src={require('../../svg/icons/' + result + '.svg')}/>});


    function howManyHours( minutes){
        return Math.round(minutes/60);}

    return(
    <PageHeaderSection extra_classes="single-attraction-head" thumbnail={image}>
        <div className='single-attraction-main-info'>
            <div className="category">{categories_labels}</div>
            <div className="page-title">{title}</div>
            <div className="single-attraction-container">
                <div className={'icons-container'}>
                    {/*{acf.field_map_adapted_for_disabled && <img className={'icons'} alt='' src={require('../../svg/icons/disabled.svg')}/>}*/}
                    {icons}</div>
                <div className={'time-attraction-container'}>{acf.field_map_minutes &&
                    <>
                        <img alt='' src={require('../../svg/icons/tourist.svg')}/>
                        <div className={'hours'}>&nbsp;{`${howManyHours(acf.field_map_minutes)}H`}</div>
                    </>}
                </div>
                <div className={'text'}>{acf.field_map_distance_from_center && `ODLEGŁOŚĆ OD CENTRUM`}
                &nbsp;&nbsp;&nbsp;{`${acf.field_map_distance_from_center} KM`}</div>
            </div>
        </div>

        <div className={"hours-open"}>
            <p>GODZINY OTWARCIA:</p>
            <div className={'container-hours'}>
                <img alt="" src={require('../../svg/icons/clock.svg')}/>
                <div className={"info"}>
                {(openHours['1_from']&&openHours['1_to'])&& <div>poniedziałek: {openHours['1_from']} - {openHours['1_to']}</div>}
                {(openHours['2_from']&&openHours['2_to'])&& <div>wtorek: {openHours['2_from']} - {openHours['2_to']}</div>}
                {(openHours['3_from']&&openHours['3_to'])&& <div>środa: {openHours['3_from']} - {openHours['3_to']}</div>}
                {(openHours['4_from']&&openHours['4_to'])&& <div>czwartek: {openHours['4_from']} - {openHours['4_to']}</div>}
                {(openHours['5_from']&&openHours['5_to'])&& <div>piątek: {openHours['5_from']} - {openHours['5_to']}</div>}
                {(openHours['6_from']&&openHours['6_to'])&& <div>sobota: {openHours['6_from']} - {openHours['6_to']}</div>}
                {(openHours['7_from']&&openHours['7_to'])&& <div>niedziela: {openHours['7_from']} - {openHours['7_to']}</div>}
                </div>
            </div>
        </div>


            {(acf.field_map_address && acf.field_map_city) &&
            <div className={'address'}>
                <p>ADRES</p>
                <div className={'info'}>{acf.field_map_postcode} {acf.field_map_city}</div>

                <div className={'info'}>{acf.field_map_address} </div>
            </div>}

        <div className={'contact-container'}>


            {acf.field_contact_phone &&
            <div >
                <img alt='' src={require('../../svg/icons/phone_white.svg')}/>
                <div>{acf.field_contact_phone}</div>
            </div>}
             <br/>
            {acf.field_contact_email &&
            <div >
                <img alt='' src={require('../../svg/icons/mail.svg')}/>
                <div>{acf.field_contact_email}</div>
             </div>}
            <br/>

            {acf.field_contact_www &&
            <div className={' www-container'}>
                 <img alt='' src={require('../../svg/icons/www_white.svg')}/>
                 <div className={'www'}>{acf.field_contact_www}</div>
            </div>}
        </div>

        <div className={'buttons-container'}>
            <button className="button-planer button-link green " >
            dodaj do pplanera
                <img alt='' src={require('../../svg/icons/plus.svg')}/>
            </button>
            <img className={'network'} alt='' src={require('../../svg/icons/network.svg')}/>
        </div>
        <button className="button-download button-link  full-width" >
            POBIERZ PRZEWODNIK
            <img alt='' src={require('../../svg/icons/download.svg')}/>
        </button>

    </PageHeaderSection>    );
}

export default AttractionSingleHead;