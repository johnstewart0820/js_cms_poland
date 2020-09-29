import React, {Component, useMemo} from 'react';
import { Link, withRouter } from "react-router-dom";

import HeaderMenu from "./HeaderMenu";
import HeaderActions from "./HeaderActions";
import SimpleLink from "../general/SimpleLink";
import AuthPanel from "../auth/AuthPanel";
import LanguageSwitcher from "../general/LanguageSwitcher";

import MainLogo from "../../svg/components/MainLogo";
import { UserIcon } from "../../svg/icons";
import { SITE } from "../../extra/site_settings";
import UserContext from "../../constants/UserContext";
import {useHistory} from 'react-router-dom';


import "../../styles/header/header.scss";
import TourismRoutes from "../../constants/TourismRoutes";

const Header = props => {
    const history = useHistory();
    const userContext = React.useContext(UserContext);
	const [show, setShow] = React.useState(false);
    const headerClasses = ["header"];


	const getHeaderExtraActions = useMemo(() => {
        const actions = [
            {
                component: LanguageSwitcher,
                props: {	extra_classes:"header__link" },
            },
            {
                svg: <UserIcon />,
                extra_classes: `has-overlay ${show ? "active" : ''}`,
                hidden_text: "login / logout",
                onClick: userContext.id
                    ? () => (props.history.push('/profile'))
                    : () => {setShow(true)}
            }
        ]

        return actions.map(( item, index ) => (
            item.component
                ? (
                    <item.component key={ index } {...item.props } />
                )
                : (
                    <SimpleLink
                        key={ index }
                        {...item}
                        extra_classes={`header__link ${ item.extra_classes || "" }`}
                    />
                )
        ))
    },[]);

	const getHeaderSubtitle = useMemo(() => {
        if( !SITE ) return null;

        const subtitles = {
            "TOURISM": "Portal Turystyczny",
            "SPORT": "Sport",
            "CULTURE": "Kultura",
        }

        return subtitles[ SITE ];
    },[]);


    if ( SITE !== "MAIN" ) headerClasses.push("has-menu");

    return (
        <header id="header" className={ headerClasses.join(" ") }>
            <Link to="/" className="header-logo">
                <MainLogo />
                { getHeaderSubtitle &&  <span> { getHeaderSubtitle } </span> }
            </Link>

            <div className="header-main">
                <div className="header-main__top">
                    <HeaderActions />
                    { getHeaderExtraActions }
                </div>

                <HeaderMenu />
            </div>
            { !userContext.id && show && (
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

export default withRouter(Header);