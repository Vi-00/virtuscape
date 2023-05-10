import {useState, useEffect} from "react";
import './guessing.css';

const difference = Math.round((Math.random() * 10)) + 10;

export default function Guessing() {
    document.body.style.overflow = "hidden";

    /* chooses a randon number up to 100*/
    const number = Math.round((Math.random() * 100));
    const [remainingMoves, setRemainingMoves] = useState(5);
    const [target, setTarget] = useState(number);
    const [message, setMessage] = useState("");
    const [guessInput, setGuessInput] = useState(0);
    const [alreadyWon, setalreadyWon] = useState(false);
    const [retries, setRetries] = useState(0);

    useEffect(() => {
        let ignore = false;

        async function startFetching() {
            const response = await fetch('http://localhost:4000/guess');
            try {
                const data = await response.json();
                console.log({data});
                if (!ignore) {
                    setTarget(data.target);
                }
            } catch (error) {
                console.log(error);
                // fallback random number!
                const number = Math.round((Math.random() * 100));
                setTarget(number);
            }
        }

        startFetching();
        return () => {
            ignore = true;
        }
    }, []);
    const guess = () => {
        if (remainingMoves === 0) {
            setalreadyWon(false);
            return;
        }
        const g = guessInput;
        if (g === target && alreadyWon === false) {
            setalreadyWon(true);
            setMessage("You Won!");
            return;
        }
        // prevents the user from entering more guesses when they have
        // already guessed the correct number
        if (alreadyWon === true) {
            setMessage("You have already guessed the correct number " + target + ". Please start a new game.");
            return
        }
        if (remainingMoves === 1) {
            setalreadyWon(false);
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

    const restart = () => {
        if (retries < 3 && alreadyWon === false) {
          setRemainingMoves(5);
          setalreadyWon(false);
          setRetries(retries + 1);
          setMessage("Moves Reset. Remaining retries left: " + (3 - (retries + 1)));
        }
        if (alreadyWon === true) {
          setMessage("You have already won. No need to retry. ^-^");
        }
        if (retries === 3) {
          setMessage("You can only have a max of 3 retries.");
          setRetries(0);
        }
    }

    const newGame = () => {
        if (remainingMoves === 5) {
            setMessage("No moves have been made yet. Please make a move.")
        }
        else {
            setalreadyWon(false);
            var newNumber = Math.round((Math.random() * 100));
            setTarget(newNumber);
            setMessage("A New Game has started.")
            setRemainingMoves(5);
        }
    }

    return (
        <>
            <div className = "container">
                <div id = "guessing">
                    <h1>Guessing Game</h1>
                    <h3>Remaining Moves: {remainingMoves}</h3>
                    <p>Please pick a number from {target-difference} to {target+difference}</p>
                    <input type={"number"} name="guess" id="user-guess"
                           placeholder="Please enter a number"
                           disabled={remainingMoves <= 0}
                           onChange={(e) => {
                               setGuessInput(Number(e.target.value));
                           }}/>
                    <br/>
                    <button onClick={() => guess()}
                            disabled={remainingMoves <= 0}>
                            Guess!
                    </button>
                    <button onClick={() => restart()}>
                            Start Over
                    </button>
                    <button onClick={() => newGame()}>
                            New Game
                    </button>
                    <h2>{message}</h2>
                </div>
            </div>
        </>
    )
}
