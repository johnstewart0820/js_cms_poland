import React from "react";
import Carousel from "../carousel/Carousel";
import dayButton from "../StadiumReservationComponents/DayButton";
import PropTypes from 'prop-types';
import '../../styles/events/DayCarousel.scss';

export const DayCarousel = ({days}) => {
    return (
        <div className="day-button-container">
            <div className="day-button-carousel">
                <div className="day-button-wrap">
                    <Carousel
                        heading={''}
                        items={days}
                        ItemComponent={dayButton}
                    />
                </div>
            </div>
        </div>
    )
}

DayCarousel.propTypes = {
    days: PropTypes.array.isRequired
}