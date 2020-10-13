import React from 'react';
import '../../styles/Cards/BikeRoutesCard.scss';
import Col from "../helpers/Col";
import DefaultImage from "../../constants/DefaultImage";
import ShareButton from "../buttons/ShareButton";
import PlusButton from "../buttons/PlusButton";
import BicycleIcon from "../icons/BicycleIcon";
import FamilyIcon from "../icons/FamilyIcon";
import HikingIcon from "../icons/HikingIcon";
import moment from "moment";


const BikeRoutesCard = ({...article}) => {
    let duration = moment.duration();
    if (article.acf?.field_map_minutes) {
        duration.add(article.acf.field_map_minutes.replace(/ .*/, ''), 'minutes');
    }

    return (
        <Col>
            <div className={'card-bike'}>
                <div className="card__thumbnail has-overlay" style={{backgroundImage: `url("${article.original_image || DefaultImage}")`}}>
                    <div className="card__name">
                        {article.acf.field_playground_category}
                    </div>
                </div>

                <div className='card-header'>
                    <div className='card-header-part-one'>
                        <BicycleIcon/>
                        <FamilyIcon/>
                    </div>
                    <div className='card-header-part-two'>
                        <HikingIcon/> <p>{duration.hours() + 'H' || ''}</p>
                    </div>
                </div>
                <div className='card__content'>
                    <div className='card__title'>
                        {article.title}
                    </div>

                    {/*<div className='columns'>*/}
                    {/*    <div className='routes-name'>*/}
                    {/*        <p>{routePoints || ''}</p>*/}
                    {/*    </div>*/}
                    {/*    <div className='route-dystans'>*/}
                    {/*        <p>{routeDystans || ''}</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className='bottom-buttons'>
                        <PlusButton/>
                        <ShareButton/>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default BikeRoutesCard;