import React, { Component } from 'react';
import PropTypes from "prop-types";

import Loader from "./Loader";
import SectionHeading from "./SectionHeading";
import ButtonLink from "../buttons/ButtonLink";
import Angle from '../../svg/components/Angle';

import "../../styles/general/text-link-expandable-info.scss";

export default class TextLinkExpandableInfo extends Component{

	static propTypes = {

	}

	state = { expanded: false };

	toggleExpandable = (e) => {
		e.preventDefault();
		this.setState({ expanded: !this.state.expanded });
	} 

	render(){

		const { loading, heading, text, link, link_label, expandable_label, expandable_info } = this.props;
		const { expanded } = this.state;

		return(
			<section className="text-link-expandable-info">
				<div className="container">
					{ loading && <Loader /> }
					
					{ !loading && 
						<div className="row">

							<SectionHeading heading={ heading } />

							<div className="text-link-expandable-info__text">
								<p> { text } </p>
								
								{ link && link_label &&
									<ButtonLink path="/welcome" extra_classes="green-transparent"> 
										{ link_label } 
									</ButtonLink> 
								}
							</div>

							{ expandable_label && expandable_info && !!expandable_info.length &&
								<div className="text-link-expandable-info__expandable">

									<a href="#" className="text-link-expandable-info__expandable_head" onClick={ this.toggleExpandable }> 
										<span className="heading"> { expandable_label } </span> 
										<Angle direction={ expanded ? "top" : "bottom" } />
									</a>

									{ expanded && 
										<div className="text-link-expandable-info__expandable_body">
											{ expandable_info && expandable_info.length > 0 &&
												expandable_info.map(({ big, small }, index) => (
													<div key={ index }>
														<strong> { big } </strong>
														<span> { small } </span>
													</div> 
												))
											}
										</div>
									}
								</div>
							}

						</div>
					}
				</div>
			</section>
		)
	}
};