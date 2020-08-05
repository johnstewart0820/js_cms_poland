import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ShareIcon, FacebookIcon, TwitterIcon, EnvelopeIcon } from '../../svg/icons';

import "../../styles/buttons/share-button.scss";


const share_buttons = [
	{ svg: <FacebookIcon/>, name: "Facebook", share_link: "https://www.facebook.com/sharer/sharer.php?u=$link$" },
	{ svg: <TwitterIcon/>, name: "Twitter", share_link: "https://twitter.com/home?status=$link$ " },
	{ svg: <EnvelopeIcon/> , name: "Email", share_link: "mailto:info@example.com?&subject=&body=$link$"}
]

export default class ShareButton extends Component{

	static propTypes = {
		link_for_sharing: PropTypes.string
	}

	state = { expanded: false }

	toggleExpand = e => {
		e.preventDefault();
		e.stopPropagation();
		
		this.setState( state => ({ expanded: !state.expanded }));
	}


	shareWith = (e, share_link ) => {
		e.preventDefault();
		e.stopPropagation();

		const link_for_sharing = this.props.link_for_sharing || window.location.href;
		window.open( share_link.replace( "$link$" , link_for_sharing ) );
	}


	render(){
		const { expanded } = this.state;

		return(
			<button className="share-button" onClick={ this.toggleExpand } >
				<ShareIcon />

				{ expanded && 
					<div className="share-button-list">
						{ share_buttons && share_buttons.length > 0 &&
							share_buttons.map(({ svg, name, share_link }) => (
								<button key={ name } title={ name } onClick={ e => this.shareWith( e, share_link) }> { svg }  </button>
							))
						}
					</div>
				} 			
			</button>
		)
	}
};