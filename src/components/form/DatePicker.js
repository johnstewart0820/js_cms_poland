import React from "react";
import InputComponent from "./InputComponent";
import {Calendar} from "react-calendar";
import '../../styles/form/DatePicker.scss';
import PropTypes from "prop-types";
import {CalendarIcon} from "../../svg/icons";
import moment from "moment";

export const DatePicker = ({name, value, label, onChange}) => {
    const ref = React.useRef(null);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(value ? value : null);
    const [dateText, setDateText] = React.useState('');

    React.useEffect(() => {
        setDate(value || null);
        const day = moment(value);
        setDateText(!value ? '' : (day.isValid() ? day.format('DD.MM.YYYY') : ''));
    }, [value]);

    React.useEffect(() => {
        const handler = e => {
            if (ref.current && !ref.current.contains(e.target))
                setShow(false);
        };

        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler);
    }, [ref]);

    const onInputChange = e => {
        setDateText(e.target.value);
        const momentDate = moment(e.target.value, 'DD.MM.YYYY');
        if (momentDate.isValid()) {
            setDate(momentDate.toDate());
            onChange({target: {name, value: momentDate.toDate()}});
        }
    };

    const onCalendarChange = date => {
        setDateText(moment(date).format('DD.MM.YYYY'));
        setDate(date);
        onChange({target: {name, value: date}});
    };

    return(
        <div className='date-picker-container' ref={ref}>
            <InputComponent
                extraClasses={'date-picker'}
                fieldName={label}
                value={dateText}
                image={(<CalendarIcon/>)}
                onFocus={() => setShow(!show)}
                onChange={onInputChange}
            />
            <div className="calendar-container">
                {!!show && (
                    <Calendar
                        className='calendar'
                        locale={'pl'}
                        onChange={onCalendarChange}
                        value={date}
                    />
                )}
            </div>
        </div>
    )
}

DatePicker.propTypes = {
    value: PropTypes.string,
}