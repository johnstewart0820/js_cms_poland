import React from 'react';
import "../../styles/header/main-header-tiles-section.scss";
import { MAIN_MENU } from "../../extra/main_menu";
import { HerbIcon } from "../../svg/icons";
import bg1 from "../../img/main-tiles/tile1.jpg";

import MainHeaderTile from './MainHeaderTile';

const MainHeaderTilesSection = () => (
	<div className="main-header-tiles-section">
		<div className="main-header-tiles-section__left">

			<div className="main-header-tiles-section__tile thumbnail main" style={{ backgroundImage: `url(${ bg1 })` }}>

				<div className="main-header-tiles-section__tile_info">
					<HerbIcon />
					<div className="heading"> Strona miejska </div>
					<span/>
				</div>
			</div>

		</div>

		<div className="main-header-tiles-section__right">
			{ MAIN_MENU && MAIN_MENU.length > 0 &&
				MAIN_MENU.map(( item, index) => (
					index < 3 
						? <MainHeaderTile key={ index } {...item} />
						: null
				))
			}
		</div>
	</div>
)

MainHeaderTilesSection.propTypes = { }

export default MainHeaderTilesSection;