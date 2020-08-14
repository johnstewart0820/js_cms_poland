import React from 'react';
import '../../styles/Notification/Notification.scss';


const notification = props => {
    return(
        <div className="notification">
            <h3>
                {props.message}
            </h3>
        </div>
    )
}

export default notification;