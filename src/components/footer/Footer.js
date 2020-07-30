import React from 'react';

import FooterMain from "./FooterMain";
import FooterCopyright from "./FooterCopyright";

import "../../styles/footer/footer.scss";

const Footer = () => (
	<>
		<footer className="footer">
			<FooterMain />
			<FooterCopyright />
		</footer>
	</>
)

Footer.propTypes = { }

export default Footer;