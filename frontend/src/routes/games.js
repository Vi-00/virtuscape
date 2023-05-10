import game from "../components/game";

const games = [
    {
        key: 0,
        name: "Tic Tac Toe",
        location: "tic-tac-toe",
        // source: https://dribbble.com/tags/tictactoe
        image: "tic-tac-toe.png"
    },
    {
        key: 1,
        name: "Number Guessing",
        location: "guessing",
        // source: https://gifdb.com/gif/two-cute-animated-cats-question-mark-nwc23naz1c05cmvb.html
        image: "guessing.gif"
    },
    {
        key: 2,
        name: "Rock Paper Scissor",
        location: "rock-paper-scissor",
        // source: https://www.deviantart.com/naolito/art/Rock-Paper-Scissors-Bully-846437549
        image: "rps.jpg"
    }
]

export default function Games() {
    document.body.style.overflowY = "scroll";
    return (
        <ol id="games">
            {games.map(g => (
                <li key={g.key}>{game(g)}</li>
            ))}
        </ol>
    );
}
