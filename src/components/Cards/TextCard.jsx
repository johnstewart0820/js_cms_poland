import React from 'react';
import '../../styles/Cards/TextCard.scss';
import Parser from "html-react-parser";

const TextCard = ({...post}) => {
    return (
        <div className='text-card'>
            <div className='text-card-inner'>
                <a href={post.field_informations_culture_link || ''}>
                    <div className='text-card-title'>
                        <h2>{post.field_informations_culture_title || ''}</h2>
                    </div>
                    <div className='text-card-description'>
                        <p>
                            {Parser(post.field_informations_culture_description) || ''}
                        </p>
                    </div>
                </a>
            </div>
        </div>
    )
};

export default TextCard;