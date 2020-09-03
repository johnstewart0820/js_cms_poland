import React from "react";
import InputComponent from "./InputComponent";
import {Calendar} from "react-calendar";
import '../../styles/form/DatePicker.scss';
import PropTypes from "prop-types";
import {CalendarIcon} from "../../svg/icons";

export const DatePicker = ({value, label}) => {
    const [show, setShow] = React.useState(false);

    return(
        <>
            <div>
                <InputComponent
                    extraClasses={'date-picker'}
                    fieldName={label}
                    value={value}
                    image={(<CalendarIcon/>)}
                    onClick={() => (show === false ? setShow(true) : setShow(false))}
                />
                <div className="calendar-container">
                    {!!show && (
                        <Calendar
                            className='calendar'
                            locale={'pl'}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

DatePicker.propTypes = {
    value: PropTypes.string.isRequired,
}