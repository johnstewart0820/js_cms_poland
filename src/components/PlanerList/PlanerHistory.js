import React from 'react';
import '../../styles/PlanerList/PlanerHistory.scss';

const planerHistory = [
    {label: 'Ustroń – Skoczów / '},
    {label: 'Chałupki / '},
    {label: 'Wisła / '},
    {label: 'Jasnowice'},
];

const PlanerHistory = ({totalDuration, route}) => {
    let hours = totalDuration.hours() + ' godz.';
    let minutes = totalDuration.minutes() + ' min';

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
                <div className="planer-history-button">
                    <button className="button-link green full-width">ZAPISZ TRASĘ DO PDF</button>
                </div>
            </div>
        </div>
    )
}

export default PlanerHistory;