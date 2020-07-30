import React from 'react';
import PropTypes from 'prop-types';

import LinkToAll from "../buttons/LinkToAll";
import Loader from "./Loader";
import AnimatedAmountCounter from "./AnimatedAmountCounter";
import SectionHeading from "./SectionHeading";

import "../../styles/general/amounts-with-icons.scss";

const AmountsWithIcon = ({ heading, loading, items, path_to_all }) => (
	<section className="amounts-with-icons">
		<div className="container">
			
			{ loading && <Loader /> }

			{ !loading && 
				<>
					<div className="amounts-with-icons__head">
						<SectionHeading heading={ heading } />
						<LinkToAll path={ path_to_all }label="Dowiedz się więcej" />
					</div>

					<div className="row amounts-with-icons__body">
						{ items && items.length > 0 &&
							items.map(({ label, amount, min_amount, max_amount, which, svg }, index ) => (
								<div key={ index } className="amounts-with-icons__item"> 

									<div> { label } </div>
									<span className="amounts-with-icons__item_circle"> <span> { svg } </span> </span>
									<div> 
										{ (amount || ( min_amount && max_amount )) && 
											<AnimatedAmountCounter 
												final_num={ +amount || +min_amount } 
												second_final_num={ +max_amount || 0 } 
											/>
										} 
										{ which } 
									</div>

								</div>
							))
						}
					</div>
				</>
			}

			
		</div>
	</section>
)

AmountsWithIcon.propTypes = { 
	heading: PropTypes.string,
	loading: PropTypes.bool,
	items: PropTypes.array.isRequired, 
	path_to_all: PropTypes.string
}

export default AmountsWithIcon;