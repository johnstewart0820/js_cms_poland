import * as React from 'react';
import axios from "../../extra/axios";
import Loader from "../general/Loader";
import '../../styles/questionnaire/questionnaire.scss';
import ButtonLink from "../buttons/ButtonLink";

import Chart from "react-apexcharts";

const Questionnaire = () => {
    const [loading, setLoading] = React.useState(true);
    const [date, setDate] = React.useState(null)
    const [answers, setAnswers] = React.useState([])
    const [dateSeries, setDateSeries] = React.useState([])
    const [xaxisBoardd, setXaxisBoardd] = React.useState([])


    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/polls/1`)
            .then((res) => {
              res.data.poll.answers[0].votes =5
              res.data.poll.answers[1].votes =45
              res.data.poll.answers[2].votes =11
                setDate(res.data)
                setLoading(false);
            })


    }, []);

    React.useEffect(() => {
        let seriesBoard = [];
        let answers;
        let xaxisBoard = [];
        if (date) {
            answers = date.poll.answers.map(ans => {
                return <label className={'answer'}><input type="checkbox" value=""/>{ans.name}</label>
            })
            setAnswers(answers)

            date.poll.answers.forEach(r => {seriesBoard.push(r.votes)});
            setDateSeries(seriesBoard);

            date.poll.answers.forEach(r => {xaxisBoard.push(r.name)});
            setXaxisBoardd(xaxisBoard);

        }
    }, [date])



    const series = [{
        data: dateSeries,
        name: "",
    }]
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
        xaxis: {
            categories: xaxisBoardd
        },
    }


    if (!!loading)
        return <Loader/>


    return (

        <>
            <div className={'question-container'}>
                <div className={'question'}>{date.poll.question}</div>
                <div className={'answers'}>
                    {answers}
                </div>
                <ButtonLink>wyślij</ButtonLink>
            </div>
            <Chart options={options} series={series} type="bar" height={200}/>


        </>
    )
}
export default Questionnaire;