import React from 'react';

import { tourism_url, sport_url, culture_url } from "../../extra/main_menu";

const FooterSubPagesLinks = () => {
	const links = [
		{ href: "http://www.pogodynka.pl/polska/ustron_ustron", label: "Pogoda Ustroń", color: "#78BEFB" },
		{ href: tourism_url, label: "Portal Turystyczny ", color: "#CE372F" },
		{ href: sport_url, label: "Kultura  ", color: "#F9C20A" },
		{ href: culture_url, label: "Sport", color: "#82C341" },
	]

	return  (
		<div className="footer-main__subpage-links">
			{ 
				links.map(({ href, label, color }, index ) => (
					<a key={ index } href={ href } target="_blank" className="footer-main__link" rel={'noopener noreferrer'}>
						<span> { label } </span>
						<em style={{ background: color }} />
					</a>
				))
			}
		</div>
	) 
} 

export default FooterSubPagesLinks;