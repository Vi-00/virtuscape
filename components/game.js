import React from 'react';
import {Link} from "react-router-dom";

function Game(props) {
    return (
        <Link to={`/games/${props.location}`}>
            <img src={(`${process.env.PUBLIC_URL}/${props.image}`)}
                 width={"256px"}
                 height={"256px"}
            />
        </Link>
    );
}

export default Game;