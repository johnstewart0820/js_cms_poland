import React from 'react';
import {Link} from "react-router-dom";
import SiteInfoContext from "../../constants/SiteInfoContext";

const HeaderMenu = () => {
    const {header_menu} = React.useContext(SiteInfoContext);
    return (
        <>
            {header_menu && !!header_menu.length && (
                <div className="header-main__menu">
                    {header_menu.map(({path, label}, index) => (
                        <Link key={index} to={path}>{label}</Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default HeaderMenu;
