import React, { useState, useCallback } from "react";
import "./Styles.css";

const data = [
  {
    id: "clear",
    sign: "AC"
  },
  {
    id: "divide",
    sign: "/"
  },
  {
    id: "multiply",
    sign: "*"
  },
  {
    id: "seven",
    sign: "7"
  },
  {
    id: "eight",
    sign: "8"
  },
  {
    id: "nine",
    sign: "9"
  },
  {
    id: "subtract",
    sign: "-"
  },
  {
    id: "four",
    sign: "4"
  },
  {
    id: "five",
    sign: "5"
  },
  {
    id: "six",
    sign: "6"
  },
  {
    id: "add",
    sign: "+"
  },
  {
    id: "one",
    sign: "1"
  },
  { id: "two", sign: "2" },
  {
    id: "three",
    sign: "3"
  },
  {
    id: "decimal",
    sign: "."
  },
  { id: "zero", sign: "0" },

  {
    id: "equals",
    sign: "="
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
      {props.sign}
    </button>
  );
};

const Calculator = props => {
  const [element, setElement] = useState([]);
  const [number, setNumber] = useState("0");
  console.log("OUT // element ", element);

  const doTheMath = () => {
    let numbers = [];
    let operators = [];
    element.map(el => {
      if (!isNaN(el)) {
        numbers.push(el);
      } else {
        operators.push(el);
      }
    });

    const makeCalculations = () => {
      if (numbers.length > 0) {
        numbers.map((num, i) => {
          let result = null;
          const firstNum = numbers[0];
          const operator = operators[0];
          let secondNum = numbers[1];
          if (secondNum === undefined) {
            secondNum = result;
          }

          switch (operator) {
            case "+":
              result = +firstNum + +secondNum;
              break;
            case "-":
              result = +firstNum - +secondNum;
              break;
            case "*":
              result = +firstNum * +secondNum;
              break;
            case "/":
              result = +firstNum / +secondNum;
              break;
            default:
              break;
          }

          numbers.splice(0, 2);
          operators.splice(0, 1);

          console.log("firstNum", firstNum, "firstoperator ", operator);
          console.log("secondNum", secondNum);
          console.log("RESULT ", result);
          makeCalculations();
        });
      }
    };

    console.log("numbers ", numbers, "operators ", operators);
    makeCalculations();
  };

  const handleClick = sign => {
    const removeInitialZero = () => (+number === 0 ? setNumber("") : null);

    const gatherElements = () => {
      setElement([...element, number]);
    };

    if (!isNaN(+sign)) {
      removeInitialZero();
      setNumber(num => num + sign);
    } else if (sign === '+' || sign === '-' || sign === '*' || sign === '/') {
      gatherElements();
      setNumber("0");
    } else {
      switch (sign) {
        case "=":
          gatherElements();
          doTheMath();
          break;
        case "AC":
          setNumber("0");
          setElement([]);
          break;
        default:
          break;
      }
    }

    // Remove initial zero.
    // if (+number === 0) {
    //   setNumber("");
    // }
  };

  return (
    <div id="head">
      <div id="caclulator">
        {/* <p id="history">{"< " + storedallElements + " >"}</p> */}
        <div id="display">
          <strong style={{ textTransform: "capitalize" }}>{number}</strong>
        </div>
        {data.map((pad, i) => (
          <CalcButtons
            key={pad + i}
            id={pad.id}
            sign={pad.sign}
            onClick={() => handleClick(pad.sign)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
