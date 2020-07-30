import React from 'react';

export const UserPanelHeader = () => {
    return(
        <div className="panel-container__header">
            <img alt='' src={require('../../svg/icons/user-photo.svg')}/>
            <div className="column">
                <h3>
                    Anna Kowalska
                </h3>
                <p>Nazwa roli</p>
            </div>
        </div>
    )
}