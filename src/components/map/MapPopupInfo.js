import React from 'react';
import PropTypes from 'prop-types';
import Parser from "html-react-parser";

import ButtonLink from "../buttons/ButtonLink";
import "../../styles/map/map-popup-info.scss";
import { PhoneIcon, EmailIcon, WWWIcon, PlusIcon } from "../../svg/icons";

const MapPopupInfo = props => {

	const { name, map_image, article, returnBack } = props;
	const image = props.image ? props.image.replace(/\s/gi, "%20") : "";

	const acf = article?.acf;
	let info, address;

	if ( acf ) {
		
		const { field_contact_phone, field_contact_email, field_contact_www } = acf;
		const { field_map_address, field_map_city, field_map_postcode } = acf;

		address = `${ field_map_postcode || "" } ${ field_map_city || "" } <br/> ${ field_map_address || "" }`;

		info = [
			{ 
				svg: <PhoneIcon/>, 
				value: field_contact_phone, 
				href:  field_contact_phone ? "tel:" + field_contact_phone.replace(/[ -.]/g, "") : ""
			},
			{ 
				svg: <EmailIcon/>, 
				value: field_contact_email, 
				href: field_contact_email ? `mailto:${ field_contact_email }` : "" 
			},
			{ 
				svg: <WWWIcon/>, 
				value: field_contact_www, 
				href: field_contact_www
					? !/^https?/.test( field_contact_www ) 
						? `http://${ field_contact_www }` 
						: field_contact_www 
					: "",
				target: "_blank"		
			}
		];
	}
	

	return (
		<div className="map-popup-info-wrapper">

			<div className="map-popup-info">
				<div className="map-popup-info__top">
					<div className="map-popup-info__title"> Co zwiedzić? </div>

					<a href="#" onClick={ returnBack }> WRÓĆ DO WYBORU KATEGORII </a>
				</div>

				<div className="map-popup-info__main">
					<div className="map-popup-info__left">

						{ map_image && <img className="pin" src={ map_image } alt="map_image"/> }

						<div className="map-popup-info__name"> { name } </div>

						
						{ acf && 
							<>
								{ address && <div className="map-popup-info__address"> { Parser( address ) } </div> }	

								<div className="map-popup-info__extra">
									{ info && !!info.length &&
										info.map(({ svg, value, href, target }, index ) => (
											value ?
												( <a key={ index } href={ href } target={ target } rel={target === '_blank' ? 'noopener noreferrer' : null}>
														{ svg }
														<span> { value } </span>
													</a>
												)
												: null
										))
									}
								</div>
							</>
						}

						{ ( article?.slug && article?.id ) && 
							<a href={`/${article.slug },${ article.id }`} className="button-link green" target="_blank" > WIĘCEJ </a>
						} 
						
					</div>

					<div className="map-popup-info__right">
						{ image && 
							<div className="map-popup-info__img thumbnail" style={{ backgroundImage: `url(${ image })`}} />
						}
					</div>
				</div>
			</div>	

		</div>
	)
}

MapPopupInfo.propTypes = { }

export default MapPopupInfo;