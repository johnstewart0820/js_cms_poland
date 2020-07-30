import React, { Component } from 'react';
import { API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import LoopGastronomyPost from "../../components/gastronomy/LoopGastronomyPost";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import Loader from "../../components/general/Loader";
import PicturesSlider from "../../components/slider/PicturesSlider";

import LoopSearchForm from "../../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import Pagination from "../../components/loop/Pagination";
import MapWithPinsFiltering from '../../components/map/MapWithPinsFiltering';

import { gastronomy as slides } from "../../mock/slides_example"

export default class GastronomyPage extends Component{

	state = {
		loading: true,
		slides: [],

		page: 1,
		pages_amount: 10,
		posts: [],

		params: {}
	}


	componentDidMount(){
		setTimeout( () =>  {
			this.setState({ slides });
			this.getPosts();
		}, 2000 )
	}


	getPosts = () => {
		API.get("/mock/gastronomy.json")
		.then( res => {
			const { data } = res;
			const post_row = [...data];

			const posts = [ ...post_row, ...post_row, ...post_row ];

			this.setState({ posts, loading: false });
		})
	}


	render(){

		const { slides, posts, loading, page, pages_amount } = this.state;


		return(
			<>
				<MainHeaderSection extra_classes="subpage">
					
					<Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: "Noclegi" }]} />
					<PicturesSlider slides={ slides } />

				</MainHeaderSection>

				<LoopSearchForm 
					type="gastronomy" 
					heading="GASTRONOMIA"
					submitCallback= { this.submitCallback } 
				/>

				<LoopSearchPostsContainer 
					onRef={ el => this.loop_container = el } 
					extra_classes="gastronomy" 
					heading="spis lokali gastronomicznych"
				>

					{ !loading && posts && !!posts.length &&
						posts.map(( item, index ) => (
							<LoopGastronomyPost key={ index } {...item }/>
						))
					}

					{ loading && <Loader style={{ width: "100%" }} /> }

					{ pages_amount > 1 && !loading &&
						<Pagination 
							active_page={ page } 
							total_amount={ pages_amount } 
							pageChangeCallback={ this.pageChangeCallback }
						/>
					}
					

				</LoopSearchPostsContainer>

				<MapWithPinsFiltering type="gastronomy" />
			</>
		)
	}
};