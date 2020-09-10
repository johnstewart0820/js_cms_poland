import React, { Component } from 'react';
import { API } from "../extra/API";
import SiteInfoContext from "../constants/SiteInfoContext";
import Loader from "../components/general/Loader";
import MainHeaderSection from "../components/header/MainHeaderSection";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import MainHeaderTilesSection from "../components/header/MainHeaderTilesSection";
import MainHeaderExternalLink from "../components/header/MainHeaderExternalLink";
import Weather from "../components/general/Weather";

import { HerbIcon } from "../svg/icons";
import { getSubItemSvg } from "../extra/main_menu";

const MainHomepage = props => {
	const acf = props.page.acf;
	const [loading, setLoading] = React.useState(false);
	const [tiles , setTiles] = React.useState([]);

	React.useEffect(() => {
		const blue = acf.field_homepage_block_blue[0],
			  red = acf.field_homepage_block_red[0],
			  solidBlue = acf.field_homepage_block_solidblue[0],
			  green = acf.field_homepage_block_green[0],
			  yellow = acf.field_homepage_block_yellow[0],
			  items = [yellow, green, blue, red, solidBlue],
			  itemsClasses = ['main', 'tourism', 'culture', 'sport'];

		setTiles(items.map((item, index) => {
			const greenBlock = [];
			if (item === green) {
				const green1 = item.field_green_block_1[0],
					green2 = item.field_green_block_2[0],
					green3 = item.field_green_block_3[0],
					green4 = item.field_green_block_4[0],
					backgroundImage = item.field_green_block_image;

				greenBlock.push(green1, green2, green3, green4, backgroundImage);
			}
			const title = item.field_homepage_block_title || '',
				main_href = item.field_homepage_block_link || '',
				bg = item.field_homepage_block_image || '',
				extra_class = itemsClasses[index],
				svg = index === 0 ? <HerbIcon/> : null,
				items = greenBlock.length > 0 && greenBlock.map((greenItem) => {

					const greenTitle = greenItem.field_green_fields_title,
						  greenLink = greenItem.field_green_fields_link,
						  greenIcon = greenItem.field_green_fields_icon;

					let greenBackgroundImage;

					if (greenItem === greenBlock.backgroundImage)
						greenBackgroundImage = greenItem;

					return {greenTitle, greenLink, greenIcon, greenBackgroundImage};
				});

			return {title, svg, main_href, bg, extra_class, items};
		}));
	}, []);

	return (
		<>
			<MainHeaderSection>

				{ loading && <Loader /> }

				{ !loading &&
					<>
						{tiles.length > 0 && <MainHeaderTilesSection  tiles={tiles}/>}

						<div className="row">
							<MainHeaderExternalLink  />
							<Weather />
						</div>
					</>
				}

			</MainHeaderSection>

			{ !loading &&
				<>
					<TwoCarouselsOneRow  />
					<MapWithPinsFiltering  />
				</>
			}
		</>
	)
}

export default MainHomepage;
