import React, { Component } from 'react';
import { API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import PageHeaderSection from "../../components/header/PageHeaderSection";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import Loader from "../../components/general/Loader";
import LoopPhotoReportPost from "../../components/photoreports/LoopPhotoReportPost";

import LoopSearchForm from "../../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import Pagination from "../../components/loop/Pagination";


const sort_options = [
	{ value: 1, label: "Najbliższe" },
	{ value: 2, label: "Najstarszy" },
];

const breadcrumbs = [
	{ label: "Visit.ustron.pl", to: "/" }, 
	{ label: "Fotorelacje" }
];

export default class PhotoReportsPage extends Component{

	state = { 
		page: 1,
		pages_amount: 10,

		loading: true,
		posts: []
	}


	componentDidMount() {
		setTimeout(() => this.getPhotoReports(), 2000);
	}


	getPhotoReports = () => {
		API.get("/mock/photoreports.json")
		.then( res => {
			const { data } = res;

			const posts_row = [...data];
			const posts = [...posts_row, ...posts_row, ...posts_row, ...posts_row, ...posts_row ];

			this.setState({ posts, loading: false });
		})
	}


	submitCallback = () => {}


	pageChangeCallback = () => {}


	render(){

		const { posts, loading, page, pages_amount } = this.state;


		return(
			<>
				<MainHeaderSection extra_classes="subpage photo-reports">
					
					<Breadcrumbs breadcrumbs={ breadcrumbs } />
					<PageHeaderSection >
						<div className="container">
							<div className="page-title"> Fotorelacje </div>
						</div>
					</PageHeaderSection>
				</MainHeaderSection>


				<LoopSearchForm 
					type="photo-reports" 
					submitCallback= { this.submitCallback } 
				/>

				<LoopSearchPostsContainer 
					onRef={ el => this.loop_container = el } 
					extra_classes="photo-reports" 
					sort_options={ sort_options } 
				>

					{ !loading && posts && !!posts.length &&
						posts.map(( item, index ) => (
							<LoopPhotoReportPost key={ index } {...item }/>
						))
					}

					{ loading && <Loader style={{ width: "100%" }} /> }

					{ pages_amount > 1 && !loading &&
						<Pagination 
							active_page={ 1 } 
							total_amount={ 10 } 
							pageChangeCallback={ this.pageChangeCallback }
						/>
					}
				
				</LoopSearchPostsContainer>
			</>
		)
	}
};