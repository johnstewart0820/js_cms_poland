import React from 'react';
import {Container} from "../../../components/UserPanel/Container";
import '../../../styles/Game/SingleGamePage.scss';
import axios from "../../../extra/axios";
import Loader from "../../../components/general/Loader";
import ButtonsContainer from "../../../components/GamePagesComponents/SingleGamePageButtonsContainer";
import SingeGamePageHeader from "../../../components/GamePagesComponents/SingleGamePageHeader";
import Parser from "html-react-parser";
import {useHistory} from 'react-router-dom';
import TourismRoutes from "../../../constants/TourismRoutes";


const SingleGamePage = props => {
    const history = useHistory();
    const pageId = props.match.params.id;
    const [data, setData] = React.useState(null);
    const [notification, setNotification] = React.useState(null);
    const [loading, setLoading] = React.useState(true);


    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/contents/posts/${pageId}`)
            .then((res) => {
                setData(res.data.content)
                setLoading(false);
            })
    },[]);


    if (!!loading)
        return <Loader/>

    return(
        <Container
            containerTitle={'nazwa gry'}
        >
            <SingeGamePageHeader
                title={data.title}
                category={data.categories[0].name}
                imageSrc={data.image}
            />
            <div className={'description'}>
                <div className={'court-description'}>{Parser(data.body)}</div>
            </div>
            <ButtonsContainer
                qrButtonOnClick={() => history.push(TourismRoutes.QuizPageByQr(pageId))}
                visitButtonOnClick={() => history.push(TourismRoutes.QuizPageByGps(pageId))}
            />
        </Container>
    )
}

export default SingleGamePage;