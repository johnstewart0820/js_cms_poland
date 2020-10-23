import React from 'react';
import Loader from "./Loader";
import "../../styles/general/full-page-loader.scss";

const FullPageLoader = () => (
    <div className={'full-page-loader'}>
        <Loader/>
    </div>
);

export default FullPageLoader;
