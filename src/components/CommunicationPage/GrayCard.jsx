import React from "react";
import GrayCardItem from "./GrayCardItem";

const GrayCard = ({type, title, items, onClickGreenButton, greenButtonText}) => {
    return (
        <div className='gray-card-component'>
            <div className='gray-card-element'>
                 { title && 
							<div className='gray-card-element-title'>
								<h3>
									{ title }
								</h3>
							</div>
						}

                { items && !!items.length && items.map((item, index) => {
                    return (
                        <GrayCardItem
                            key={index}
                            carrier={item.carrier}
                            address={item.address}
                            phoneNumber={item.phoneNumber}
                            email={item.mail}
                            site={item.website}
                            type={type}
                        />
                    )
                })}

            </div>

            {!!greenButtonText && (
                <button
                    className={'button-link green full-width communication-button'}
                    onClick={onClickGreenButton}
                >
                    {greenButtonText}
                </button>
            )}
        </div>
    )
}

export default GrayCard;