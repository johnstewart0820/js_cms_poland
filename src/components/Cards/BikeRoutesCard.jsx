import React from 'react';
import '../../styles/Cards/BikeRoutesCard.scss';
import Col from "../helpers/Col";
import DefaultImage from "../../constants/DefaultImage";
import ShareButton from "../buttons/ShareButton";
import PlusButton from "../buttons/PlusButton";
import BicycleIcon from "../icons/BicycleIcon";
import DisabilityIcon from "../icons/DisabilityIcon";
import FamilyIcon from "../icons/FamilyIcon";
import HikingIcon from "../icons/HikingIcon";


const BikeRoutesCard = ({original_image, field_playground_category, title, duration, routeDystans, routePoints}) => {
    return (
        <Col>
            <div className={'card-bike'}>
                <div className="card__thumbnail has-overlay" style={{backgroundImage: `url("${original_image || DefaultImage}")`}}>
                    <div className="card__name">
                        {field_playground_category}
                    </div>
                </div>

                <div className='card-header'>
                    <div className='card-header-part-one'>
                        <BicycleIcon/>
                        <DisabilityIcon/>
                        <FamilyIcon/>
                    </div>
                    <div className='card-header-part-two'>
                        <HikingIcon/> <p>{duration}</p>
                    </div>
                </div>
                <div className='card__content'>
                    <div className='card__title'>
                        {title}
                    </div>

                    <div className='columns'>
                        <div className='routes-name'>
                            <p>{routePoints || ''}</p>
                        </div>
                        <div className='route-dystans'>
                            <p>{routeDystans || ''}</p>
                        </div>
                    </div>
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