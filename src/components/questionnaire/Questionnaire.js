import * as React from 'react';
import axios from "../../extra/axios";
import Loader from "../general/Loader";
import '../../styles/questionnaire/questionnaire.scss';
import ButtonLink from "../buttons/ButtonLink";

const Questionnaire = () => {
    const [loading, setLoading] = React.useState(true);
    const [date, setDate] = React.useState(null)
    const [answers, setAnswers] = React.useState([])

    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/polls/1`)
            .then((res) => {
                setDate(res.data)
                setLoading(false);
            })


    }, []);

    React.useEffect(() => {
        console.log(date)
        let answers;
        if (date) {
            answers = date.poll.answers.map(ans => {
                console.log(ans)
                return <label className={'answer'}><input type="checkbox" value=""/>{ans.name}</label>
            })
            setAnswers(answers)
        }
    }, [date])


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

        </>
    )
}
export default Questionnaire;