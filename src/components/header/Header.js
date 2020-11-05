import React, {useMemo} from 'react';
import {Link, useHistory} from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import HeaderActions from "./HeaderActions";
import SimpleLink from "../general/SimpleLink";
import AuthPanel from "../auth/AuthPanel";
import LanguageSwitcher from "../general/LanguageSwitcher";
import MainLogo from "../../svg/components/MainLogo";
import {UserIcon} from "../../svg/icons";
import {MAIN_DOMAINS} from "../../extra/site_settings";
import UserContext from "../../constants/UserContext";
import "../../styles/header/header.scss";
import TourismRoutes from "../../constants/TourismRoutes";
import SiteInfoContext from "../../constants/SiteInfoContext";
import LocalStorage from "../../constants/LocalStorage";

const Header = () => {
    const history = useHistory();
    const userContext = React.useContext(UserContext);
    const title = React.useContext(SiteInfoContext)?.site_info?.title;
    const [show, setShow] = React.useState(false);
    const headerClasses = ["header"];

    const getHeaderExtraActions = useMemo(() => {
        const actions = [
            {
                component: LanguageSwitcher,
                props: {extra_classes: "header__link"},
            },
            {
                svg: <UserIcon/>,
                extra_classes: `has-overlay ${show ? "active" : ''}`,
                hidden_text: "login / logout",
                onClick: localStorage.getItem(LocalStorage.UserToken)
                    ? () => history.push(TourismRoutes.UserProfile)
                    : () => {  window.localStorage.clear();
                    setShow(prevState => !prevState)},
            },
        ];

        return actions.map((item, index) => (
            item.component
                ? (
                    <item.component key={index} {...item.props} />
                )
                : (
                    <SimpleLink
                        key={index}
                        {...item}
                        extra_classes={`header__link ${item.extra_classes || ""}`}
                    />
                )
        ));
    }, [userContext.id]);

    if (!MAIN_DOMAINS.includes(window.location.hostname)) headerClasses.push("has-menu");

    return (
        <header id="header" className={headerClasses.join(" ")}>
            <Link to="/" className="header-logo">
                <MainLogo/>
                <span>{title}</span>
            </Link>

            <div className="header-main">
                <div className="header-main__top">
                    <HeaderActions/>
                    {getHeaderExtraActions}
                </div>

                <HeaderMenu/>
            </div>
            {!userContext.id && show && (
                <AuthPanel
                    onClickLogin={() => {
                        setShow(false)
                        history.push(TourismRoutes.Login)
                    }}
                    onClickRegistration={() => {
                        setShow(false)
                        history.push(TourismRoutes.Registration)
                    }}
                />
            )}
        </header>
    )
}

export default Header;
