import React from 'react';
import Parser from "html-react-parser";

import ButtonLink from "../buttons/ButtonLink";
import "../../styles/general/pic-text-info.scss";

const PicTextInfo = ({ picture_url, heading, heading_svg, text = "", href, path, link_label }) => (
	<section className="pic-text-info">
		<div className="container">
			<div className="row">

				{ picture_url && <div className="pic-text-info__picture thumbnail" style={{ backgroundImage: `url("${picture_url}")` }} /> }

				<div className="pic-text-info__info">
					{ heading &&
						<div className="pic-text-info__info_head">
							{ heading_svg }
							<div className="heading"> { heading } </div>
						</div>
					}

					<div className="pic-text-info__text"> 
						{ Parser(text) }

						{ (href || path) && link_label &&
							<ButtonLink path={path} href={href} extra_classes="white" > { link_label.toUpperCase() } </ButtonLink>
						}
					</div>
				</div>

			</div>
		</div>
	</section>
)

PicTextInfo.propTypes = { }

export default PicTextInfo;