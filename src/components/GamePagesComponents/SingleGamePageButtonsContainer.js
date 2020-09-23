import React from 'react';
import ButtonLink from "../buttons/ButtonLink";

const SimpleGamePageButtonsContainer = ({})=>{
    const visitButton = "potwierdz wizytę GPS";
    const qrButton = "skanuj Qr kod";

    return(
        <div className={'buttons-category'}>
            <button className="button-link green full-width">{qrButton.toUpperCase()}</button>
            <ButtonLink extra_classes="green-transparent" >{visitButton.toUpperCase()}</ButtonLink>
        </div>
    );
}

export default SimpleGamePageButtonsContainer;