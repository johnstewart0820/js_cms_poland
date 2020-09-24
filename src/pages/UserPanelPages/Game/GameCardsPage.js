import React from "react";
import {Container} from "../../../components/UserPanel/Container";
import Row from "../../../components/helpers/Row";
import '../../../styles/Game/GameCardsPage.scss';
import ProgressBar from "../../../components/Object/ProgressBar";
import ButtonUnderline from "../../../components/Object/ButtonUnderline";
import Card from "../../../components/StadiumReservationComponents/Card";
import axios from '../../../extra/axios';
import Loader from "../../../components/general/Loader";
import {AxeAndShovelIcon, CampFireIcon, FishIcon, MapWithMarkerIcon, TwoMarkersIcon} from "../../../svg/icons";


const items = [
    {
        image: <TwoMarkersIcon/>
    },
    {
        image: <CampFireIcon/>
    },
    {
        image: <FishIcon/>
    },
    {
        image: <AxeAndShovelIcon/>
    },
    {
        image: <MapWithMarkerIcon/>
    }
]


const GameCardsPage = () => {
    const [games, setGames] = React.useState(null);
    const [level, setLevel] = React.useState(null);
    const [completedGames, setCompletedGames] = React.useState(null);
    const [notification, setNotification] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/games')
            .then((res) => {
                setGames(res.data.games);
                setLevel(res.data.info.level);
                setCompletedGames(res.data.info.completed);
                setLoading(false);
            })
            .catch((err) => setNotification(err));
    },[]);

    console.log(level)


    if (!!loading)
        return <Loader/>

    return(
        <Container
            containerTitle={'NAZWA GRY'}
            extraClasses={'container-white'}
            setNotification={!!notification && true}
            notificationMessage={notification}
        >
            <div className="container-inner">
                <Row>
                    <div className="page-logo">
                        <img alt='' src={require('../../../svg/icons/game-header-image.svg')}/>
                        <h4>
                            GRA<br/>
                            PRZEZNACZONA<br/>
                            NA TELEFONY<br/>
                            KOMORKOWE<br/>
                        </h4>
                    </div>
                    <ProgressBar
                        items={items}
                        progress={level || ''}
                    />
                </Row>
                <Row>
                    <ButtonUnderline extraClasses={'bg-white'} buttonText={'Nieodkryte'}/>
                    <ButtonUnderline extraClasses={'bg-white'} buttonText={'Odkryte'}/>
                    <ButtonUnderline extraClasses={'bg-white'} buttonText={'wszystkie'}/>
                </Row>
                <Row>
                    {games?.map((game, index) => {
                        return (
                            <Card
                                key={index}
                                name={game.categories[0].name}
                                extraClasses={'game-card'}
                                title={game.title}
                                thumbnail={'../../../img/loop/1.jpg'}
                                greenButtonText={'dowiedz się wiecej'}
                            />
                        )
                    })}

                </Row>
            </div>
        </Container>
    )
}

export default GameCardsPage;