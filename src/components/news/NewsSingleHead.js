import React from 'react';

import PageHeaderSection from "../header/PageHeaderSection";


const NewsSingleHead = ({ title, category, thumbnail, date }) => (
	<PageHeaderSection extra_classes="single-news" thumbnail={ thumbnail } > 

			<div className="category"> { category } </div>
			<div className="date"> { date } </div>
			<div className="page-title"> { title } </div>

	</PageHeaderSection>
)

NewsSingleHead.propTypes = { }

export default NewsSingleHead;