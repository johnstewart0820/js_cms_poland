import React from 'react';
import {useHistory} from 'react-router-dom';
import "../../styles/auth/auth-panel.scss";
import ButtonLink from "../buttons/ButtonLink";
import TourismRoutes from "../../constants/TourismRoutes";

const AuthPanel = (props) => {
	const history = useHistory();

	return (
		<div className="auth-panel">
			<p> Twoje konto </p>

			<ButtonLink href="#" extra_classes="green" onClick={() => history.push(TourismRoutes.Login)}> <span> Zaloguj się </span> </ButtonLink>
			<ButtonLink href="#" extra_classes="green-transparent" onClick={() => history.push(TourismRoutes.Registration)}> <span> Zarejestruj się </span>  </ButtonLink>

		</div>
	)
}

AuthPanel.propTypes = { }

export default AuthPanel;