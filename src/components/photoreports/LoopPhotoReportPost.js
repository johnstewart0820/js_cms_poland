import React from 'react';
import {Link} from "react-router-dom";
import "../../styles/photoreports/loop-photo-report-post.scss";
import {getArticleLink} from "../../extra/functions";

const LoopPhotoReportPost = report => (
    <Link to={getArticleLink(report)} className="loop-photo-report-post thumbnail has-overlay"
          style={{backgroundImage: `url("${report.image}")`}}>
        <div className="loop-photo-report-post__info">
            {report.date && <div>{report.date}</div>}
            <div className="loop-photo-report-post__title heading">{report.title}</div>
        </div>
    </Link>
);

export default LoopPhotoReportPost;