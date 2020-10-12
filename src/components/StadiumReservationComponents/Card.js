import React from 'react';
import ButtonLink from "../buttons/ButtonLink";
import ShareButton from "../buttons/ShareButton";
import {EmailIcon, EyeIcon, PhoneIcon, PlaneIcon, PlusIcon, WWWIcon} from "../../svg/icons";
import '../../styles/StadiumReservationPages/Card.scss';
import Row from "../helpers/Row";
import Col from "../helpers/Col";
import PlanerContext from "../../constants/PlanerContext";
import DefaultImage from "../../constants/DefaultImage";


const Card = ({id, field_playground_category, title, field_map_address, original_image, field_map_postcode ,field_map_city, onClickGreenButton, greenButtonText, extraClasses, field_contact_phone, field_contact_email, field_contact_www}) => {
    const planerContext = React.useContext(PlanerContext);

    return(
        <Col>
            <div className={`card ${extraClasses ? extraClasses : ''}`}>
                <div className="card__thumbnail has-overlay" style={{backgroundImage: `url("${original_image || DefaultImage}")`}}>
                    <div className="card__name">
                        {field_playground_category}
                    </div>
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

                    {field_contact_phone && field_contact_www && field_contact_email && (
                        <div className='fields-with-icons'>
                            <div className='icons'>
                                <PhoneIcon/>
                                <EmailIcon/>
                                <WWWIcon/>
                            </div>

                            <div className='text'>
                                <a href={`tel: +${field_contact_phone}`}>{field_contact_phone}</a>
                                <a href={`mailto:${field_contact_email}`}>{field_contact_email}</a>
                                <a
                                    target='_blank'
                                    href={`https://${field_contact_www}`}
                                    className='site-name'>{field_contact_www}</a>
                            </div>
                        </div>
                    )}

                    <div className="card__bottom">
                        <ButtonLink extra_classes="green" onClick={onClickGreenButton}> {greenButtonText ? greenButtonText.toUpperCase() : "REZERWACJA"} </ButtonLink>

                        <a href="#"> <PlusIcon onClick={() => planerContext.add(id)}/> </a>
                        <ShareButton link_for_sharing={`${window.location.origin}/reservation/${id}`}/>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default Card;