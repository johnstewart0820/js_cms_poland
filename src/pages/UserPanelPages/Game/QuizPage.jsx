import React from 'react';
import {Container} from "../../../components/UserPanel/Container";
import SingeGamePageHeader from "../../../components/GamePagesComponents/SingleGamePageHeader";
import axios from '../../../extra/axios';
import Loader from "../../../components/general/Loader";
import '../../../styles/Game/QuizPage.scss';
import Parser from "html-react-parser";


const QuizPage = props => {
    const pageId = props.match.params.id;
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [acf, setAcf] = React.useState(null);
    const [answer, setAnswer] = React.useState(null);

    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/contents/posts/${pageId}`)
            .then((res) => {
                setData(res.data.content)
                setLoading(false);
                setAcf(res.data.content.acf);
            })
    },[]);

    const selectAnswer = (answer, index) => {
        setAnswer({
            isCorrect: !!answer.field_game_question_is_correct,
            index,
        });
    }


    if (!!loading)
        return <Loader/>;

    return (
        <Container
            containerTitle={'nazwa gry'}
        >
            <SingeGamePageHeader
                title={data.title}
                category={data.categories[0].name}
                imageSrc={data.image}
            />

            <div className={'description'}>
                <div className={'court-description'}>{Parser(acf?.field_game_question || '')}</div>
            </div>

            {acf?.field_game_answers.map((variant, index) => {
                return (
                    <div key={index} className='quiz-container'>
                        <label>
                            <input
                                disabled={!!answer}
                                type='radio'
                                name='answers'
                                onClick={() => selectAnswer(variant, index)}
                            />
                            {variant.field_game_question}
                            {answer && answer.index === index && (
                                answer.isCorrect ? ' Correct' : ' Incorrect'
                            )}
                        </label>
                    </div>
                )
            })}

            <button className='button-link green full-width'>DALEJ</button>
        </Container>
    )
}

export default QuizPage;