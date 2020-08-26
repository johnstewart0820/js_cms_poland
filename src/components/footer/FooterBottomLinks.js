import React from 'react';
import Parser from "html-react-parser";

// import { EyeIcon, EnvelopeIcon, BipIcon, SearchIcon, FacebookIcon, YouTubeIcon, CameraIcon, SunIcon } from "../../svg/icons";
// import SimpleLink from '../general/SimpleLink';
// import { toggleContrastVersion } from "../../extra/theme";
// import social_links from "../../extra/social-links";

// const links = [
// 	[
// 		{ label: "Seka", hidden_text: "seka", href: "#", target: "_blank" },
// 		{ label: "eNGO", hidden_text: "engo", href: "#", target: "_blank" },
// 	],
// 	[
// 		{ svg: <SearchIcon />, hidden_text: "search" },
// 		{ svg: <EyeIcon />, hidden_text: "contrast", onClick: toggleContrastVersion },
// 		{ svg: <EnvelopeIcon />, hidden_text: "contact", to: "/contact" },
// 	],
// 	[
// 		{ svg: <FacebookIcon />, hidden_text: "facebook", href: social_links.facebook, target: "_blank" },
// 		{ svg: <YouTubeIcon />, hidden_text: "youtube", href: social_links.youtube, target: "_blank" },
// 		{ svg: <SunIcon />, hidden_text: "sun", href: "http://www.pogodynka.pl/polska/ustron_ustron", target: "_blank" },
// 		{ svg: <CameraIcon/>, hidden_text: "sun", href: "http://ustron.pl/k/turystyka/kamery_on_line", target: "_blank" }
// 	],
// 	[
// 		{ svg: <BipIcon />, hidden_text: "bip", href: "https://ustron.bip.info.pl/", target: "_blank",  }
// 	]
// ]

const FooterBottomLinks = ({ items }) => (
	<div className="footer-main__bottoms_links">
		{ items ? Parser( items ) : null }
		{/* { links.map(( group, index) => (
			<div key={ index } className="group">
				{ group.map(( item, index ) => (
					<SimpleLink key={ index } {...item } />
					))
				}
			</div>
		))} */}
	</div>
)

FooterBottomLinks.propTypes = { }

export default FooterBottomLinks;