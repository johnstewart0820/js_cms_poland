import React from 'react';
import {Container} from "../../../components/UserPanel/Container";
import '../../../styles/StadiumReservationPages/ReservationPage.scss';
import {Calendar} from "react-calendar";
import '../../../styles/Calendar/Calendar.scss';
import InputComponent from "../../../components/form/InputComponent";
import DayButton from "../../../components/StadiumReservationComponents/DayButton";
import RadioButton from "../../../components/form/RadioButton";
import axios from '../../../extra/axios';
import moment from 'moment';
import usePrevious from "../../../hooks/usePrevious";
import {useHistory} from "react-router-dom";
import Loader from "../../../components/general/Loader";
import '../../../styles/helpers/classes.scss';
import Row from "../../../components/helpers/Row";
import Col from "../../../components/helpers/Col";

const ReservationCalendarPage = props => {
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
    const [notification, setNotification] = React.useState(null);
    const history = useHistory();

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
                setNotification(error.data?.error);
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

    const makeReservation = () => {
        if (selectedTime) {
            axios.post(`https://api.ustron.s3.netcore.pl/courts/${pageId}/makeReservation`, {
                day: selectedDay.day,
                time_frame: selectedTime,
            }).then(response => history.push('/reservation-confirmation?id=' + response.data.id))
        } else {
            alert('Wybierz czas');
        }
    }

    const handleChange = e => setSelectedTime(e.target.value);

    if (!!loading) return <Container
        containerTitle={'BOISKA REZERWACJA'}
        setNotification={!!notification && true}
        notificationMessage={notification}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return (
        <Container
            containerTitle={'BOISKA REZERWACJA'}
            setNotification={!!notification && true}
            notificationMessage={notification}
        >
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
                    <div>
                        <div className="calendar-container">
                            <InputComponent
                                disabled
                                fieldName={'DATA'}
                                containerStyles={{margin: '40px 0px 10px 0px', borderColor: '#85CB3F'}}
                                value={moment(calendarDate ,"DD-MM-YYYY").format('DD.MM.YYYY')}
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
                    </div>
                    <Col>
                        <Row>
                            <div className="day-button__container">
                                {days.map((item) => {
                                    const date = moment(item.day, 'DD.MM.YYYY');
                                    console.log(item.day)
                                    const convertedDate = date.format('DD.MM.YYYY');
                                    const convertedCalendarDate = moment(calendarDate).format('DD.MM.YYYY');
                                    return <DayButton
                                        key={item.day}
                                        active={convertedDate === convertedCalendarDate}
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
                                                    disabled={selectedDay?.time_table[key]?.is_available === false}
                                                    onChange={handleChange}
                                                />
                                            ))
                                        : <h3>Wybierz datę</h3>
                                    }
                                </div>
                                <Col>
                                    <button
                                        className="button-link green full-width"
                                        style={{marginTop: '20px'}}
                                        onClick={makeReservation}>REZERWUJ</button>
                                </Col>
                            </div>
                        </Row>
                    </Col>
                </div>
            </Row>
        </Container>
    )
}

export default ReservationCalendarPage;
