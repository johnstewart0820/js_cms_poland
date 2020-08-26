import React from 'react';
import PropTypes from "prop-types";

import MainHeaderTile from './MainHeaderTile';
import "../../styles/header/main-header-tiles-section.scss";

const MainHeaderTilesSection = ({ tiles }) => (
	tiles && !!tiles.length
	? (
		<div className="main-header-tiles-section">
			<div className="main-header-tiles-section__left">

				{ tiles && tiles[0] &&
					<MainHeaderTile {...tiles[0] } />
				}

			</div>

			<div className="main-header-tiles-section__right">

				{ tiles && tiles.length >= 4 && 
					tiles.map(( item, index ) => (
						index > 0
						? <MainHeaderTile key={ index } {...item} />
						: null
					))
				}
			</div>
		</div>
	) : null
)

MainHeaderTilesSection.propTypes = { 
	tiles: PropTypes.array.isRequired
}

export default MainHeaderTilesSection;