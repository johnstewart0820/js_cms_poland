import React from 'react';
import '../../styles/PlanerList/PlanerHistory.scss';


const PlanerHistory = ({totalDuration, route, generatePdfOnClick}) => {
    let hours = totalDuration ? totalDuration.hours() + ' godz.' : '';
    let minutes = totalDuration ? totalDuration.minutes() + ' min' : '';

    return (
        <div className="container">
            <div className="planer-history-container">
                <div className="planer-history-total-counter">
                    <h2>
                        CAŁKOWITY CZAS
                    </h2>
                    <h1>
                        {hours}
                    </h1>
                    <hr/>
                    <h3>
                        {minutes}
                    </h3>
                </div>
                <div className="planer-history">
                    <h3>
                        {route}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default PlanerHistory;