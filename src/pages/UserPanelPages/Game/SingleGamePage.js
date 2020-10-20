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
import Modal from "../../../components/modal/Modal";
import QrReader from 'react-qr-reader'
import {API_URL} from "../../../extra/API";


const SingleGamePage = props => {
    const history = useHistory();
    const pageId = props.match.params.id;
    const [data, setData] = React.useState(null);
    const [notification, setNotification] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [show, setShow] = React.useState(false);
    const [scan, setScan] = React.useState({result: ''});


    React.useEffect(() => {
        axios.get(`${API_URL}contents/posts/${pageId}`)
            .then((res) => {
                setData(res.data.content)
                setLoading(false);
            })
    },[]);

    const handleScan = data => {
        if (data) {
            setScan({
                result: data
            });
            setShow(false);
            history.push(TourismRoutes.QuizPageByQr(pageId, data));
        }
    }


    if (!!loading)
        return <Loader/>

    return(
        <>
            <Container
                containerTitle={'nazwa gry'}
            >
                <SingeGamePageHeader
                    title={data.title}
                    category={data.categories[0].name}
                    imageSrc={data.image}
                />
                <div className={'single-game-description'}>
                    <div className={'court-description'}>{Parser(data.body)}</div>
                </div>
                <ButtonsContainer
                    qrButtonOnClick={() => setShow(true)}
                    visitButtonOnClick={() => history.push(TourismRoutes.QuizPageByGps(pageId))}
                />
            </Container>


            <Modal
                show={show}
            >
                <QrReader
                    delay={300}
                    onError={(err) => console.log(err)}
                    onScan={handleScan}
                    style={{ width: '100%'}}
                />
            </Modal>
        </>
    )
}

export default SingleGamePage;