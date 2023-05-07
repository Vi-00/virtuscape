import {useState, useEffect} from "react";

export default function Guessing() {

    const [remainingMoves, setRemainingMoves] = useState(5);
    const [target, setTarget] = useState(42);
    const [message, setMessage] = useState("");
    const [guessInput, setGuessInput] = useState(0);
    useEffect(() => {
        let ignore = false;

        async function startFetching() {
            const response = await fetch('http://localhost:4000/guess');
            const data = await response.json();
            console.log({data});
            if (!ignore) {
                setTarget(data.target);
            }
        }

        startFetching();
        return () => {
            ignore = true;
        }
    }, []);
    const guess = () => {
        const g = guessInput;
        setRemainingMoves(remainingMoves - 1);
        if (g === target) {
            setMessage("You Won!");
        } else if (remainingMoves === 0) {
            setMessage(`You Lost. The number was ${target}`);
        } else {
            console.log({target, g});
            if (g < target) {
                setMessage("Too Low!");
            } else {
                setMessage("Too High!");
            }
        }
    }

    return (
        <>
            <p>Remaining Moves: {remainingMoves}</p>
            <input type={"number"} name="guess" id="user-guess" onChange={(e) => {
                setGuessInput(Number(e.target.value));
            }}/>
            <button onClick={() => guess()}>Guess!</button>
            <h2>{message}</h2>
        </>
    )
}