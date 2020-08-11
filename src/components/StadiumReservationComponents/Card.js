import React from 'react';
import {Col, Row} from "react-bootstrap";
import ButtonLink from "../buttons/ButtonLink";
import ShareButton from "../buttons/ShareButton";
import {  PlusIcon } from "../../svg/icons";
import '../../styles/StadiumReservationPages/Card.scss';
import {useHistory} from 'react-router-dom';

const Card = ({id, name, title, address, thumbnail, postCode ,city, greenButtonOnclick}) => {
    const history = useHistory();

    return(
        <Col>
            <div className="card">
                <div className="card__thumbnail has-overlay" style={{backgroundImage: `url(${thumbnail})`}}>
                    <div className="card__name">
                        {name}
                    </div>
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
                        <ButtonLink extra_classes="green" onClick={greenButtonOnclick}> REZERWACJA </ButtonLink>

                        <a href="#"> <PlusIcon/> </a>
                        <ShareButton link_for_sharing={`${window.location.origin}/reservation/${id}`}/>
                    </div>
                </div>

            </div>
        </Col>
    )
}

export default Card;