import React from "react";
import PlusButton from "../buttons/PlusButton";
import ShareButton from "../buttons/ShareButton";

import {PhoneIcon, WWWIcon, EmailIcon} from "../../svg/icons";

const GrayCardItem = ({type, carrier, address, email, site, phoneNumber, onClickPlusButton}) => {
    const extraClass = type === 'buses' ? ' margin' : ' position';
    return (
        <div className='gray-card-item'>
            <div className='gray-card-element-description'>
                <p>
                    {type != 'taxi' && !!carrier && carrier?.toUpperCase()}
                </p>
                <h3>
                    {!!address && address?.toUpperCase()}
                </h3>
            </div>
            {type === 'buses' && (
                <div className='fields-with-icons'>
                    <div className='icons'>
                        <PhoneIcon/>
                        <EmailIcon/>
                        <WWWIcon/>
                    </div>

                    <div className='text'>
                        <a href={`tel: +${phoneNumber}`}>{phoneNumber}</a>
                        <a onClick={() => window.open(`mailto:${email}`)}>{email}</a>
                        <a
                            target='_blank'
                            onClick={() => window.open(`https://${site}`)}
                            className='site-name'>{site}</a>
                    </div>
                </div>
            )}
            <div className='gray-card-element-bottom'>
                {type === 'rails' && <a className='phone' href={`tel: +${phoneNumber}`}><PhoneIcon/> <p>{phoneNumber}</p></a>}
                {type != 'taxi' && type != 'parking' && (
                    <div className={`buttons-container ${extraClass}`}>
                        <PlusButton onClick={onClickPlusButton}/>
                        <ShareButton/>
                    </div>
                )}
            </div>
            {type === 'taxi' && (
                <div className='taxi-number'>
                    <PhoneIcon/> {carrier}, tel. {phoneNumber}
                </div>
            )}
        </div>
    )
}

export default GrayCardItem;