import React from 'react';
import {Container} from "../../components/userPanel/Container";
import {Col, Row} from "react-bootstrap";
import '../../styles/StadiumReservationPages/ReservationPage.scss';
import {Calendar} from "react-calendar";
import '../../styles/Calendar/Calendar.scss';
import InputComponent from "../../components/form/InputComponent";
import DayButton from "../../components/StadiumReservationComponents/DayButton";
import RadioButton from "../../components/form/RadioButton";
import axios from '../../extra/axios';
import moment from 'moment';
import usePrevious from "../../hooks/usePrevious";

const ReservationPage = props => {
    const pageId = props.match.params.id;
    if (!pageId) {
        // FIXME add no page id handler
    }

    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const prevCalendarDate = usePrevious(calendarDate);
    const [court, setCourt] = React.useState([]);
    const [days, setDays] = React.useState([]);
    const [selectedDay, setSelectedDay] = React.useState(null);
    const [selectedTime, setSelectedTime] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setSelectedDay(days.find(item => item.day === moment(calendarDate).format('DD.MM.YYYY')) || null);
    }, [calendarDate, days]);

    // reload days when months or year changes
    React.useEffect(() => {
        if (!prevCalendarDate)
            return;

        const oldDate = moment(prevCalendarDate);
        const newDate = moment(calendarDate);

        const oldMonth = oldDate.month();
        const oldYear = oldDate.year();
        const newMonth = newDate.month();
        const newYear = newDate.year();

        if (`${oldMonth}.${oldYear}` !== `${newMonth}.${newYear}`) {
            getDays();
        }
    }, [calendarDate]);

    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/courts/${pageId}?lang=pl`)
            .then((response) => {
                setCourt(response.data.court);
            })
            .then(getDays)
            .catch(error => {
                alert(error);
                setLoading(false);
            });
    }, []);

    const getDays = async () => {
        setLoading(true);
        const month = moment(calendarDate).month() + 1;
        const year = moment(calendarDate).year();

        const response = await axios.get(`https://api.ustron.s3.netcore.pl/courts/${pageId}/getTimetable?month=${month}&year=${year}`);
        setDays(response.data.days);
        setLoading(false);
    }

    const handleChange = e => setSelectedTime(e.target.value);

    return (
        <Container containerTitle={'BOISKA REZERWACJA'}>
            <Row>
                <div className='reservation-header'>
                    <p>BOISKO/ KATEGORIA ORLIK</p>
                    <h1>
                        {court.title}
                    </h1>
                </div>
            </Row>
            <Row>
                <div className="reservation-body">
                    <Col>
                        <div className="calendar-container">
                            <InputComponent
                                fieldName={'DATA'}
                                containerStyles={{margin: '40px 0px 10px 0px', borderColor: '#85CB3F'}}
                            />
                            <Calendar
                                className='calendar'
                                onChange={setCalendarDate}
                                value={calendarDate}
                                locale={'pl'}
                            />
                            <h4>
                                Prosimy o zapoznanie się z limitem dotyczącym rezerwacji dla<br/>
                                jednego użytkownika. Szczegółowo opisany w regulaminie.
                            </h4>
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <div className="day-button__container">
                                {days.map((item) => {
                                    const date = moment(item.day, 'DD.MM.YYYY');
                                    return <DayButton
                                        key={item.day}
                                        active={date.isSame(calendarDate)}
                                        onClick={() => setCalendarDate(date.toDate())}
                                        dayName={date.format('dddd').toUpperCase()}
                                        monthName={date.format('MMMM').toUpperCase()}
                                        date={date.format('DD')}
                                    />;
                                })}
                            </div>
                        </Row>
                        <Row>
                            <div style={{margin: '20px'}}>
                                <h3>
                                    Dostępne godziny rezerwacji
                                </h3>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    {selectedDay !== null
                                        ? Array.isArray(selectedDay?.time_table)
                                            ? <h3>Brak czasu wolnego w tym dniu</h3>
                                            : Object.keys(selectedDay.time_table).map(key => (
                                                <RadioButton
                                                    key={key}
                                                    label={key}
                                                    value={key}
                                                    containerStyles={{marginTop: '10px'}}
                                                    checked={selectedTime === key}
                                                    disabled={!!selectedDay?.time_table[key]?.is_available}
                                                    onChange={handleChange}
                                                />
                                            ))
                                        : <h3>Wybierz datę</h3>
                                    }
                                </div>
                            </div>
                        </Row>
                    </Col>
                </div>
            </Row>
        </Container>
    )
}

export default ReservationPage;
