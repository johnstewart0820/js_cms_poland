import React from 'react';
import '../../styles/attachment/attachment.scss'
import '../../styles/attractions/attraction-single-page.scss'

const Attachment = ({attachments}) => {
    const [mappingAttachment, setMappingAttachement] = React.useState(null)

    React.useEffect(() => {
        setMappingAttachement(attachments.map((attachment, key) =>
            <div className={'items-container-attachment'}>
                <img alt="" src={require('../../svg/icons/download.svg')}/>
                <a className={'item-attachment'} key={key} href={attachment.name.toString()}>{attachment.title}</a>
            </div>))
    }, [])

    return (
        <div className="section-info">
            <div className={'section-title'}>
                <img alt="" src={require('../../svg/icons/logo-black.svg')}/>
                <div className={'name-info-attachment'}>PLIKI DO POBRANIA</div>
            </div>
            <div className={'attachment-main'}>{mappingAttachment}</div>
        </div>
    )
};

export default Attachment;
