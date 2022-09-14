import { getTheme } from "@fluentui/react";
import React, { useRef, useState } from "react";

function ChosenColours(): JSX.Element {
  const [title, setTitle] = useState("");
  const [colour, setColour] = useState("#000000");
  const [choiceCount, setChoiceCount] = useState(0);
  const theme = getTheme();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let counter = choiceCount;
    counter++;
    setChoiceCount(counter);
    setTitle("");
    setColour("#000000");
    alert(title);
  };

  return (
    <div style={{ boxShadow: theme.effects.elevation8, padding: "2em" }}>
      {choiceCount > 2 ? <p>Oh Come On! Make Up Your Mind!!</p> : null}
      <form onSubmit={handleSubmit} style={{ padding: "1em" }}>
        <input
          value={title}
          type="text"
          placeholder="choose your team colours"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          value={colour}
          type="color"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Add Colour</button>
      </form>
      <div className="App-h2">Choice Count: {choiceCount}</div>
    </div>
  );
}

export default ChosenColours;
