import React from 'react';
import SiteInfoContext from "../../constants/SiteInfoContext";
import SelectiveLink from "../../extra/SelectiveLink";

const isActive = (url, breadcrumbs) => {
    if (!Array.isArray(breadcrumbs))
        return false;

    for (const crumb of breadcrumbs) {
        if ((new URL(crumb.url)).pathname === url)
            return true;
    }

    return false;
};

const HeaderMenu = () => {
    const {header_menu, page} = React.useContext(SiteInfoContext);
    return (
        <>
            {header_menu && !!header_menu.length && (
                <div className={`header-main__menu ${ header_menu.length >= 9 ? "many-items" : "" }`}>
                    {header_menu.map(({path, label}, index) => (
                        <SelectiveLink
                            key={index}
                            to={path}
                            className={isActive(path, page?.breadcrumb) ? 'active' : ''}
                        >
                            {label}
                        </SelectiveLink>
                    ))}
                </div>
            )}
        </>
    );
};

export default HeaderMenu;
