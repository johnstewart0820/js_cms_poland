import React from 'react';
import SectionHeading from "../general/SectionHeading";
import RopeRoadCard from "./RopeRoadCard";
import '../../styles/sport/RopeRoad.scss';

const RopeRoad = ({ heading, headingText, items }) => {
    return (
        <section className="rope-road">
            
				<div className="container"> 

					<div className="row"> 

						<SectionHeading heading={ heading } />

						{ headingText && <div className="rope-road__text"> { headingText } </div> }
						
						<div className='rope-road__body'>
							{ items && !!items.length && 
								items.map(( item, index ) => {
								const newItem = item.acf;

								if ( index + 1 > 3 )
										return null;

								return(
										<RopeRoadCard
											key={index}
											{...item}
											{...newItem}
											article={item}
										/>
								)
							})}
						</div>

					</div>
					
				</div>
				
        </section>
    )
}

export default RopeRoad;