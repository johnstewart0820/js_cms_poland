import React from "react";
import {Container} from "../../../components/UserPanel/Container";
import Select from "../../../components/form/Select";
import '../../../styles/RegisterToEvent/RegisterToEventForm.scss';
import InputComponent from "../../../components/form/InputComponent";
import axios from '../../../extra/axios';
import '../../../styles/Calendar/Calendar.scss';
import {Calendar} from "react-calendar";
import moment from "moment";
import Loader from "../../../components/general/Loader";
import '../../../styles/helpers/classes.scss';
import {useHistory} from 'react-router-dom';
import TourismRoutes from "../../../constants/TourismRoutes";
import {Countries} from "../../../constants/Countries";


const RegisterToEvent = () => {
    const history = useHistory();
    const [state, setState] = React.useState({
        userName: '',
        email: '',
        postalCode: '',
        address: '',
        pesel: ''
    });
    const [events, setEvents] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [nationality, setNationality] = React.useState(null);
    const [birthDate, setBirthDate] = React.useState(new Date());
    const [loading, setLoading] = React.useState(true);
    const [notification, setNotification] = React.useState(null);
    const [group, setGroup] = React.useState(null);
    const [event, setEvent] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [groups, setGroups] = React.useState([]);

    React.useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        axios.get('https://api.ustron.s3.netcore.pl/subscription-events')
            .then((res) => {
                setGroups(res.data.events[0].custom_data.event.groups);
                setEvents(res.data.events);
                setLoading(false);
            }).catch((error) => setNotification(error.response.data));
    }

    const genderOptions = [
        {
            value: 'male',
            label: 'Męska płeć',
        },
        {
            value: 'female',
            label: 'Płeć żeńska',
        }
    ];

    const countryOptions = React.useMemo(() => {
        return Countries.map(country => ({
            value: country.code,
            label: country.name_pl
        }))
    }, []);

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

    const makeSubscription = (e) => {
        let cityData = state.address.split(' ' || ',');
        let pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        if(!!event && !!cityData && !!state.userName && !!nationality && !!state.email
            && !!gender && !!birthDate && state.postalCode && !!state.pesel) {
            let data = {
                name: state.userName,
                nationality: nationality,
                email: state.email,
                sex: gender,
                pesel: state.pesel,
                birthdate: birthDate,
                group_id: group,
                postcode: state.postalCode,
                city: cityData[0],
                address: (cityData[1] + cityData[2])
            }

            if (!pattern.test(state.email))
                setNotification('Proszę wpisac poprawny e-mail, np. przykladowy@mail.pl');

            if (state.pesel.length !== 9)
                setNotification('Pesel powinien zawierac 9 cyfr');

            if (!state.postalCode.charAt(2) == '-' || state.postalCode.length ==! 6) {
                setNotification('Proszę wpisać poprawny kod pocztowy, np. 11-111 ');
            } else {
                axios.post(`https://api.ustron.s3.netcore.pl/subscription-events/${event}/makeSubscription`, data)
                    .then(response => history.push(TourismRoutes.RegisterToEventConfirmationPage + '?id=' + response.data.id))
                    .catch((error) => setNotification(error.response.data.errors.join('\n')))
            }
        } else {
            setNotification('Proszę uzupełnić wszystkie pola');
        }
    }

    const handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'address') {
            setState({
                ...state,
                [e.target.name]: value
            });
        } else if (name === 'email') {
            const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            setState({
                ...state,
                [e.target.name]: regExp.test(String(value).toLowerCase())
            });
        }
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    if (!!loading) return <Container
        containerTitle={'REJESTRACJA NA ZAWODY'}
        setNotification={!!notification && true}
        notificationMessage={notification}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return(
        <Container
            containerTitle={'REJESTRACJA NA ZAWODY'}
            setNotification={!!notification && true}
            notificationMessage={notification}
        >
            <div className="container-inner">
                <div className="container-inner__body">
                    <Select extra_classes={'gray-input margin-bottom'} addEmptyOption={true} onChange={(e) => setEvent(e.target.value)} options={eventsOptions} label={'REJESTRACJA NA ZAWODY'} name={'registrationToEvent'}/>
                    <InputComponent onChange={handleInputChange} extraClasses={'container-inner-input__long'} fieldName={'NAZWISKO IMIĘ'} name={'userName'}/>
                    <InputComponent onChange={handleInputChange} extraClasses={'container-inner-input'}  fieldName={'E-MAIL'} name={'email'}/>
                    <InputComponent onChange={handleInputChange} extraClasses={'container-inner-input__margin-bottom'} type='number' placeholder={'91234000000'} fieldName={'PESEL'} name={'pesel'}/>
                    <div className="container-inner-row">
                        <div className="container-inner-col">
                            <Select extra_classes={'gray-input-fixed__width'} addEmptyOption={true} onChange={(e) => setNationality(e.target.value)} options={countryOptions} label={'NARODOWOŚĆ'} name={'country'}/>
                            <Select extra_classes={'gray-input'} addEmptyOption={true} onChange={(e) => setGender(e.target.value)} options={genderOptions} label={'PLEC'} name={'gender'}/>
                        </div>
                        <div className="container-inner-col">
                            <InputComponent
                                onClick={() => (show === false ? setShow(true) : setShow(false))}
                                value={moment(birthDate ,"DD-MM-YYYY").format('DD.MM.YYYY')}
                                extraClasses={'birth-date-input'}
                                fieldName={'DATA URODZENIA'} name={'birthDate'}/>
                            {show === true && (
                                <div className="calendar-container">
                                    <Calendar
                                        onChange={setBirthDate}
                                        className='calendar'
                                        value={birthDate}
                                        locale={'pl'}
                                    />
                                </div>
                            )}
                            <Select extra_classes={'gray-input'} addEmptyOption={true} onChange={(e) => setGroup(e.target.value)} options={groupOptions} label={'GRUPA'} name={'group'}/>
                        </div>
                    </div>
                    <div className="container-inner-row">
                        <div className="container-inner-col">
                            <InputComponent
                                type="number"
                                onChange={handleInputChange}
                                extraClasses={'container-inner-input__margin-top'}
                                fieldName={'KOD MIASTA'} name={'postalCode'}/>
                        </div>
                        <div className="container-inner-col">
                            <InputComponent
                                onChange={handleInputChange}
                                extraClasses={'container-inner-input__margin-top'}
                                fieldName={'MIASTO, ULICA, NR. DOMU'}
                                name={'address'}/>
                        </div>
                    </div>
                    <div className="container-inner-row">
                        <div className="container-inner-row-button">
                            <button
                                className="button-link green full-width"
                                onClick={makeSubscription}
                            >ZAREJESTRUJ</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default RegisterToEvent;