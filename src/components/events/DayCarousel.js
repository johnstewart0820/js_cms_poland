import React from "react";
import DayButton from "../StadiumReservationComponents/DayButton";
import PropTypes from 'prop-types';
import "../../styles/carousel/carousel.scss";
import '../../styles/events/DayCarousel.scss';
import moment from "moment";
import Arrows from "../buttons/Arrows";

export const DayCarousel = props => {
    const [startDate, setStartDate] = React.useState(moment(props.startDate));
    const [carouselDates, setCarouselDates] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState(null);

    React.useEffect(() => {
        setSelectedDate(props.selectedDate ? moment(props.selectedDate) : null);
    }, [moment(props.selectedDate).format('DD.MM.YYYY')]);
    React.useEffect(() => {
        setStartDate(props.startDate ? moment(props.startDate) : null);
    }, [moment(props.startDate).format('DD.MM.YYYY')]);

    React.useEffect(() => {
        const dates = [];

        const cycleDate = moment(startDate);
        const endDate = moment(startDate).add(props.amount, props.type || 'days');

        for (cycleDate; cycleDate.isSameOrBefore(endDate); cycleDate.add(1, 'day')) {
            const clone = cycleDate.clone();

            dates.push({
                key: cycleDate.format('DD.MM.YYYY'),
                active: !!selectedDate?.isSame(cycleDate),
                onClick: () => {
                    setSelectedDate(clone);
                    props.onDayClick && props.onDayClick(clone);
                },
                dayName: cycleDate.format('dddd').toUpperCase(),
                monthName: cycleDate.format('MMMM').toUpperCase(),
                date: cycleDate.date(),
            });
        }

        setCarouselDates(dates);
    }, [startDate.format('DD.MM.YYYY'), selectedDate?.format('DD.MM.YYYY')]);

    const onArrowClick = action => setStartDate(startDate.clone()[action === 'prev' ? 'subtract' : 'add'](props.amount, props.type || 'days'));

    return (
        <div className="day-button-container">
            <div className="day-button-carousel">
                <div className="day-button-wrap">
                    <div className={`carousel`}>
                        <div className="carousel__body">
                            <Arrows onClick={onArrowClick}/>
                            <div className="carousel__overflow">
                                <div className="carousel__wrap">
                                    {carouselDates.map((item, index) => <DayButton key={index} {...item} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DayCarousel.propTypes = {
    startDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object,
    onDayClick: PropTypes.func,
    type: PropTypes.string,
    amount: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};
