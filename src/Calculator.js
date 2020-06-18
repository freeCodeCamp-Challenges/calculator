import React, { useState, useCallback } from "react";
import "./Styles.css";

// When I try to use context the drum machine disappears
// I wanted to use it so I won't have to pass the handleDisplay for the keys
// through props
//const { Provider, Consumer } = React.createContext(false)

// To modify code, first comment out window.focus()
// in componentDidMount

const data = [
  {
    id: "clear",
    letter: "AC"
  },
  {
    id: "divide",
    letter: "/"
  },
  {
    id: "multiply",
    letter: "*"
  },
  {
    id: "seven",
    letter: "7"
  },
  {
    id: "eight",
    letter: "8"
  },
  {
    id: "nine",
    letter: "9"
  },
  {
    id: "subtract",
    letter: "-"
  },
  {
    id: "four",
    letter: "4"
  },
  {
    id: "five",
    letter: "5"
  },
  {
    id: "six",
    letter: "6"
  },
  {
    id: "add",
    letter: "+"
  },
  {
    id: "one",
    letter: "1"
  },
  { id: "two", letter: "2", src: "http://www.naturesongs.com/yteu1.wav" },
  {
    id: "three",
    letter: "3"
  },
  {
    id: "decimal",
    letter: "."
  },
  { id: "zero", letter: "0" },

  {
    id: "equals",
    letter: "="
  }
];

const CalcButtons = props => {
  let calcButtonClass = ["drum-pad"];
  if (props.id === "clear") {
    calcButtonClass.push("clear");
  } else if (props.id === "zero") {
    calcButtonClass.push("zero");
  } else {
    calcButtonClass.push("normal");
  }

  return (
    <button
      className={calcButtonClass.join(" ")}
      id={props.id}
      onClick={props.onClick}
    >
      {props.letter}
    </button>
  );
};

const Calculator = props => {
  const [number, setNumber] = useState(" ");
  const [storedNumber, setStoredNumber] = useState(0);
  const [history, setHistory] = useState("");

  console.log("number storedNumber", number, storedNumber);

  const handleClick = useCallback(
    id => {
      console.log("handleClick", id);
      if (
        id !== "clear" ||
        id !== "divide" ||
        id !== "multiply" ||
        id !== "subtract" ||
        id !== "add" ||
        id !== "decimal" ||
        id !== "equals"
      ) {
        switch (id) {
          case "zero":
            setNumber(number => number + 0);
            break;
          case "one":
            setNumber(number => number + 1);
            break;
          case "two":
            setNumber(number => number + 2);
            break;
          case "three":
            setNumber(number => number + 3);
            break;
          case "four":
            setNumber(number => number + 4);
            break;
          case "five":
            setNumber(number => number + 5);
            break;
          case "six":
            setNumber(number => number + 6);
            break;
          case "seven":
            setNumber(number => number + 7);
            break;
          case "eight":
            setNumber(number => number + 8);
            break;
          case "nine":
            setNumber(number => number + 9);
            break;
          default:
            break;
        }
      }
      if (
        id === "clear" ||
        id === "divide" ||
        id === "multiply" ||
        id === "subtract" ||
        id === "add" ||
        id === "decimal" ||
        id === "equals"
      ) {
        console.log("if no number");

        switch (id) {
          case "add":
            setNumber(" ");
            setHistory(history => history + number + " + ");
            setStoredNumber(
              `${Math.round(
                `${(parseFloat(storedNumber) + parseFloat(number)) * 100}`
              ) / 100}`
            );
            break;
          case "subtract":
            setNumber(" ");
            setHistory(history => history + number + " - ");
            setStoredNumber(
              `${Math.round(
                `${(parseFloat(storedNumber) - parseFloat(number)) * 1000}`
              ) / 1000}`
            );
            break;
          case "divide":
            setNumber(" ");
            setHistory(history => history + number + " / ");
            setStoredNumber(
              `${Math.round(
                `${(parseFloat(storedNumber) / parseFloat(number)) * 1000}`
              ) / 1000}`
            );
            break;
          case "multiply":
            setNumber(" ");
            setHistory(history => history + number + " * ");
            setStoredNumber(
              `${Math.round(
                `${parseFloat(storedNumber) * parseFloat(number) * 1000}`
              ) / 1000}`
            );
            break;
          case "equals":
            // setNumber(" ");

            break;
          case "decimal":
            setNumber(".");
            break;
          case "clear":
            setNumber(" ");
            break;
          default:
            break;
        }
      }
    },
    [setNumber, number]
  );

  return (
    <div id="head">
      <div id="drum-machine">
        <div id="display">
          <p>{"< " + history + " >"}</p>
          <strong style={{ textTransform: "capitalize" }}>
            {"< " + number + " >"}
          </strong>
        </div>
        {data.map((pad, i) => (
          <CalcButtons
            key={pad + i}
            id={pad.id}
            letter={pad.letter}
            onClick={() => handleClick(pad.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
