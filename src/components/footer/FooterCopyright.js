import React from 'react';
import PropTypes from 'prop-types';

const FooterCopyright = (props) => (
	<div className="footer-copyright">
		<span> Pliki cookies i polityka prywatności </span>

		<span> © Copyright { new Date().getFullYear() } - All Rights Reserved </span>
	</div>
)

FooterCopyright.propTypes = { }

export default FooterCopyright;