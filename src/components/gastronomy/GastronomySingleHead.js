import React from 'react';
import PageHeaderSection from "../header/PageHeaderSection";
import '../../styles/gastronomy/gastronomy-single-page.scss';
import '../../svg/icons/tourist.svg';
import SingleContentBottom from "../common-single/SingleContentBottom";
import PlanerContext from "../../constants/PlanerContext";
import {openHoursIsNotEmpty} from "../../extra/functions";
import PageHeaderContact from "../header/PageHeaderContact";


function GastronomySingleHead({title, categories_labels, image, acf,id}) {
    let keyId = 0;
    const iconsBoard = acf.field_recomended_for;
    const openHours = acf.field_openinghours;
    const planerContext = React.useContext(PlanerContext);

    function checkDuplicateItem() {
        let isDuplicate = planerContext.ids.includes(id);

        if (isDuplicate === true) return null;
        else return planerContext.add(id);
    }

    if (iconsBoard) {
        var icons = iconsBoard.map(result => {
            if (result === 'bike')
                return <img
                    key={keyId++}
                    className={'icons'}
                    key={result}
                    alt=''
                    src={require('../../svg/icons/' + result + '_green.svg')}
                />
            return <img
                className={'icons'}
                key={keyId++}
                alt=''
                src={require('../../svg/icons/' + result + '.svg')}
            />
        });
    }


    return (
        <PageHeaderSection extra_classes="single-attraction-head" thumbnail={image}>
            <div className='single-attraction-main-info'>
                <div className="category">{categories_labels}</div>
                <div className="page-title">{title}</div>
                <div className="single-attraction-container">
                    {icons && <div className={'icons-container'}>
                        {icons}</div>}
                    {acf.field_map_distance_from_center &&
                    (<div className={'text'}> ODLEGŁOŚĆ OD CENTRUM
                        &nbsp;&nbsp;&nbsp;{acf.field_map_distance_from_center} KM
                    </div>)
                    }
                </div>
            </div>
            {openHoursIsNotEmpty(openHours) &&
            <div className={"hours-open-gastronomy"}>
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
            <PageHeaderContact acf={acf}/>
            <div className={'buttons-container'}>
                {acf.field_map_gps && <>
                    <SingleContentBottom onAddToPlaner={checkDuplicateItem}/>
                </>}
            </div>

        </PageHeaderSection>
    );
}

export default GastronomySingleHead;