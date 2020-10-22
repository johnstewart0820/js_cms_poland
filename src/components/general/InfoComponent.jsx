import React, {useContext} from 'react';
import SectionHeading from "./SectionHeading";
import '../../styles/general/info-component.scss';
import ButtonLink from "../buttons/ButtonLink";
import {EmailIcon, PhoneIcon, WWWIcon} from "../../svg/icons";
import Row from "../helpers/Row";
import Parser from "html-react-parser";
import PlusButton from "../buttons/PlusButton";
import ShareButton from "../buttons/ShareButton";
import PlanerContext from "../../constants/PlanerContext";

const InfoComponent = ({
        id,
        containerTitle,
        description,
        phone,
        email,
        site,
        imageSource,
        href,
        city,
        buttonText,
    }) => {
    const planerContext = useContext(PlanerContext);
    return (
        <section className="info-component">
            <div className="container">
                {containerTitle && <SectionHeading heading={ containerTitle } />}
                <div className="row">

                    { imageSource && <div className="info-component-image thumbnail" style={{ backgroundImage: `url("${imageSource}")` }} /> }

                    <div className='info-component-info'>
                        {city && (
                            <div className="info-component-address">
                                <span> ADRES </span>
                                <Row>
                                    <h3>{city}</h3>
                                </Row>
                            </div>
                        )}

                        <div className='info-component-fields-with-icons'>
                            <div className='icons'>
                                {phone && <PhoneIcon/>}
                                {email && <EmailIcon/>}
                                {site && <WWWIcon/>}
                            </div>
                            <div className='text'>
                                {phone && <a href={`tel: +${phone}`}>{phone}</a>}
                                {email && <a href={`mailto:${email}`}>{email}</a>}
                                {site && (
                                    <a
                                        target='_blank'
                                        href={`https://${site}`}
                                        className='site-name'
                                    >
                                        {site}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className='info-component-buttons'>
                            {id && <PlusButton onClick={() => planerContext.add(id)}/>}
                            <ShareButton/>
                        </div>
                    </div>
                    <div className="info-component-description">
                        <div className="info-component-text">
                            { Parser(description) }
                            <ButtonLink href={href} extra_classes='button-link green'> { buttonText.toUpperCase() } </ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoComponent;