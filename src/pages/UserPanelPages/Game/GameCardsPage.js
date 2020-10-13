import React from "react";
import {Container} from "../../../components/UserPanel/Container";
import Row from "../../../components/helpers/Row";
import '../../../styles/Game/GameCardsPage.scss';
import ProgressBar from "../../../components/Object/ProgressBar";
import ButtonUnderline from "../../../components/Object/ButtonUnderline";
import Card from "../../../components/StadiumReservationComponents/Card";
import axios from '../../../extra/axios';
import Loader from "../../../components/general/Loader";
import {useHistory} from "react-router-dom";
import TourismRoutes from "../../../constants/TourismRoutes";

import {
    AxeAndShovelIcon,
    CampFireIcon,
    FishIcon, GreenEyeIcon,
    MapWithMarkerIcon,
    RedEyeIcon,
    TwoMarkersIcon,
} from "../../../svg/icons";
import {API_URL} from "../../../extra/API";
import GameCard from "../../../components/Cards/GameCard";


const items = [
    {
        image: <TwoMarkersIcon/>,
        name: 'Nowicjusz'
    },
    {
        image: <CampFireIcon/>,
        name: 'Mały odkrywca'
    },
    {
        image: <FishIcon/>,
        name: 'Zawodowiec'
    },
    {
        image: <AxeAndShovelIcon/>,
        name: 'Ekspert'
    },
    {
        image: <MapWithMarkerIcon/>,
        name: 'Mistrz'
    }
]

const Filters = {
    All: 'all',
    Closed: 'closed',
    Opened: 'opened',
};

const GameCardsPage = () => {
    const [games, setGames] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [level, setLevel] = React.useState(null);
    const [completedGames, setCompletedGames] = React.useState(null);
    const [notification, setNotification] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [gamesFilter, setGamesFilter] = React.useState(Filters.All);
    const history = useHistory();

    const buttons = [
        {
            extraClasses: 'bg-white',
            buttonText: 'Nieodkryte',
            filter: Filters.Closed,
            onClick: () => setGamesFilter(Filters.Closed)
        },
        {
            extraClasses: 'bg-white',
            buttonText: 'Odkryte',
            filter: Filters.Opened,
            onClick: () => setGamesFilter(Filters.Opened)
        },
        {
            extraClasses: 'bg-white',
            buttonText: 'wszystkie',
            filter: Filters.All,
            onClick: () => setGamesFilter(Filters.All)
        }
    ];

    React.useEffect(() => {
        axios.get(`${API_URL}games`)
            .then((res) => {
                setData(res.data.games);
                setGames(res.data.games);
                setLevel(res.data.info.level);
                setCompletedGames(res.data.info.completed);
            })
            .catch((err) => {
                if (err.status === '-403') {
                    return TourismRoutes.Login
                }
                setNotification(err)
            })
            .finally(() => setLoading(false));
    },[]);

    React.useEffect(() => {
        if (!data)
            return;

        setGames(data.filter(game => {
            switch (gamesFilter) {
                case Filters.All: return true;
                case Filters.Opened: return completedGames.includes(game.id);
                case Filters.Closed: return !completedGames.includes(game.id);
                default: return false;
            }
        }));
    },[gamesFilter]);

    const openOnGoogleMap = coords => {
        const coordinates = coords.split(';');
        const url = `https://maps.google.com/?q=${coordinates[0]},${coordinates[1]}`;
        window.open(url, '_blank');
    }


    if (!!loading) return <Container
        containerTitle={'NAZWA GRY'}
        setNotification={!!notification && true}
        notificationMessage={notification}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

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
                    {buttons.map((button, index) => (
                        <ButtonUnderline
                            key={index}
                            extraClasses={button.extraClasses + (button.filter === gamesFilter ? ' active' : '')}
                            buttonText={button.buttonText}
                            onClick={button.onClick}
                        />
                    ))}
                </Row>
                <Row>
                    {games?.map((game, index) => {
                        return (
                            <GameCard
                                key={index}
                                name={game.categories[0].name}
                                extraClasses={'game-card'}
                                title={game.title}
                                original_image={game.original_image}
                                greenButtonText={'dowiedz się wiecej'}
                                eyeButtonImage={completedGames.includes(game.id) ? <GreenEyeIcon/> : <RedEyeIcon/>}
                                onClickGreenButton={() => history.push(TourismRoutes.SingleGamePage(game.id))}
                                onClickPlaneButton={() => openOnGoogleMap(game.acf.field_map_gps)}
                            />
                        )
                    })}
                </Row>
            </div>
        </Container>
    )
}

export default GameCardsPage;