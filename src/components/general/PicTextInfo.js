import React from 'react';
import Parser from "html-react-parser";

import ButtonLink from "../buttons/ButtonLink";
import "../../styles/general/pic-text-info.scss";

const PicTextInfo = ({ picture_url, heading, heading_svg, text = "", href, path, link_label, extra_description, isLeft}) => (
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

                        {extra_description && (
                            <div className='pic-text-info__extra-text'>
                                { Parser(extra_description) }
                            </div>
                        )}

						{ (href || path) && link_label &&
							<ButtonLink path={path} href={href} extra_classes={isLeft ? 'button-link white' : 'white button-link-right'}> { link_label.toUpperCase() } </ButtonLink>
						}
					</div>
				</div>

			</div>
		</div>
	</section>
)

PicTextInfo.propTypes = { }

export default PicTextInfo;