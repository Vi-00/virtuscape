import {useEffect, useState} from "react";
import "./rock-paper-scissor.css";

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
    //styles the overflow for this page only
    document.body.style.overflow = "hidden";

    const [userChoice, setUserChoice] = useState('');
    const [aiChoice, setAiChoice] = useState('');
    const [gameRound, setGameRound] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [message, setMessage] = useState('Choose your play!');
    const [apiError, setApiError] = useState(false);
    useEffect(() => {
        let ignore = false;
        setApiError(false);

        async function startFetching() {
            const data = {
                choice: userChoice
            };
            try {
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
                    setApiError(false);
                }
            } catch (error) {
                setFetching(false);
                setApiError(true);
                console.log(error);
            }
        }

        startFetching();

        return () => {
            ignore = true;
        }
    }, [userChoice, gameRound]);

    const aiChoiceButtonOnClick = () => {
        console.log(aiChoice, choiceId[aiChoice]);
    }
    const renderAiChoice = () => {
        if (gameRound === 0) {
            return (<></>);
        }
        if (apiError) {
            return (<p>We're having a slight hiccup. </p>);
        }
        if (fetching) {
            return (<div className={'spinner'}></div>);
        }
        if (aiChoice) {
            const data = buttonData[choiceId[aiChoice]];
            return (<ImageButton onClick={aiChoiceButtonOnClick} value={data.value} image={data.image}/>);
        }
        return (<></>);
    }

    const onUserChoiceButtonClick = () => {
        console.log(userChoice, choiceId[userChoice]);
        console.log(aiChoice, choiceId[aiChoice]);
    }

    const renderUserChoice = () => {
        if (userChoice) {
            const data = buttonData[choiceId[userChoice]];
            return (<ImageButton onClick={onUserChoiceButtonClick} value={data.value} image={data.image}/>);
        }
        return (<></>);
    }
    return (
        <>
<<<<<<< HEAD
            <div id = "rpscontainer" class = "container">
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
                <div id ="ai">
                    {aiChoice
                        ? (<ImageButton onClick={() => {
                            console.log(aiChoice, choiceId[aiChoice])
                        }}
                                        value={buttonData[choiceId[aiChoice]].value}
                                        image={buttonData[choiceId[aiChoice]].image}/>)
                        : (fetching ? (<div className={'spinner'}></div>) : (<></>))
                    }
                </div>
                <h2>{message}</h2>
            </div>
=======
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
            {renderUserChoice()}
            <p>AI Chose: </p>
            {renderAiChoice()}
            <h2>{message}</h2>
>>>>>>> 749d10edaee5df012e27f0b845a742619f685b3c
        </>
    )
}
