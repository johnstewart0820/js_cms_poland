import React from 'react';
import { Link } from "react-router-dom";

import MainLogo from "../../svg/components/MainLogo";
import ButtonLink from "../buttons/ButtonLink";

import FooterSubPagesLinks from "./FooterSubPagesLinks";
import FooterAddress from "./FooterAddress";
import FooterBottomLinks from "./FooterBottomLinks";

const FooterMain = () => (
	<div className="footer-main">
		<div className="container">

			<div className="footer-main__top">
				<Link to="/" className="footer-main__logo">
					<MainLogo text_color="#fff" />
				</Link>

				<Link to="/" className="footer-main__back"> 
					Powrót do strony głównej
				</Link>

				<FooterSubPagesLinks />
			</div>

			<div className="footer-main__bottom">
				<FooterAddress />
				<ButtonLink extra_classes="white"> Do pobrania </ButtonLink>
				<FooterBottomLinks />
			</div>
		</div>
	</div>
)

FooterMain.propTypes = { }

export default FooterMain;