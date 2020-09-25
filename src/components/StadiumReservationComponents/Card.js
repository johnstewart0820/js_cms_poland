import React from 'react';
import ButtonLink from "../buttons/ButtonLink";
import ShareButton from "../buttons/ShareButton";
import {EyeIcon, PlaneIcon, PlusIcon} from "../../svg/icons";
import '../../styles/StadiumReservationPages/Card.scss';
import Row from "../helpers/Row";
import Col from "../helpers/Col";
import {useLocation} from 'react-router-dom';
import PlanerContext from "../../constants/PlanerContext";


const Card = ({id, name, title, address, thumbnail, postCode ,city, greenButtonOnСlick, greenButtonText, extraClasses, eyeButtonImage}) => {
    const location = useLocation();
    let pathname = location.pathname;
    const planerContext = React.useContext(PlanerContext);

    return(
        <Col>
            <div className={`card ${extraClasses ? extraClasses : ''}`}>
                <div className="card__thumbnail has-overlay" style={{backgroundImage: `url(${thumbnail})`}}>
                    <div className="card__name">
                        {name}
                    </div>
                    {pathname === '/game' && <button className="button__eye">{eyeButtonImage}</button>}
                </div>

                <div className="card__content">
                    <div className="card__title">
                        {title}
                    </div>

                    {address && postCode && city &&
                        <div className="card__address">
                            <span> ADRES </span>
                            <Row>
                                <h3>{postCode} {city}</h3>
                            </Row>
                            <Row>
                                <h3>{address}</h3>
                            </Row>
                        </div>
                    }

                    <div className="card__bottom">
                        <ButtonLink extra_classes="green" onClick={greenButtonOnСlick}> {greenButtonText ? greenButtonText.toUpperCase() : "REZERWACJA"} </ButtonLink>

                        {pathname !== '/game' && <a href="#"> <PlusIcon onClick={() => planerContext.add(id)}/> </a>}
                        {pathname !== '/game' ? <ShareButton link_for_sharing={`${window.location.origin}/reservation/${id}`}/> : <button className="send__button"><PlaneIcon/></button> }
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default Card;