import React from 'react';

import FooterMain from "./FooterMain";
import FooterCopyright from "./FooterCopyright";

import "../../styles/footer/footer.scss";

const Footer = props => (
	<>
		<footer className="footer">
			<FooterMain {...props } />
			<FooterCopyright />
		</footer>
	</>
)

Footer.propTypes = { }

export default Footer;