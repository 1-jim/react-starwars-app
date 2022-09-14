import { getTheme } from "@fluentui/react";
import React, { useRef, useState } from "react";

function ChosenColours(): JSX.Element {
    const textInputRef = useRef<HTMLInputElement>(null);
    const hexColour = useRef<HTMLInputElement>(null);
    const [choiceCount, setChoiceCount] = useState(0);
    const theme = getTheme();
    const handleSubmit = (e:any) => {
        e.preventDefault();
        //const chosenTitle = textInputRef?.current?.value;
        const chosenHex = hexColour?.current?.value;
        let counter = choiceCount;
        counter ++;
        setChoiceCount(counter);
        alert(chosenHex);
    };

    return(
        <div style={{ boxShadow: theme.effects.elevation8, padding: "2em" }}>
        {choiceCount >2 ? <p>Oh Come On! Make Up Your Mind!!</p>: null}
        <form onSubmit={handleSubmit} style={{ padding: "1em" }}>
            <input ref={textInputRef} type="text" placeholder="choose your team colours" />
            <input type="color" ref={hexColour}/>
            <button>Add Colour</button>
        </form>
        <div className="App-h2">Choice Count: {choiceCount}</div>
        </div>
    )
}

export default ChosenColours;
