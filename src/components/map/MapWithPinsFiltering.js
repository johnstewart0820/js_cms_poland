import React, {Component} from 'react';
import PropTypes from "prop-types";

import GoogleMap from "./GoogleMap";
import Loader from "../general/Loader";
import LinkToAll from "../buttons/LinkToAll";

import {API} from '../../extra/API';
import {FILTERS, FILTERS_CONTENT} from "../../extra/map";
import "../../styles/map/map-with-pins-filtering.scss";

export default class MapWithPinsFiltering extends Component {

    static propTypes = {
        type: PropTypes.string.isRequired,
    }

    filters = FILTERS[this.props.type];

    API_URLs = {
        "trip": "mock/trip-map.json",
        "practical-info": "mock/practical-info-map.json",
        "accommodations": "mock/accommodations-map.json",
        "attractions": "/mock/attractions-map.json",
    };

    state = {
        filter: "*",
        heading: "",
        text: "",
        loading: true,
        markers: null
    }

    componentDidMount() {
        this.getMarkers();
    }


    getMarkers = () => {
        const api_url = this.API_URLs[this.props.type];
        if (!api_url) return;

        API.get(api_url)
            .then(res => {

                const markers = this.getMarkersProperObjects(res.data);

                this.all_markers = markers.slice();
                this.setState({markers, loading: false}, () => this.getHeadingAndText());
            })
    }


    getMarkersProperObjects = (array) => {
        return array.map(({lat, lng, type, pin}) => ({lat, lng, type, icon: this.getPinIconAccordingToType(pin)}));
    }


    getPinIconAccordingToType = (type) => {
        return {
            url: `/img/pins/${type}.png`,
            width: 46,
            height: 57
        }
    }


    filterMarkers = (filter) => {
        const markers =
            filter === "*"
                ? this.all_markers.slice()
                : this.all_markers.filter(item => (item.type === filter))

        this.setState({markers, filter}, () => this.getHeadingAndText())
    }


    getHeadingAndText = () => {
        const {filter} = this.state;
        const heading_and_text_obj = FILTERS_CONTENT[this.props.type];

        if (heading_and_text_obj && heading_and_text_obj[filter]) {

            const {heading, text, link_to_all} = heading_and_text_obj[filter];
            this.setState({heading, text, link_to_all});
        }
    }

    render() {

        const {heading, text, link_to_all} = this.state;
        const {markers, loading} = this.state;

        return (
            <div className={`map-with-pins-filtering ${this.props.type || ""}`}>

                {loading && <Loader/>}

                <div className="map-with-pins-filtering-info">

                    {loading && <Loader extra_classes="white"/>}

                    {!loading && (
                        <>
                            <div className="map-with-pins-filtering-info__main">
                                <div className="heading"> {heading} </div>
                                <div className="map-with-pins-filtering-info__text"> {text} </div>

                                {link_to_all && <LinkToAll path={link_to_all} label="Dowiedz się więcej"/>}
                            </div>

                            <div className="map-with-pins-filtering-filters">
                                {this.filters && this.filters.length > 0 &&
                                this.filters.map(({svg, label, extra_label, value}) => {

                                    const active_class = value === this.state.filter ? "active" : "";

                                    return (
                                        <button
                                            key={value}
                                            className={`map-with-pins-filtering-filters__item ${active_class} `}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.filterMarkers(value);
                                            }}
                                        >
                                            {svg}
                                            <span> {label} <small> {extra_label}</small> </span>
                                        </button>
                                    )

                                })
                                }
                            </div>
                        </>
                    )}

                </div>

                <GoogleMap markers={markers}/>
            </div>
        )
    }
};