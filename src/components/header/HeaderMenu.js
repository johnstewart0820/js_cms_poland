import React from 'react';
import SiteInfoContext from "../../constants/SiteInfoContext";
import SelectiveLink from "../../extra/SelectiveLink";

const HeaderMenu = () => {
    const {header_menu} = React.useContext(SiteInfoContext);
    return (
        <>
            {header_menu && !!header_menu.length && (
                <div className="header-main__menu">
                    {header_menu.map(({path, label}, index) => (
                        <SelectiveLink key={index} to={path}>{label}</SelectiveLink>
                    ))}
                </div>
            )}
        </>
    );
};

export default HeaderMenu;
