import React from 'react';
import ButtonLink from "../buttons/ButtonLink";
import ShareButton from '../buttons/ShareButton';
import "../../styles/accommodations/loop-accommodation-post.scss";
import {PhoneIcon, EmailIcon, WWWIcon, PlusIcon} from "../../svg/icons";
import DefaultImage from "../../constants/DefaultImage";
import {getArticleLink} from "../../extra/functions";

const LoopAccommodationPostInfo = ({phone, email, www}) => {
    const info = [
        {
            svg: <PhoneIcon/>,
            value: phone,
            href: phone ? "tel:" + phone.replace(/[ -.]/g, "") : "",
        },
        {
            svg: <EmailIcon/>,
            value: email,
            href: email ? `mailto:${email}` : "",
        },
        {
            svg: <WWWIcon/>,
            value: www,
            href: www
                ? !/^https?/.test(www)
                    ? `http://${www}`
                    : www
                : "",
            target: "_blank",
        },
    ];

    return (
        <div className="loop-accommodation-post__info">
            {info && !!info.length && info.map(({svg, value, href, target}, index) => {
                if (!value)
                    return null;

                return (
                    <a key={index} href={href} target={target}>
                        {svg}
                        <span>{value}</span>
                    </a>
                );
            })}
        </div>
    )
}

const LoopAccommodationPost = (post) => (
    <a href={getArticleLink(post)} target="_blank" rel={'noopener noreferrer'} className="loop-accommodation-post">
        <div className="loop-accommodation-post__thumbnail has-overlay thumbnail"
             style={{backgroundImage: `url("${post.image || DefaultImage}")`}}>
            <div className="loop-accommodation-post__category">{post.categories_labels}</div>
        </div>

        <div className="loop-accommodation-post__content">
            <div className="loop-accommodation-post__title heading">{post.title}</div>

            {post.acf !== undefined && post.acf.field_map_address && (
                <div className="loop-accommodation-post__address">
                    <span>ADRES</span>
                    {post.acf.field_map_address}
                </div>
            )}

            {post.acf !== undefined && (
                <LoopAccommodationPostInfo
                    phone={post.acf.field_contact_phone}
                    email={post.acf.field_contact_email}
                    www={post.acf.field_contact_www}
                />
            )}

            <div className="loop-accommodation-post__bottom">
                <ButtonLink extra_classes="green">szybki kontakt</ButtonLink>

                <a href="#"> <PlusIcon/> <span className="d-none">add</span></a>
                <ShareButton link_for_sharing={window.location.origin + getArticleLink(post)}/>
            </div>
        </div>
    </a>
);

export default LoopAccommodationPost;