import * as React from 'react';
import axios from "../../extra/axios";
import Loader from "../general/Loader";
import '../../styles/questionnaire/questionnaire.scss';
import Chart from "react-apexcharts";
import {API_URL} from "../../extra/API";

const Questionnaire = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const [answers, setAnswers] = React.useState([]);
    let [dateSeries, setDateSeries] = React.useState([]);
    const [xaxisSeries, setXaxisSeries] = React.useState([]);
    let [tabVotes, setTabVotes] = React.useState([]);
    const [showChart, setShowChart] = React.useState(localStorage.getItem(`showChart${props.indexOfPoll}`));
    const [idRadioInput, setIdRadioInput] = React.useState(null);

    const series = [{
        data: dateSeries,
        name: "",
    }];
    const options = {

        chart: {
            type: 'bar',
            height: 200,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#6495ED', '#E91E63', '#7FFF00'],
        xaxis: {
            categories: xaxisSeries,
        },
    }

    React.useEffect(() => {
        axios.get(`${API_URL}polls/${props.indexOfPoll}`)
            .then((res) => {
                setData(res.data)
                setLoading(false);
            })
    }, []);

    React.useEffect(() => {
        if (data) {
            const typeOfPoll = data.poll.type;
            let firstId = data.poll.answers[0].id;
            setAnswers(data.poll.answers.map((ans, key) => {

                return (
                    <div
                        className={'answer'}
                        key={key}
                        onChange={typeOfPoll === 'single' ? onChangeRadioInput : false}>
                        <label>
                            <input
                                onChange={(e) => handleChange(e)}
                                name={typeOfPoll === 'single' ? "radio" : ""}
                                type={typeOfPoll === 'multi' ? "checkbox" : "radio"}
                                id={firstId++}
                            />
                            {ans.name}
                        </label>
                    </div>)
            }));
            let seriesBoard = [];
            let xaxisBoard = [];
            data.poll.answers.forEach(r => {
                seriesBoard.push(r.votes);
            });
            setDateSeries(seriesBoard);

            data.poll.answers.forEach(r => {
                xaxisBoard.push(r.name);
            });
            setXaxisSeries(xaxisBoard);
        }
    }, [data, tabVotes]);

    function onChangeRadioInput(e) {
        setIdRadioInput(e.target.id)
    }

    const handleChange = (e) => {
        const id = e.target.id;
        const val = e.target.checked;
        const parserId = parseInt(id)

        if (!tabVotes.includes(parserId) && val === true) {
            tabVotes.push(parserId);
        }
        if (tabVotes.includes(parserId) && val === false) {
            delete tabVotes[tabVotes.indexOf(parserId)]
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const typeOfPoll = data.poll.type;
        if (tabVotes.length !== 0) {
            if (typeOfPoll === 'single') {
                tabVotes = [];
                tabVotes.push(idRadioInput)
            }
            axios.post(`${API_URL}polls/${props.indexOfPoll}/vote`,
                {votes: tabVotes})
                .then();
            axios.get(`${API_URL}polls/${props.indexOfPoll}`)
                .then(res => {
                    setData(res.data)
                    dateSeries = []
                    res.data.poll.answers.map(r => dateSeries.push(r.votes))
                    setDateSeries(dateSeries);
                    setLoading(false);
                })
            localStorage.setItem(`showChart${props.indexOfPoll}`, 'true');
            setShowChart(localStorage.getItem(`showChart${props.indexOfPoll}`));
        }
    }

    if (!!loading)
        return <Loader/>

    return (
        <>
            <div className={'question-container'}>
                <div className={'question'}>{data.poll.question}</div>
                {!showChart ? (
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={'answers'}>
                            {answers}
                        </div>
                        <button className={'button-send'} type='submit'>wyślij</button>
                    </form>
                ) : <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height={200}/>}
            </div>

        </>
    )
}
export default Questionnaire;