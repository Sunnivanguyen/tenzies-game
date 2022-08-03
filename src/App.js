import React from "react";
import "./style.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    let check = dice.every((die) => die.isHeld && die.value === dice[0].value);
    if (check) {
      setTenzies(true);
    }
  }, [dice]);

  function generatNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(generatNewDie());
    }
    return newArray;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generatNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => ({
        ...die,
        isHeld: die.id === id ? !die.isHeld : die.isHeld,
      }))
    );
  }

  let diceElements = dice.map((die) => (
    <Die
      value={die.value}
      id={die.id}
      holdDice={holdDice}
      isHeld={die.isHeld}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
