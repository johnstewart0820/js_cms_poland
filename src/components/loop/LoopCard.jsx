import React from "react";
import LoopNewsPost from "../news/LoopNewsPost";
import LoopEventsPost from "../events/LoopEventsPost";
import LoopGastronomyPost from "../gastronomy/LoopGastronomyPost";
import Card from "../StadiumReservationComponents/Card";
import LoopAttractionPost from "../attractions/LoopAttractionPost";
import GameCard from "../Cards/GameCard";

const Map = {
    events: LoopEventsPost,
    apartments: LoopGastronomyPost,
    restaurants: LoopGastronomyPost,
    courts: Card,
    attractions: LoopAttractionPost,
    games: GameCard,
};

export default function LoopCard(props) {
    const post = props.post || props;
    const Component = Map[post?.post_type] || LoopNewsPost;
    return <Component {...post}/>;
};
