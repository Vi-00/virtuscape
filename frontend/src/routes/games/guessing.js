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
        if (remainingMoves === 0) {
            return;
        }
        const g = guessInput;
        if (g === target) {
            setMessage("You Won!");
            return;
        }
        if (remainingMoves === 1) {
            setMessage(`You Lost. The number was ${target}`);
        } else {
            console.log({target, g});
            const difference = Math.abs(g - target);
            if (difference <= 10) {
                if (g < target) {
                    setMessage(`Quite close but the your guess is on lower side`);
                } else {
                    setMessage(`Quite close but the your guess is on upper side`);
                }
            } else {
                if (g < target) {
                    setMessage(`Oops the guess was quite lower`);
                } else {
                    setMessage(`Oops the guess was quite greater`);
                }
            }
        }
        setRemainingMoves(remainingMoves - 1);
    }

    return (
        <>
            <p>Remaining Moves: {remainingMoves}</p>
            <input type={"number"} name="guess" id="user-guess" disabled={remainingMoves <= 0}
                   onChange={(e) => {
                       setGuessInput(Number(e.target.value));
                   }}/>
            <button onClick={() => guess()} disabled={remainingMoves <= 0}>Guess!</button>
            <h2>{message}</h2>
        </>
    )
}
