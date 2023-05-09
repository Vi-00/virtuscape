import instruction from "../components/instruction";

const instructions = [
    {
        "name": "Rock-Paper-Scissor",
        "description": "Try your luck against AI and beat it using the rules",
        "instructions": "Rock wins against scissor; paper wins against rock; and scissor wins against paper"
    },
    {
        "name": "Tic Tac Toe",
        "description": "Simple 2 player game to relieve those classroom memories",
        "instructions": "Player 1 is X and Player 2 is O. Players take turn marking the empty grid with their symbols. The winner is the first player to get 3 of her marks in a row (up, down, across, or diagonally)."
    },
    {
        "name": "Guessing Game",
        "description": "Check how accurate is your guess",
        "instructions": " A random number will be generated from 1 to 100. You have to guess the number in 10 tries. We'll guide you through hints for every move."
    },
    {
        "name": "Trivia Game",
        "description": "Show the world your GK with this fun Trivia game",
        "instructions": "There will be 10 questions. Every question will have 4 options with only one correct. Score will be based on correct answers."
    }
];

export default function Guides() {
    return (
        <div id="guides">
            <h1>A simple how-to guide</h1>
            <ul>
                {instructions.map(i => (
                    <li>{instruction(i)}</li>
                ))
                }
            </ul>
        </div>
    );
}

/*
*
* */
