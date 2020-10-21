import React from 'react';
import PageHeaderSection from "../header/PageHeaderSection";

const NewsSingleHead = ({attachments,title, categories_labels, image, create_date, update_date}) => (
    <PageHeaderSection extra_classes="single-news" thumbnail={image}>
        <div className="category">{categories_labels}</div>
        <div className="date">{update_date || create_date}</div>
        <div className="page-title">{title}</div>
        <a
            style={{color: "#CECFCF",fontSize:"20px"}}
            href={attachments[0].name.toString()}>
            {attachments[0].title}
        </a>
    </PageHeaderSection>
);

export default NewsSingleHead;