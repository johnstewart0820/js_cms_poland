import React from 'react';
import { Link } from "react-router-dom";
import Parser from "html-react-parser";

import MainLogo from "../../svg/components/MainLogo";
import ButtonLink from "../buttons/ButtonLink";

import FooterSubPagesLinks from "./FooterSubPagesLinks";
import FooterAddress from "./FooterAddress";
import FooterBottomLinks from "./FooterBottomLinks";

const FooterMain = ({ address, footer_subpage_links, footer_links }) => (
	<div className="footer-main">
		<div className="container">

			<div className="footer-main__top">
				<Link to="/" className="footer-main__logo">
					<MainLogo text_color="#fff" />
				</Link>

				<Link to="/" className="footer-main__back"> 
					Powrót do strony głównej
				</Link>

				<FooterSubPagesLinks items={ footer_subpage_links } />
			</div>

			<div className="footer-main__bottom">
				{ address ? <FooterAddress> { Parser( address ) } </FooterAddress> : "" }
				<ButtonLink extra_classes="white"> Do pobrania </ButtonLink>
				<FooterBottomLinks items={ footer_links } />
			</div>
		</div>
	</div>
)

FooterMain.propTypes = { }

export default FooterMain;