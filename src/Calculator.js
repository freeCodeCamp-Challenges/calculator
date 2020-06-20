import React, { useState, useCallback } from "react";
import "./Styles.css";

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
  let calcButtonClass = ["culc-buttons"];
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
  // const [history, setHistory] = useState("0");
  const [functionType, setFunctionType] = useState("");
  const [previousFunctionType, setPreviousFunctionType] = useState("");

  console.log("//////////////////////////////");
  console.log("previousFunctionType out", previousFunctionType);
  console.log("functionType out", functionType);
  console.log("storedNumber out", storedNumber);
  console.log("number out", number);
  console.log("functionType out", functionType);

  // If after zero comes a number replace zero with the number
  //  if (number.match(/[^0][0-9]/)) {
  //    console.log('number........', number);

  //   setNumber(number.split(' ').slice(0,1).join())
  // }

  const doTheMath = () => {
    console.log("doTheMath number ", number);
    console.log("doTheMath storedNumber ", storedNumber);
    // console.log("functionType", functionType);
    switch (functionType) {
      case "add":
        setNumber(
          Math.round((parseFloat(storedNumber) + parseFloat(number)) * 100) /
            100
        );
        setStoredNumber(0);
        // setHistory("");
        break;
      case "subtract":
        // If user previously pressed multiply or divide and then the minus sign,
        // take the minus number and do multiplicatioin / division
        // instead of subtraction.
        if (previousFunctionType === "multiply") {
          setNumber(
            Math.round(
              parseFloat(storedNumber) * -Math.abs(parseFloat(number)) * 1000
            ) / 1000
          );
        } else if (previousFunctionType === "divide") {
          setNumber(
            Math.round(
              ((parseFloat(storedNumber) / -Math.abs(parseFloat(number))) * 1000
            ) / 1000).toFixed(4) 
          );
        } else {
          setNumber(
            (Math.round((parseFloat(storedNumber) - parseFloat(number)) * 1000) /
              1000).toFixed(4) 
          );
        }
        setStoredNumber(0);
        // setHistory("");
        break;
      case "divide":
        // setStoredNumber(number);
        setStoredNumber("0");
        setNumber(
          (Math.round((parseFloat(storedNumber) / parseFloat(number)) * 1000) /
            1000).toFixed(4) 
        );
        // console.log(' divide', number, storedNumber );
        // setHistory("");
        break;
      case "multiply":
        setNumber(
          Math.round(parseFloat(storedNumber) * parseFloat(number) * 1000) /
            1000
        );
        setStoredNumber(0);
        // setHistory("");
        break;
      default:
        break;
    }
  };
  // , [number, storedNumber, setStoredNumber, setNumber, functionType]);

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
            // setHistory(history => history + 0);
            // console.log('history', history);

            // Set only one zero at the beginning.
            if (number.match(/^0/) && number.length === 1) {
              setNumber("0");
              // setHistory('0')
            }

            break;
          case "one":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-1");
            } else {
              setNumber(number => number + 1);
            }
            // setHistory(history => history + 1);
            break;
          case "two":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-2");
            } else {
              setNumber(number => number + 2);
            }
            // setHistory(history => history + number + 2);
            break;
          case "three":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-3");
            } else {
              setNumber(number => number + 3);
            }
            // setHistory(history => history + number + 3);
            break;
          case "four":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-4");
            } else {
              setNumber(number => number + 4);
            }
            // setHistory(history => history + number + 4);
            break;
          case "five":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-5");
            } else {
              setNumber(number => number + 5);
            }
            // setHistory(history => history + number + 5);
            break;
          case "six":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-6");
            } else {
              setNumber(number => number + 6);
            }
            // setHistory(history => history + number + 6);
            break;
          case "seven":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-7");
            } else {
              setNumber(number => number + 7);
            }
            // setHistory(history => history + number + 7);
            break;
          case "eight":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-8");
            } else {
              setNumber(number => number + 8);
            }
            // setHistory(history => history + number + 8);
            break;
          case "nine":
            // Set number to minus, if user pressed '-' before number.
            if (functionType === "subtract" && !previousFunctionType === " ") {
              setNumber("-9");
            } else {
              setNumber(number => number + 9);
            }
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
            console.log("add", id, storedNumber, number);

            if (number === undefined) {
              setNumber(" ");
              break;
            }
            setNumber(" ");
            // setHistory(history => history + " + ");
            // console.log("add", number, storedNumber);

            setStoredNumber(
              Math.round(
                (parseFloat(number) + parseFloat(storedNumber)) * 1000
              ) / 1000
            );
            break;
          case "subtract":
            setPreviousFunctionType(functionType);
            console.log("subtract functionType", functionType);
            console.log("subtract number", number);
            console.log("subtract storedNumber ", storedNumber);

            if (number == " " && storedNumber >= 0) {
              console.log('number === " " ', number === " ");
              break;
            } else {
              setNumber(" ");
              // setHistory(history => history + " - ");
              setStoredNumber(
                Math.round(
                  (parseFloat(number) - parseFloat(storedNumber)) * 1000
                ) / 1000
              );
            }

            break;
          case "divide":
            if (number === undefined) {
              break;
            }
            setNumber(" ");
            // setHistory(history => history + " / ");

            // eslint-disable-next-line
            if (storedNumber != 0) {
              setStoredNumber(parseFloat(storedNumber) / parseFloat(number));
            } else {
              setStoredNumber(number);
            }

            break;
          case "multiply":
            // setHistory(history => history + " * ");
            console.log("multiply", id, storedNumber, number);
            // In case user presses two fuction types (=,-,?,*)
            // one after the other. Get the last one
            if (number == " " && storedNumber >= 0) {
              console.log("number === undefined", number === undefined);
              break;
            }
            setNumber(" ");
            // eslint-disable-next-line
            if (storedNumber != 0 && !isNaN(number)) {
              setStoredNumber(parseFloat(storedNumber) * parseFloat(number));
            } else {
              setStoredNumber(number);
            }
            break;
          case "equals":
            doTheMath();
            break;
          case "decimal":
            if (number.match(/^[0-9]{0,9}$/)) {
              setNumber(number => number + ".");
            }
            break;
          case "clear":
            setNumber("");
            setStoredNumber(0);
            setPreviousFunctionType("");
            setFunctionType("");
            // setHistory("");
            break;
          default:
            break;
        }
      }
    },
    [number, setNumber, storedNumber, setStoredNumber, doTheMath]
  );
  console.log("render ......................");

  return (
    <div id="head">
      <div id="caclulator">
        <p id="history">{"< " + storedNumber + " >"}</p>
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
