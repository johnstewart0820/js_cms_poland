import React from "react";
import LoopNewsPost from "../news/LoopNewsPost";
import LoopEventsPost from "../events/LoopEventsPost";
import LoopGastronomyPost from "../gastronomy/LoopGastronomyPost";

const Map = {
    events: LoopEventsPost,
    apartments: LoopGastronomyPost,
    restaurants: LoopGastronomyPost,
    courts: LoopEventsPost,
    attractions: LoopEventsPost,
    games: LoopEventsPost,
};

export default function LoopCard(props) {
    const page = props.page || props;
    const Component = Map[page?.post_type] || LoopNewsPost;
    return <Component {...page}/>;
};
