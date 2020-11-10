import React from 'react';

const PageHeaderContact = ({acf}) => (
    <div className={'contact-container'}>
        {acf.field_contact_phone && (
            <div>
                <img alt='' src={require('../../svg/icons/phone_white.svg')}/>
                <a href={`tel: +${acf.field_contact_phone}`}>{acf.field_contact_phone}</a>
            </div>
        )}
        <br/>
        {acf.field_contact_email && acf.field_contact_email_is_visible && (
            <div>
                <img alt='' src={require('../../svg/icons/mail.svg')}/>
                <a href={`mailto:${acf.field_contact_email}`}>{acf.field_contact_email}</a>
            </div>
        )}
        {!acf.field_contact_email_is_visible || !acf.field_contact_email ? "" : <br/>}
        {acf.field_contact_www && (
            <div className={'www-container'}>
                <img alt='' src={require('../../svg/icons/www_white.svg')}/>
                <a className={'www'} target='_blank' href={`https://${acf.field_contact_www}`}>{acf.field_contact_www}</a>
            </div>
        )}
    </div>
)

export default PageHeaderContact;