import {useEffect, useState} from "react";

const ImageButton = (props) => (
    <button value={props.value} onClick={props.onClick}>
        <img src={(`${process.env.PUBLIC_URL}/${props.image}`)}
             alt={""}
             width={"128px"}
             height={"128px"}/>
    </button>
)

const buttonData = [
    {
        key: 'rock',
        image: 'rock.svg',
        value: 'rock'
    },
    {
        key: 'paper',
        image: 'paper.svg',
        value: 'paper'
    },
    {
        key: 'scissors',
        image: 'scissor.svg',
        value: 'scissors'
    }
]

const choiceId = {
    'rock': 0,
    'paper': 1,
    'scissors': 2,
};

export default function RockPaperScissor() {
    const [userChoice, setUserChoice] = useState('');
    const [aiChoice, setAiChoice] = useState('');
    const [gameRound, setGameRound] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [message, setMessage] = useState('Choose your play!');
    useEffect(() => {
        let ignore = false;

        async function startFetching() {
            const data = {
                choice: userChoice
            };
            const response = await fetch('http://localhost:4000/rock-paper-scissor',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                }
            );
            const body = await response.json();
            console.log({body});
            if (!ignore) {
                setAiChoice(body.ai_choice);
                setMessage(body.message);
                setFetching(false);
            }
        }

        startFetching();

        return () => {
            ignore = true;
        }
    }, [userChoice, gameRound]);
    return (
        <>
            <ul id={'rps-choices'}>
                {buttonData.map(c => {
                    const props = {
                        onClick: () => {
                            setUserChoice(c.value);
                            setAiChoice('');
                            setGameRound(gameRound + 1);
                            setFetching(true);
                        }, ...c
                    };
                    return <li key={c.key}>
                        {ImageButton(props)}
                    </li>
                })}
            </ul>
            <p>You Chose:</p>
            {userChoice
                ? (<ImageButton onClick={() => {
                    console.log(userChoice, choiceId[userChoice]);
                    console.log(aiChoice, choiceId[aiChoice]);
                }}
                                value={buttonData[choiceId[userChoice]].value}
                                image={buttonData[choiceId[userChoice]].image}/>)
                : (<></>)
            }
            <p>AI Chose: </p>
            {aiChoice
                ? (<ImageButton onClick={() => {
                    console.log(aiChoice, choiceId[aiChoice])
                }}
                                value={buttonData[choiceId[aiChoice]].value}
                                image={buttonData[choiceId[aiChoice]].image}/>)
                : (fetching ? (<div className={'spinner'}></div>) : (<></>))
            }
            <h2>{message}</h2>
        </>
    )
}
