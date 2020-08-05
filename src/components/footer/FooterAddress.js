import React from 'react';

import { PhoneIcon, EmailIcon, WWWIcon } from "../../svg/icons";

const FooterAddress = () => (
	<div className="footer-main__address">

		<div className="footer-main__address_heading"> Adres </div>
		<div className="footer-main__address_bold"> 
			43-450 Ustroń, <br/>
			Rynek 1
		</div>

		<div>  <a href="tel:+48338579300"> <PhoneIcon /> +48 33 85 79 300 </a> </div>
		<div>  <a href="mailto:biuropodawcze@ustron.pl"> <EmailIcon /> biuropodawcze@ustron.pl </a> </div>
		<div>  <a href="http://ustron.pl" target="_blank" rel={'noopener noreferrer'}> <WWWIcon /> www.ustron.pl</a>  </div>
	</div>
)

export default FooterAddress;