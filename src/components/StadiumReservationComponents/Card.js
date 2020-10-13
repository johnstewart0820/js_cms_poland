import React from 'react';
import ButtonLink from "../buttons/ButtonLink";
import ShareButton from "../buttons/ShareButton";
import {EmailIcon, PhoneIcon, PlusIcon, WWWIcon} from "../../svg/icons";
import '../../styles/StadiumReservationPages/Card.scss';
import Row from "../helpers/Row";
import Col from "../helpers/Col";
import PlanerContext from "../../constants/PlanerContext";
import DefaultImage from "../../constants/DefaultImage";
import {getArticleLink} from "../../extra/functions";

export default function Card({extraClasses, ...article}) {
    const planerContext = React.useContext(PlanerContext);

    return (
        <Col>
            <div className={`card ${extraClasses || ''}`}>
                <div
                    className="card__thumbnail has-overlay"
                    style={{backgroundImage: `url("${article.image || DefaultImage}")`}}
                >
                    <div className="card__name">
                        {article.field_playground_category}
                    </div>
                </div>

                <div className="card__content">
                    <div className="card__title">
                        {article.title}
                    </div>

                    {article.acf.field_map_address && article.acf.field_map_postcode && article.acf.field_map_city && (
                        <div className="card__address">
                            <span> ADRES </span>
                            <Row>
                                <h3>{article.acf.field_map_postcode} {article.acf.field_map_city}</h3>
                            </Row>
                            <Row>
                                <h3>{article.acf.field_map_address}</h3>
                            </Row>
                        </div>
                    )}

                    {article.acf.field_contact_phone && article.acf.field_contact_www && article.acf.field_contact_email && (
                        <div className='fields-with-icons'>
                            <div className='icons'>
                                <PhoneIcon/>
                                <EmailIcon/>
                                <WWWIcon/>
                            </div>

                            <div className='text'>
                                <a href={`tel: +${article.acf.field_contact_phone}`}>{article.acf.field_contact_phone}</a>
                                <a href={`mailto:${article.acf.field_contact_email}`}>{article.acf.field_contact_email}</a>
                                <a
                                    target='_blank'
                                    href={`https://${article.acf.field_contact_www}`}
                                    className='site-name'
                                >
                                    {article.acf.field_contact_www}
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="card__bottom">
                        <ButtonLink
                            extra_classes="green"
                            path={getArticleLink(article)}>
                            DOWIEDZ SIĘ WIĘCEJ
                        </ButtonLink>
                        <a href="#"><PlusIcon onClick={() => planerContext.add(article.id)}/></a>
                        <ShareButton link_for_sharing={window.location.origin + getArticleLink(article)}/>
                    </div>
                </div>
            </div>
        </Col>
    );
};
