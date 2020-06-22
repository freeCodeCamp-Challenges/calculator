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
  // console.log("OUT // element ", element);

  const doTheMath = () => {
    let numbers = [];
    let operators = [];
    element.map(el => {
      // console.log("el", el);
      if (!isNaN(el)) {
        numbers.push(el);
      } else {
        console.log(isNaN(el), el);

        operators.push(el);
      }
    });
    numbers.map((num, i) => {
      const firstNum = numbers[0];
      const firstOperator = operators[0];
      const secondNum = numbers[1];
      let result = 0;

      switch (firstOperator) {
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
console.log('RESULT ', result);

      console.log("firstNum", firstNum, "firstoperator ", firstOperator);
    });

    console.log("numbers ", numbers, "operators ", operators);
  };

  const handleClick = sign => {
    switch (sign) {
      case "=":
        doTheMath();
        break;
      case "AC":
        setNumber("0");
        setElement([]);
        break;

      default:
        break;
    }
    // Remove initial zero.
    if (+number === 0) {
      setNumber("");
    }

    if (sign !== "AC" && sign !== "=") {
      setNumber(num => num + sign);
      setElement([...element, sign]);
    }
  };

  console.log("render ......................");
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
