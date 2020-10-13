import React, {useContext} from 'react';
import '../../styles/Cards/BikeRoutesCard.scss';
import Col from "../helpers/Col";
import DefaultImage from "../../constants/DefaultImage";
import ShareButton from "../buttons/ShareButton";
import PlusButton from "../buttons/PlusButton";
import {BicycleIcon, BicycleIconRed, BicycleIconYellow} from "../../svg/icons";
import moment from "moment";
import FamilyIcon from "../icons/FamilyIcon";
import HikingIcon from "../icons/HikingIcon";
import PlanerContext from "../../constants/PlanerContext";


const BikeRoutesCard = ({...article}) => {
    const planerContext = useContext(PlanerContext);
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
                        {article.acf.field_trails_info_difficulty === "łatwy"
                            ? <BicycleIcon/>
                            : article.acf.field_trails_info_difficulty === 'średni'
                                ? <BicycleIconYellow/>
                                : article.acf.field_trails_info_difficulty === 'trudny'
                                    ? <BicycleIconRed/>
                                    : <BicycleIcon/>}
                        {article.acf.field_recomended_for === 'families' && <FamilyIcon/>}
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
                        <PlusButton onClick={() => planerContext.add(article.id)}/>
                        <ShareButton/>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default BikeRoutesCard;