import React from 'react';
import {Container} from "../../../components/UserPanel/Container";
import SingeGamePageHeader from "../../../components/GamePagesComponents/SingleGamePageHeader";
import axios from '../../../extra/axios';
import Loader from "../../../components/general/Loader";
import '../../../styles/Game/QuizPage.scss';
import Parser from "html-react-parser";


const QuizPage = props => {
    const completedBy = props.match.path.split('/').splice(-1)[0];
    const pageId = props.match.params.id;
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [acf, setAcf] = React.useState(null);
    const [answer, setAnswer] = React.useState(null);
    const coords = [];


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
            fullAnswer: answer.field_game_question,
            index,
        });
    }

    const sendData = () => {
        if (answer.isCorrect) {
            const gps = acf?.field_map_gps.split(';');
            coords.push({
                lat: gps[0],
                lng: gps[1]
            });
            axios.post(
                `https://api.ustron.s3.netcore.pl/games/${pageId}/${completedBy}`,
                {
                    lat: coords[0].lat,
                    lng: coords[0].lng,
                    answer: answer.fullAnswer
                }).then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
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
                    <div key={index} className={`quiz-container ${answer && answer.index === index && (answer.isCorrect ? 'quiz-container-green' : 'quiz-container-red')}`}>
                        <label>
                            <input
                                disabled={!!answer}
                                type='radio'
                                name='answers'
                                onClick={() => selectAnswer(variant, index)}
                            />
                            {variant.field_game_question}
                        </label>
                        {answer && answer.index === index && (
                            answer.isCorrect ? <h3>Dziękuję. Odpowiedź jest prawidłową</h3> : <h3>Odpowiedź jest nie prawidłową</h3>
                        )}
                    </div>
                )
            })}
            {answer?.isCorrect && <button className='button-link green full-width quiz-page-button' onClick={sendData}>DALEJ</button>}
        </Container>
    )
}

export default QuizPage;