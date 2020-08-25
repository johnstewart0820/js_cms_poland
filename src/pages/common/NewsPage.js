import React, { Component } from 'react';
import { API, MOCK_API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import LoopNewsPost from "../../components/news/LoopNewsPost";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import Loader from "../../components/general/Loader";
import PicturesSlider from "../../components/slider/PicturesSlider";

import LoopSearchForm from "../../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import Pagination from "../../components/loop/Pagination";

import { sample_slides as slides } from "../../mock/slides_example";


const sort_options = [
	{ value: 1, label: "Najbliższe aktualności" },
	{ value: 2, label: "Najstarszy aktualności" },
];

export default class NewsPage extends Component{

	state = {
		loading: true,
		slides: [],

		page: 1,
		pages_amount: 10,
		posts: [],

		params: {}
	}


	componentDidMount(){
		this.getMockPosts()


		setTimeout( () => this.setState({ slides: slides.slice(0,1) }), 2000);
	}


	getMockPosts = () => {
		this.setState({ loading: true, posts: [] }, () => {
			setTimeout(() => this.mockPostsQuery(), 2000);
		})
	}


	mockPostsQuery = () => {
		MOCK_API.get("news.json")
		.then( res => {

			const { data } = res;
			const posts_row = data.slice(0,4);

			const posts = [...posts_row, ...posts_row, ...posts_row, ...posts_row];
		
			this.setState({ posts, loading: false });

		})
	}


	moveToTop = () => {
		const { loop_container } = this;
		if ( loop_container ) {

			const top = loop_container.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({ top });	
		}
	}


	submitCallback = () => { }


	pageChangeCallback = ( page ) => {
		this.setState({ page });
		this.getMockPosts();
		this.moveToTop();
	}


	render(){

		const { slides, posts, loading, page, pages_amount } = this.state;

		return(
			<>
				<MainHeaderSection extra_classes="subpage">
					
					<Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: "Aktualności" }]} />
					<PicturesSlider slides={ slides } />

				</MainHeaderSection>


				<LoopSearchForm 
					type="news" 
					heading="Filtr Kategorii"
					submitCallback= { this.submitCallback } 
				/>

				<LoopSearchPostsContainer 
					onRef={ el => this.loop_container = el } 
					extra_classes="news" 
					heading="WSZYSTKIE AKTUALNOŚCI"
					sort_options={ sort_options } 
				>

					{ !loading && posts && !!posts.length &&
						posts.map(( item, index ) => (
							<LoopNewsPost key={ index } {...item }/>
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
			</>
		)
	}
};