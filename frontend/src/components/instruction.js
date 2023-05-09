import React, {useState} from 'react';

function Instruction(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <h3>{props.description}</h3>
            <h3>Instructions:</h3>
            <p>
                {props.instructions}
            </p>
        </div>
    );
}

export default Instruction;
