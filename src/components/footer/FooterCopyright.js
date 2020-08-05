import React from 'react';

const FooterCopyright = () => (
	<div className="footer-copyright">
		<span> Pliki cookies i polityka prywatności </span>

		<span> © Copyright { new Date().getFullYear() } - All Rights Reserved </span>
	</div>
)

FooterCopyright.propTypes = { }

export default FooterCopyright;