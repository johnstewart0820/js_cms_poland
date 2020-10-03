import React, {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';

import {Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import {google_key} from "../../extra/API";
import {isFunction} from "../../extra/functions";
import map_style from "../../extra/map_style.json";

const GoogleMap = props => {

    const {markers, trails, onMarkerClick} = props;
    const has_markers = !!markers?.length;
    const has_trails = !!trails?.length;

    const [bounds, setBounds] = useState(null);
    const [center, setCenter] = useState({});

    const trails_markers = useMemo(() => {
        return trails && !!trails.length
            ? trails.map(trail => (trail?.[0]))
            : []
    }, [props.trails])


    useEffect(() => {

        const center =
            has_markers
                ? {lat: markers[0].lat, lng: markers[0].lng}
                : {lat: 49.7205859, lng: 18.8085521};

        setCenter(center);

    }, []);


    useEffect(() => {

        const getBounds = () => {

            if (!has_markers && !has_trails) return null;

            const trails_points = [];
            if (has_trails)
                trails.forEach(trail => trail.forEach(point => trails_points.push(point)));

            const points =
                has_markers && has_trails
                    ? [...markers, ...trails_points]
                    : has_markers && !has_trails
                    ? [...markers]
                    : [...trails_points];

            const bounds = new window.google.maps.LatLngBounds();
            points.forEach(({lat, lng}) => {
                if (lat && lng) bounds.extend(new window.google.maps.LatLng(lat, lng));
            })

            setBounds(bounds);
        }


        getBounds();

    }, [props.markers, props.trails]);


    const mapLoaded = (mapProps, map) => map.setOptions({styles: map_style});


    const getProperIcon = icon => {
        return icon && icon.url
            ? {
                url: icon.url,
                anchor: new window.google.maps.Point(icon.width || 80, icon.height || icon.width || 80),
                scaledSize: new props.google.maps.Size(icon.width || 80, icon.height || icon.width || 80),
            }
            : null;
    }


    return (
        <Map
            google={props.google}
            zoom={ 14 }
            containerStyle={{ width: "100%", height: "100%" }}

            zoomControl={true}
            mapTypeControl={false}
            fullscreenControl={false}
            streetViewControl={false}

            center={center}
            bounds={bounds}

            onReady={(mapProps, map) => mapLoaded(mapProps, map)}
        >

            {trails && !!trails.length &&
            trails.map((item, index) => (
                <Polyline
                    key={index}
                    path={item}
                    strokeColor="rgb(130, 195, 65)"
                    strokeOpacity={1}
                    strokeWeight={4}
                />
            ))
            }


            {trails_markers && !!trails_markers.length &&
            trails_markers.map(({lat, lng, icon}, index) => (
                (lat && lng)
                    ? (
                        <Marker
                            key={index}
                            position={{lat, lng}}
                            icon={getProperIcon(icon)}
                        />
                    )
                    : null
            ))
            }


            {markers && !!markers.length &&
            markers.map(({id, lat, lng, name, icon}, index) => (
                (lat && lng)
                    ? (
                        <Marker
                            key={index}
                            name={name}
                            position={{lat, lng}}
                            icon={getProperIcon(icon)}
                            onClick={e => {
                                if (isFunction(onMarkerClick)) onMarkerClick(id, lat, lng)
                            }}
                        />
                    )
                    : null
            ))
            }


        </Map>
    )
}


GoogleMap.propTypes = {
    markers: PropTypes.array,
    trails: PropTypes.array,
    onMarkerClick: PropTypes.func,
}

export default GoogleApiWrapper({
    apiKey: (google_key),
})(GoogleMap)