import React from 'react';
import {Link} from "react-router-dom";

function Game(props) {
    return (
        <Link to={`/games/${props.location}`}>
            <figure>
            <img src={(`${process.env.PUBLIC_URL}/${props.image}`)}
                 width={"256px"}
                 alt={props.name}
                 height={"256px"}
            />
                <figcaption>{props.name}</figcaption>
            </figure>
        </Link>
    );
}

export default Game;
