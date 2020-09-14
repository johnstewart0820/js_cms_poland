import React from 'react';

import ButtonLink from "../buttons/ButtonLink";
import ShareButton from '../buttons/ShareButton';

import "../../styles/accommodations/loop-accommodation-post.scss";
import { PhoneIcon, EmailIcon, WWWIcon, PlusIcon } from "../../svg/icons";


const LoopAccommodationPostInfo = ({ phone, email, www }) => {

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
		<div className="loop-accommodation-post__info"> 
			{ info && !!info.length &&
				info.map(({ svg, value, href, target }, index) => (
					<a key={ index } href={ href } target={ target }>
						{ svg }
						<span> { value } </span>
					</a>
				))
			}
		</div>
	)
}

const LoopAccommodationPost = ({ id, title, categories_labels, image, acf}) => (
	<a href={`/accommodation/${id}`} target="_blank" rel={'noopener noreferrer'} className="loop-accommodation-post">
		<div className="loop-accommodation-post__thumbnail has-overlay thumbnail" style={{backgroundImage: `url("${image}")`}}>
			<div className="loop-accommodation-post__category">{categories_labels}</div>
		</div>
		
		<div className="loop-accommodation-post__content">
			<div className="loop-accommodation-post__title heading">{title}</div>

			{acf !== undefined && acf.field_map_address && (
				<div className="loop-accommodation-post__address">
					<span>ADRES</span>
					{acf.field_map_address}
				</div>
			)}

            {acf !== undefined && (
                <LoopAccommodationPostInfo
                    phone={acf.field_contact_phone}
                    email={acf.field_contact_email}
                    www={acf.field_contact_www}
                />
            )}

			<div className="loop-accommodation-post__bottom">
				<ButtonLink extra_classes="green">szybki kontakt</ButtonLink>

				<a href="#"> <PlusIcon/> <span className="d-none">add</span></a>
				<ShareButton link_for_sharing={`${window.location.origin}/accommodation/${id}`} />
			</div>
		</div>
	</a>
);

export default LoopAccommodationPost;