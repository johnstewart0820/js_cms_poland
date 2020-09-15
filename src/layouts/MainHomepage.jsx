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
import LoopEventsPost from "../components/events/LoopEventsPost";
import LoopNewsPost from "../components/news/LoopNewsPost";

const MainHomepage = props => {
	const acf = props.page.acf;
	const [loading, setLoading] = React.useState(false);
	const [tiles , setTiles] = React.useState([]);
	const [posts, setPosts] = React.useState(false);
	const [posts1, setPosts1] = React.useState(false);
	const solidBlueLink = acf.field_homepage_block_solid_blue[0].field_solid_blue_block_link;
	const solidBlueTitle = acf.field_homepage_block_solid_blue[0].field_solid_blue_block_text;

	React.useEffect(() => {
		const blue = acf.field_homepage_block_blue[0],
			  red = acf.field_homepage_block_red[0],
			  green = acf.field_homepage_block_green[0],
			  yellow = acf.field_homepage_block_yellow[0],
			  blocks = [yellow, green, blue, red],
			  itemsClasses = ['main', 'tourism', 'culture', 'sport'];


		setTiles(blocks.map((item, index) => {
			const greenBlock = [];

			if (item === green) {
				for (let i = 1; i <= 7; i++) {
					greenBlock.push({
						title: green['field_green_fields_title_' + i],
						link: green['field_green_fields_link_' + i],
						svg: green['field_green_fields_icon_' + i],
					});
				}
			}

			const title = item.field_homepage_block_title || '',
				main_href = item.field_homepage_block_link || '',
				bg = item.field_homepage_block_image ? item.field_homepage_block_image : item.field_green_fields_lmage || '',
				extra_class = itemsClasses[index],
				svg = index === 0 ? <HerbIcon/> : null,
				items = greenBlock;
			return {title, svg, main_href, bg, extra_class, items};
		}));
	}, []);

	React.useEffect(() => {
		API.getEntities({
			categories: acf.field_homepage_block_info[0].field_section_categories,
		}).then(res => setPosts(res.data.contents));
		API.getEntities({
			categories: acf.field_homepage_block_info[1].field_section_categories,
		}).then(res => setPosts1(res.data.contents));
		setLoading(false);
	}, []);


	return (
		<>
			<MainHeaderSection extra_classes={'main-tiles'}>

				{ loading && <Loader /> }

				{ !loading &&
					<>
						{tiles.length > 0 && <MainHeaderTilesSection  tiles={tiles}/>}

						<div className="row">
							<MainHeaderExternalLink href={solidBlueLink} heading={solidBlueTitle}/>
							<Weather />
						</div>
					</>
				}

			</MainHeaderSection>

			{ !loading &&
				<>
					<TwoCarouselsOneRow
						first_carousel={{
							loading: posts === false,
							path_to_all: '#',
							heading: acf.field_homepage_block_info[0].field_section_title,
							component: LoopEventsPost,
							items: posts || [],
						}}
						second_carousel={{
							loading: posts1 === false,
							path_to_all: '#',
							heading: acf.field_homepage_block_info[1].field_section_title,
							component: LoopNewsPost,
							items: posts1 || [],
						}}
					/>
					<MapWithPinsFiltering/>
				</>
			}
		</>
	)
}

export default MainHomepage;