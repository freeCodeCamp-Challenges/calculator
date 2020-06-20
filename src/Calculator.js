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
  } else if (props.id === "equals") {
    calcButtonClass.push("equals");
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
  const [number, setNumber] = useState("0");
  const [storedNumber, setStoredNumber] = useState(0);
  const [history, setHistory] = useState("0");
  const [functionType, setFunctionType] = useState("");

  // console.log("storedNumber out", storedNumber);
  // console.log("number out", number);

   // If after zero comes a number replace zero with the number
  //  if (number.match(/[^0][0-9]/)) {
  //    console.log('number........', number);
     
  //   setNumber(number.split(' ').slice(0,1).join())
  // }

  const doTheMath = useCallback(() => {
    // console.log("number ", number);
    // console.log("storedNumber ", storedNumber);
    // console.log("functionType", functionType);
    switch (functionType) {
      case "add":
        setNumber(
          `${Math.round(
            `${(parseFloat(storedNumber) + parseFloat(number)) * 100}`
          ) / 100}`
        );
        setStoredNumber(0);
        // setHistory("");
        break;
      case "subtract":
        setNumber(
          `${Math.round(
            `${(parseFloat(storedNumber) - parseFloat(number)) * 1000}`
          ) / 1000}`
        );
        setStoredNumber(0);
        // setHistory("");
        break;
      case "divide":
        setNumber(
          `${Math.round(
            `${(parseFloat(storedNumber) / parseFloat(number)) * 1000}`
          ) / 1000}`
        );
        setStoredNumber(0);
        // setHistory("");
        break;
      case "multiply":
        setNumber(
          `${Math.round(
            `${parseFloat(storedNumber) * parseFloat(number) * 1000}`
          ) / 1000}`
        );
        setStoredNumber(0);
        // setHistory("");
        break;
      default:
        break;
    }
  }, [number, storedNumber, functionType]);

  const handleClick = 
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
            // setHistory(history => history + 0);
            // console.log('history', history);
            
            // Set only one zero at the beginning.
            if (number.match(/^0/) && number.length === 1) {
                setNumber('0')
                // setHistory('0')
              } 
           
            break;
          case "one":
            setNumber(number => number + 1);
            // setHistory(history => history + 1);
            break;
          case "two":
            setNumber(number => number + 2);
            // setHistory(history => history + number + 2);
            break;
          case "three":
            setNumber(number => number + 3);
            // setHistory(history => history + number + 3);
            break;
          case "four":
            setNumber(number => number + 4);
            // setHistory(history => history + number + 4);
            break;
          case "five":
            setNumber(number => number + 5);
            // setHistory(history => history + number + 5);
            break;
          case "six":
            setNumber(number => number + 6);
            // setHistory(history => history + number + 6);
            break;
          case "seven":
            setNumber(number => number + 7);
            // setHistory(history => history + number + 7);
            break;
          case "eight":
            setNumber(number => number + 8);
            // setHistory(history => history + number + 8);
            break;
          case "nine":
            setNumber(number => number + 9);
            // setHistory(history => history + number + 9);
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
        setFunctionType(id);
        switch (id) {
          case "add":
            setNumber(" ");
            // setHistory(history => history + " + ");
            setStoredNumber(
              `${Math.round(
                `${(parseFloat(storedNumber) + parseFloat(number)) * 100}`
              ) / 100}`
            );

            break;
          case "subtract":
            setNumber(" ");
            // setHistory(history => history + " - ");
            setStoredNumber(
              `${Math.round(
                `${(parseFloat(storedNumber) - parseFloat(number)) * 1000}`
              ) / 1000}`
            );
            break;
          case "divide":
            console.log("divide");

            setNumber(" ");
            // setHistory(history => history + " / ");
            setStoredNumber(
              `${Math.round(
                `${(parseFloat(storedNumber) / parseFloat(number)) * 1000}`
              ) / 1000}`
            );
            break;
          case "multiply":
            setNumber(" ");
            // setHistory(history => history + " * ");
            setStoredNumber(
              `${Math.round(
                `${parseFloat(storedNumber) * parseFloat(number) * 1000}`
              ) / 1000}`
            );
            break;
          case "equals":
            doTheMath();
            break;
          case "decimal":
            if (number.match("\\.?")) {
              setNumber(number => number + ".");
            }
            break;
          case "clear":
            setNumber("");
            setStoredNumber(0);
            // setHistory("");
            break;
          default:
            break;
        }
      }
    }
    

  return (
    <div id="head">
      <div id="drum-machine">
        {/* <p id="history">{"< " + history + " >"}</p> */}
        <div id="display">
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
