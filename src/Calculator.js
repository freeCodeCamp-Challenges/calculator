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
  const [insertedNumbers, setInsertedNumbers] = useState([]);
  const [operators, setOperators] = useState([]);
  const [number, setNumber] = useState("0");
  // console.log("OUT // insertedNumbers ", insertedNumbers);
  console.log("OUT // operators ", operators);

  const doTheMath = useCallback(() => {
    console.log("DO-MATH");

    let numbers = [...insertedNumbers];
    let opers = [...operators];
    // Get also the last number and operator.
    numbers.push(number);
    opers.push(operators);

    const makeCalculations = () => {
      numbers.map((num, i) => {
        let result = 0;
        const firstNum = numbers[i];
        const secondNum = numbers[i + 1];
        if (secondNum === undefined) {
          setNumber(firstNum);
          return true;
        }
        switch (opers[i]) {
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
        opers.splice(0, 1);
        numbers.unshift(result);
        setNumber(result);
        makeCalculations();

        return true;
      });
    };

    // console.log("numbers ", numbers, "operators ", operators);

    makeCalculations();
  }, [insertedNumbers, number, operators]);

  const handleClick = useCallback(
    sign => {
      const removeInitialZero = () => (+number === 0 ? setNumber("") : null);

      const gatherElements = () => {
        console.log("///gatherElements", number);
        if (sign === "+" || sign === "-" || sign === "*" || sign === "/") {
          console.log('if (sign === "+"....', sign);

          setOperators([...operators, sign]);
        }
        setInsertedNumbers([...insertedNumbers, number]);
        if (sign === "=") {
          doTheMath();
        }
      };

      if (!isNaN(+sign)) {
        removeInitialZero();
        setNumber(num => num + sign);
      } else if (sign === "+" || sign === "-" || sign === "*" || sign === "/") {
        gatherElements();
        setNumber("0");
      } else {
        switch (sign) {
          case "=":
            gatherElements();
            break;
          case "AC":
            setNumber("0");
            setInsertedNumbers([]);
            setOperators([]);
            break;
          default:
            break;
        }
      }
    },
    [
      setInsertedNumbers,
      setNumber,
      doTheMath,
      number,
      insertedNumbers,
      operators
    ]
  );

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
