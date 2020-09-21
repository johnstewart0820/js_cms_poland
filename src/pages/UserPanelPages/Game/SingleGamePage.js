import React from 'react';
import {Container} from "../../../components/UserPanel/Container";
import Col from "../../../components/helpers/Col";
import '../../../styles/Game/SingleGamePage.scss';
import axios from "../../../extra/axios";
import Loader from "../../../components/general/Loader";
import Row from "../../../components/helpers/Row";
import ButtonsContainer from "../../../components/GamePagesComponents/SingleGamePageButtonsContainer";
import SingeGamePageHeader from "../../../components/GamePagesComponents/SingleGamePageHeader";
import Parser from "html-react-parser";

const pageId = 562;

const SingleGamePage = () => {
    const [data, setData] = React.useState(null);
    const [notification, setNotification] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/contents/posts/${pageId}`)
            .then((res) => {
                console.log(res.data.content)
                setData(res.data.content)
                setLoading(false);
            })
    },[]);

    if (!!loading)
        return <Loader/>

    {console.log(data)}
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
            <ButtonsContainer/>
        </Container>
    )
}

export default SingleGamePage;