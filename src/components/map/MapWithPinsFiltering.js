import React, {Component} from 'react';
import PropTypes from "prop-types";

import GoogleMap from "./GoogleMap";
import Loader from "../general/Loader";
import LinkToAll from "../buttons/LinkToAll";

import { API } from '../../extra/API';
// import { FILTERS, FILTERS_CONTENT } from "../../extra/map";
import "../../styles/map/map-with-pins-filtering.scss";

export default class MapWithPinsFiltering extends Component {

    static propTypes = {
		  map_id: PropTypes.string.isRequired,
		  lang: PropTypes.string
    }

    state = {
		  filter: "*",
		  filters: [],
        heading: "",
        text: "",
        loading: true,
        markers: null
    }

	 
    componentDidMount() { this.getMap() }


	 getMap = () => {
	
		const { map_id, lang } = this.props;

		if ( !map_id ) return;

		API.get(`maps/${ map_id }?lang=${ lang || "pl" }`)
		.then( res => {
			
			const { map } = res.data;
			const { name, points, categories } = map;

			this.all_markers = [...points ];

			const filters = this.getFilters( Object.values(categories) );
			const markers = this.getMarkers(); 

			this.setState({ heading: name, filters, markers, loading: false });	
		})
		.catch( err => {})
	}


	getFilters = categories => {
		return categories && !!categories.length
			? categories.map( item => {

				const { id, name, lenged_image } = item;
				return { value: name === "Wszystkie" ? "*" : id, label: name, icon: lenged_image }
			})
			: []
	}


    getMarkers = () => {

		const { filter } = this.state;
		const { all_markers } = this; 

		return all_markers && !!all_markers.length
				? all_markers.filter( item => ( item.category === filter || filter === "*" ))
					.map( item => {
						const { lat, lng, category, map_image } = item;
						return { lat, lng, category, icon: { url: map_image, width: 46, height: 57 }};
					})	
				: null;
    }


    filterMarkers = filter => {
        this.setState({ filter }, () => {

				const markers = this.getMarkers();
				this.setState({ markers })
		  })
    }


   //  getHeadingAndText = () => {
   //      const { filter } = this.state;
   //      const heading_and_text_obj = FILTERS_CONTENT[this.props.type];

   //      if (heading_and_text_obj && heading_and_text_obj[filter]) {

   //          const {heading, text, link_to_all} = heading_and_text_obj[filter];
   //          this.setState({heading, text, link_to_all});
   //      }
   //  }

    render() {

		  const { heading, text, link_to_all } = this.state;
		  
        const { loading, markers, filters } = this.state;
		  const { extra_classes } = this.props;

        return (
            <div className={`map-with-pins-filtering ${ extra_classes || "" }`}>

                { loading && <Loader/> }

                <div className="map-with-pins-filtering-info">

                    { loading && <Loader extra_classes="white"/>}

                    { !loading && (
                        <>
                            <div className="map-with-pins-filtering-info__main">
                                <div className="heading"> { heading } </div>
                                <div className="map-with-pins-filtering-info__text"> { text } </div>

                                { link_to_all && <LinkToAll path={ link_to_all } label="Dowiedz się więcej"/> }
                            </div>

                            <div className="map-with-pins-filtering-filters">
                                { filters && !!filters.length &&
                              		filters.map(({ icon, label, extra_label, value }) => {

													const active_class = value === this.state.filter ? "active" : "";

													return (
														<button
															key={ value }
															className={`map-with-pins-filtering-filters__item ${active_class} `}
															onClick={ e => {
																	e.preventDefault();
																	this.filterMarkers( value );
															}}
														>
															{ icon && <img src={ icon } alt="cat_image" /> }
															<span> { label } <small> { extra_label }</small> </span>
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