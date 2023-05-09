import game from "../components/game";

const games = [
    {
        key: 0,
        name: "Tic Tac Toe",
        location: "tic-tac-toe",
        image: "tic-tac-toe.svg"
    },
    {
        key: 1,
        name: "Number Guessing",
        location: "guessing",
        image: "guessing.svg"
    },
    {
        key: 2,
        name: "Rock Paper Scissor",
        location: "rock-paper-scissor",
        image: "rps.webp"
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
