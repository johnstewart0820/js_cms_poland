import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/auth/auth-panel.scss";
import ButtonLink from "../buttons/ButtonLink";

const AuthPanel = (props) => (
	<div className="auth-panel">
		<p> Twoje konto </p>

		<ButtonLink href="#" extra_classes="green" > <span> Zaloguj się </span> </ButtonLink> 
		<ButtonLink href="#" extra_classes="green-transparent" > <span> Zarejestruj się </span>  </ButtonLink>

	</div>
)

AuthPanel.propTypes = { }

export default AuthPanel;