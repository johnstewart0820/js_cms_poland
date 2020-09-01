import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/general/language-switcher.scss";
import { isFunction } from "../../extra/functions"
import { SiteInfoContextConsumer } from "../../constants/SiteInfoContext";

const LanguageSwitcher = ({ extra_classes }) => (
	<SiteInfoContextConsumer>
		{ ({ languages, active_language, changeLanguage }) => (
			<div className={`language-switcher ${ extra_classes || "" }`} >
				<div className="language-switcher__active"> { active_language } </div>
		
				<div className="language-switcher__other">
					{ languages && !!languages.length &&
						languages.map( item  => 
							item !== active_language 
								? ( 
									<span 
										key={ item } 
										onClick={ e => { if ( isFunction( changeLanguage )) changeLanguage( item ) }}> 
											{ item } 
										</span> 
									)
								: null
						)
					}
				</div>
			</div>
		)}
	</SiteInfoContextConsumer>
)

LanguageSwitcher.propTypes = { extra_classes: PropTypes.string }

export default LanguageSwitcher;