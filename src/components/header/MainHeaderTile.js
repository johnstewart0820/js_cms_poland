import React, {Component} from 'react';
import {isBrowser, isMobile} from "react-device-detect";
import {TileMark} from "../../svg/icons";
import Modal from "../modal/Modal";


export default class MainHeaderTile extends Component {

    timer = null;
    delay = 1300;

    state = {
        show_links: false,
        showModalToMobile: false,
    };


    componentWillUnmount() {
        clearTimeout(this.timer)
    }


    onMouseOver = () => {
        if (this.timer) return;

        this.timer = setTimeout(() => {
            if (isMobile) this.setState({show_links: false});
            else {
                this.setState({show_links: true});
            }
        }, this.delay)
    }

    onMouseLeave = () => {
        clearTimeout(this.timer);
        this.timer = null;

        this.setState({show_links: false});
    }
    openModal = () => {
        this.setState({
            show_links: true,
            showModalToMobile: true,
        });
    }
    handleClose = () => {
        this.setState({
            show_links: false,
            showModalToMobile: false,
        });
    }

    render() {

        const {main_href, title, svg, items, bg, extra_class, svgSrc} = this.props;
        const {show_links, showModalToMobile} = this.state;

        return (

            <a
                target={'_blank'}
                rel={'noopener noreferrer'}
                href={(isBrowser || bg[67] === "1") ? main_href : false}
                onClick={isMobile && bg[67] !== "1" && !showModalToMobile ? this.openModal : false}
                onMouseOver={isBrowser && this.onMouseOver}
                onMouseLeave={isBrowser && this.onMouseLeave}
                className={`main-header-tiles-section__tile thumbnail ${show_links ? "show-links" : ""} ${extra_class || ""}`}
                style={{backgroundImage: `url(${bg})`}}
            >

                <Modal
                    show={showModalToMobile}
                    handleClose={this.handleClose}
                    extraClasses={'a'}
                    children=
                        {items && !!items.length &&
                        <div className="main-header-tiles-section__tile_links " style={{
                            backgroundImage: `url(${bg})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}>
                            {items.map(({svg, title, link}, index) => (

                                <a href={link} rel={'noopener norgrreferrer'} key={index}>
                                    {<img alt='' src={svg}/>}
                                    <div> {title} </div>
                                    <span/>
                                </a>

                            ))}
                        </div>
                        }/>

                <div className="main-header-tiles-section__tile_info">
                    {!svg && <TileMark/>}
                    {svg}
                    <div className="heading"> {title} </div>
                    <span/>
                </div>
                {items && !!items.length &&
                <div className="main-header-tiles-section__tile_links">
                    {items.map(({svg, title, link}, index) => (
                        <a href={link} target="_blank" rel={'noopener noreferrer'} key={index}>
                            {<img alt='' src={svg}/>}
                            <div> {title} </div>
                            <span/>
                        </a>

                    ))}
                </div>
                }
            </a>
        )
    }
};