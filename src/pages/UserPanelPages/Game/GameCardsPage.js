import React from "react";
import {Container} from "../../../components/UserPanel/Container";
import Row from "../../../components/helpers/Row";
import '../../../styles/Game/GameCardsPage.scss';
import ProgressBar from "../../../components/Object/ProgressBar";
import ButtonUnderline from "../../../components/Object/ButtonUnderline";
import Card from "../../../components/StadiumReservationComponents/Card";


const GameCardsPage = () => {

    const [completed, setCompleted] = React.useState(0);


    return(
        <Container
            containerTitle={'NAZWA GRY'}
            extraClasses={'container-white'}
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
                    <ProgressBar bgcolor={"#85CB3F"} completed={100}/>
                </Row>
                <Row>
                    <ButtonUnderline extraClasses={'bg-white'} buttonText={'Nieodkryte'}/>
                    <ButtonUnderline extraClasses={'bg-white'} buttonText={'Odkryte'}/>
                    <ButtonUnderline extraClasses={'bg-white'} buttonText={'wszystkie'}/>
                </Row>
                <Row>
                    <Card
                        name={'kategoria'}
                        extraClasses={'game-card'}
                        title={'Boisko piłkarskie ze sztuczną nawierzchnią'}
                        thumbnail={'../../../img/loop/1.jpg'}
                        greenButtonText={'dowiedz się wiecej'}
                    />
                    <Card
                        name={'kategoria'}
                        extraClasses={'game-card'}
                        title={'Boisko piłkarskie ze sztuczną nawierzchnią'}
                        thumbnail={'../../../img/loop/1.jpg'}
                        greenButtonText={'dowiedz się wiecej'}
                    />
                    <Card
                        name={'kategoria'}
                        extraClasses={'game-card'}
                        title={'Boisko piłkarskie ze sztuczną nawierzchnią'}
                        thumbnail={'../../../img/loop/1.jpg'}
                        greenButtonText={'dowiedz się wiecej'}
                    />
                </Row>
            </div>
        </Container>
    )
}

export default GameCardsPage;