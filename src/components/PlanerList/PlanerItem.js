import React from 'react';
import '../../styles/PlanerList/PlanerItem.scss';
import ButtonX from "../buttons/ButtonX";


const PlanerItem = ({acf, duration, description, category, imageSrc, step, deleteOnClick, onMapCheck}) => (
	<>
		<div className='item-container' id='item-container'>
				<div className='item-counter'>
					{step}
				</div>

				<div className="item-wrap">
					<div className='item-image'>
						{duration && (
								<div className='time'>
									{duration} min
								</div>
						)}

						{ imageSrc && <div className="thumbnail" style={{ backgroundImage: `url(${ imageSrc.replace(/\s/g, "%20") })` }}/> }

						<button className='button-link green full-width' onClick={onMapCheck}>
							ZOBACZ NA MAPIE
						</button>
					</div>
					<div className='item-description'>
						<h4>{description}</h4>
						<div>{acf.field_map_address}</div>
						<div>{acf.field_map_city} {acf.field_map_postcode}</div>
					</div>
					<div className='item-category'>
						<div className='item-category-content'>
								{category}
						</div>
					</div>
					<div className='item-action'>
						<ButtonX onClick={deleteOnClick}/>
					</div>
				</div>
		</div>

	</>
)


export default PlanerItem;