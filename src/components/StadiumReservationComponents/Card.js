import React from 'react';
import ButtonLink from "../buttons/ButtonLink";
import ShareButton from "../buttons/ShareButton";
import {EyeIcon, PlaneIcon, PlusIcon} from "../../svg/icons";
import '../../styles/StadiumReservationPages/Card.scss';
import Row from "../helpers/Row";
import Col from "../helpers/Col";
import {useLocation} from 'react-router-dom';
import PlanerContext from "../../constants/PlanerContext";
import DefaultImage from "../../constants/DefaultImage";


const Card = ({id, field_playground_category, title, field_map_address, original_image, field_map_postcode ,field_map_city, onClickGreenButton, greenButtonText, extraClasses, eyeButtonImage, onClickPlaneButton}) => {
    const location = useLocation();
    let pathname = location.pathname;
    const planerContext = React.useContext(PlanerContext);

    return(
        <Col>
            <div className={`card ${extraClasses ? extraClasses : ''}`}>
                <div className="card__thumbnail has-overlay" style={{backgroundImage: `url("${original_image || DefaultImage}")`}}>
                    <div className="card__name">
                        {field_playground_category}
                    </div>
                    {pathname === '/game' && <button className="button__eye">{eyeButtonImage}</button>}
                </div>

                <div className="card__content">
                    <div className="card__title">
                        {title}
                    </div>

                    {field_map_address && field_map_postcode && field_map_city &&
                        <div className="card__address">
                            <span> ADRES </span>
                            <Row>
                                <h3>{field_map_postcode} {field_map_city}</h3>
                            </Row>
                            <Row>
                                <h3>{field_map_address}</h3>
                            </Row>
                        </div>
                    }

                    <div className="card__bottom">
                        <ButtonLink extra_classes="green" onClick={onClickGreenButton}> {greenButtonText ? greenButtonText.toUpperCase() : "REZERWACJA"} </ButtonLink>

                        {pathname !== '/game' && <a href="#"> <PlusIcon onClick={() => planerContext.add(id)}/> </a>}
                        {pathname !== '/game' ? <ShareButton link_for_sharing={`${window.location.origin}/reservation/${id}`}/> : <button className="send__button" onClick={onClickPlaneButton}><PlaneIcon/></button> }
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default Card;