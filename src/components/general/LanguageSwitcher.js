import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/general/language-switcher.scss";
import { isFunction } from "../../extra/functions"

const LanguageSwitcher = ({ extra_classes, languages, active_language, onClick }) => (
	<div className={`language-switcher ${ extra_classes || "" }`} >
		<div className="language-switcher__active"> { active_language } </div>

		<div className="language-switcher__other">
			{ languages && !!languages.length &&
				languages.map( item  => 
					item !== active_language 
						? ( <span key={ item } onClick={ e => { if ( isFunction( onClick )) onClick( item ) }}> { item } </span> )
						: null
				)
			}
		</div>
	</div>
)

LanguageSwitcher.propTypes = { }

export default LanguageSwitcher;