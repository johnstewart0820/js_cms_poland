import React from 'react';

import ButtonLink from "../buttons/ButtonLink";
import ShareButton from '../buttons/ShareButton';

import "../../styles/gastronomy/loop-gastronomy-post.scss";
import { PhoneIcon, EmailIcon, WWWIcon, PlusIcon } from "../../svg/icons";


const LoopGastronomyPostInfo = ({ phone, email, www }) => {

	const info = [
		{ 
			svg: <PhoneIcon/>, 
			value: phone, 
			href:  phone ? "tel:" + phone.replace(/[ -.]/g, "") : ""
		},
		{ 
			svg: <EmailIcon/>, 
			value: email, 
			href: email ? `mailto:${email}` : "" 
		},
		{ 
			svg: <WWWIcon/>, 
			value: www, 
			href: www 
				? !/^https?/.test( www ) 
					? `http://${ www }` 
					: www 
				: "",
			target: "_blank"		
		}
	];

	return (
		<div className="loop-gastronomy-post__info"> 
			{ info && info.length > 0 &&
				info.map(({ svg, value, href, target }, index) => (
					<a key={ index } href={ href } target={ target } rel={target === '_blank' ? 'noopener noreferrer' : null}>
						{ svg }
						<span> { value } </span>
					</a>
				))
			}
		</div>
	)
}

const LoopGastronomyPost = ({slug, title, categories_labels, image, acf}) => (
	<a href={`/${slug}`} target="_blank" className="loop-gastronomy-post">
		<div className="loop-gastronomy-post__thumbnail has-overlay thumbnail" style={{backgroundImage: `url(${image})`}}>
			<div className="loop-gastronomy-post__category">{categories_labels}</div>
		</div>
		
		<div className="loop-gastronomy-post__content">
			<div className="loop-gastronomy-post__title heading">{title}</div>

			{acf.field_map_address && (
				<div className="loop-gastronomy-post__address">
					<span>ADRES</span>
					{acf.field_map_address}
				</div> 
			)}

			<LoopGastronomyPostInfo
				phone={acf.field_contact_phone}
				email={acf.field_contact_email}
				www={acf.field_contact_www}
			/>

			<div className="loop-gastronomy-post__bottom">
				<ButtonLink extra_classes="green"> szybki kontakt  </ButtonLink>

				<a href="#"> <PlusIcon/> <span className="d-none"> add </span></a>
				<ShareButton link_for_sharing={`${window.location.origin}/${slug}`} />
			</div>
		</div>
	</a>
);

export default LoopGastronomyPost;