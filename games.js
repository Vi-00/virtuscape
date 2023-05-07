import game from "../components/game";

const games = [
    {
        key: 0,
        location: "tic-tac-toe",
        image: "tic-tac-toe.svg"
    },
    {
        key: 1,
        location: "guessing",
        image: "guessing.svg"
    },
]

export default function Games() {
    return (
        <ul id="games">
            {games.map(g => (
                <li key={g.key}>{game(g)}</li>
            ))}
        </ul>
    );
}