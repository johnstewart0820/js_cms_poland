import React from 'react';
import PropTypes from 'prop-types';
import {ShareIcon, FacebookIcon, TwitterIcon, EnvelopeIcon} from '../../svg/icons';
import '../../styles/buttons/share-button.scss';

const Buttons = [
    {icon: <FacebookIcon/>, name: "Facebook", link: "https://www.facebook.com/sharer/sharer.php?u=$link$"},
    {icon: <TwitterIcon/>, name: "Twitter", link: "https://twitter.com/home?status=$link$ "},
    {icon: <EnvelopeIcon/>, name: "Email", link: "mailto:info@example.com?&subject=&body=$link$"}
];

const shareWith = (e, link, replace) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(link.replace("$link$", replace));
};

const ShareButton = props => {
    const ref = React.useRef(null);
    const [expanded, setExpanded] = React.useState(false);

    const toggleExpand = e => {
        e.preventDefault();
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        const handler = e => {
            if (ref.current && !ref.current.contains(e.target))
                setExpanded(false);
        };

        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler);
    }, [ref]);

    return (
        <div className="share-button-wrapper" ref={ref}>
            <button className="share-button" onClick={toggleExpand}>
                <ShareIcon/>
            </button>
            {expanded && (
                <div className={`share-button-list${props.horizontal ? ' share-button-list-horizontal' : ''}`}>
                    {Buttons.map(button => (
                        <button
                            key={button.name}
                            title={button.name}
                            onClick={e => shareWith(e, button.link, props.link_for_sharing || window.location.href)}
                        >
                            {button.icon}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

ShareButton.propTypes = {
    link_for_sharing: PropTypes.string,
    horizontal: PropTypes.bool,
};

export default ShareButton;
