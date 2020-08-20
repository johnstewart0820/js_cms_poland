import React from "react";
import {Container} from "../../components/UserPanel/Container";
import Select from "../../components/form/Select";
import '../../styles/RegisterToEvent/RegisterToEventForm.scss';
import InputComponent from "../../components/form/InputComponent";
import axios from '../../extra/axios';
import '../../styles/Calendar/Calendar.scss';
import {Calendar} from "react-calendar";
import moment from "moment";
import Loader from "../../components/general/Loader";
import '../../styles/helpers/classes.scss';


const RegisterToEvent = () => {
    const [state, setState] = React.useState({
        userName: '',
        email: '',
        birthDate: '',
        cityCode: '',
        address: ''
    });

    const [events, setEvents] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [nationality, setNationality] = React.useState('');
    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [loading, setLoading] = React.useState(true);
    const [gender, setGender] = React.useState([
        {
            value: 1,
            label: 'Męska płeć',
        },
        {
            value: 2,
            label: 'Płeć żeńska',
        }
    ]);
    const [groups, setGroups] = React.useState([]);

    const groupOptions = React.useMemo(() => {
        return groups?.length ? groups.map(group => ({
            value: group.id,
            label: group.name,
        })) : [];
    }, [groups]);

    const eventsOptions = React.useMemo(() => {
        return events?.length ? events.map(event => ({
            value: event.id,
            label: event.title,
        })) : [];
    }, [events]);

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get('https://api.ustron.s3.netcore.pl/subscription-events')
            .then((res) => {
                console.log(res.data.events)
                setGroups(res.data.events[0].custom_data.event.groups);
                setEvents(res.data.events);
                setLoading(false);
            })
    }

    const handleInputChange = e => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    if (!!loading) return <Container
        containerTitle={'REJESTRACJA NA ZAWODY'}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return(
        <Container
            containerTitle={'REJESTRACJA NA ZAWODY'}
        >
            <div className="container-inner">
                <div className="container-inner__body">
                    <Select extra_classes={'gray-input margin-bottom'} options={eventsOptions} label={'REJESTRACJA NA ZAWODY'} name={'registrationToEvent'}/>
                    <InputComponent onChange={handleInputChange} containerStyles={{minHeight: '60px', maxWidth: '806px'}} fieldName={'NAZWISKO IMIĘ'} name={'userName'}/>
                    <InputComponent onChange={handleInputChange} containerStyles={{minHeight: '60px', width: '398px', marginBottom: '50px'}} fieldName={'E-MAIL'} name={'email'}/>
                    <div className="container-inner-row">
                        <div className="container-inner-col">
                            <Select extra_classes={'gray-input'} label={'NARODOWOŚĆ'} name={'country'}/>
                            <Select extra_classes={'gray-input'} options={gender} label={'PLEC'} name={'gender'}/>
                        </div>
                        <div className="container-inner-col">
                            <InputComponent
                                onChange={handleInputChange}
                                onClick={() => (show === false ? setShow(true) : setShow(false))}
                                value={moment(calendarDate ,"DD-MM-YYYY").format('DD.MM.YYYY')}
                                containerStyles={{minHeight: '60px', margin: '10px 5px'}}
                                fieldName={'DATA URODZENIA'} name={'birthDate'}/>
                            {show === true && (
                                <div className="calendar-container">
                                    <Calendar
                                        onChange={setCalendarDate}
                                        className='calendar'
                                        value={calendarDate}
                                        locale={'pl'}
                                    />
                                </div>
                            )}
                            <Select extra_classes={'gray-input'} options={groupOptions} label={'GRUPA'} name={'group'}/>
                        </div>
                    </div>
                    <div className="container-inner-row">
                        <div className="container-inner-col">
                            <InputComponent
                                onChange={handleInputChange}
                                containerStyles={{minHeight: '60px', marginTop: '50px'}}
                                fieldName={'KOD MIASTA'} name={'cityCode'}/>
                        </div>
                        <div className="container-inner-col">
                            <InputComponent
                                onChange={handleInputChange}
                                containerStyles={{minHeight: '60px', marginTop: '50px'}}
                                fieldName={'ULICA, NR, DOMU'}
                                name={'address'}/>
                        </div>
                    </div>
                    <div className="container-inner-row">
                        <button
                            className="button-link green full-width"
                            onClick={() => console.log()}
                        >ZAREJESTRUJ</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default RegisterToEvent;