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
  let calcButtonClass = '';
  if (props.id === "clear") {
    calcButtonClass = "clear";
  } else if (props.id === "zero") {
    calcButtonClass = "zero";
  } else if (props.id === "equals") {
    calcButtonClass = "equals";
  } else {
    calcButtonClass = "normal";
  }

  return (
    <button
      className={`culc-buttons ${calcButtonClass}`}
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
  const [elements, setElements] = useState([]);
  const [equalsSign, setEqualsSign] = useState([]);

  console.log("OUT // insertedNumbers ", insertedNumbers);
  console.log("OUT // operators ", operators);
  console.log("OUT // elements ", elements);
  console.log("OUT // equalsSign ", equalsSign);

  const doTheMath = useCallback(() => {
    console.log("DO-MATH");
    console.log("DO-MATH equalsSign ", equalsSign);

    let numbers = [...insertedNumbers];
    let opers = [...operators];
    let elems = [...elements];
    // Get also the last number and operator.
    numbers.push(number);
    opers.push(...operators);
    elems.push(number); // a number is the last element.

    const makeCalculations = () => {
      numbers.map((num, i) => {
        let result = 0;
        let firstNum = numbers[i];
        let secondNum = numbers[i + 1];
        // If the are no more numbers, give the firstNum as the result.
        if (secondNum === undefined) {
          setNumber(firstNum);
          return true;
        }
        // setNumber(numbers[i]);
        console.log("numbers", numbers);
        console.log("numbers[i]", numbers[i]);
        console.log("elems", elems);
        console.log("elems[i]", elems[i]);
        console.log("opers", opers);
        console.log("opers[i]", opers[i]);

        let operIndex = i;
        console.log(
          isNaN(elems[i + 1]),
          isNaN(elems[i + 2]),
          isNaN(elems[i + 3])
        );
        // If user presses 3 operators in a row,
        // take the last elment of the operators.
        if (isNaN(elems[i + 1]) && isNaN(elems[i + 2]) && isNaN(elems[i + 3])) {
          // console.log("operIndex");
          operIndex = +2; // 0, 1, 2
        }
        // If user pressed the equals and continued calculations.
        if (equalsSign[0] === '=') {
          console.log(
            "// dothemath if (!equalsSign)",
            'first', numbers[numbers.length - 2], 
            'secondNum',  numbers[numbers.length - 1],
            'opers', opers,
            'operIndex', opers.length - 1
          );
          firstNum = numbers[numbers.length - 2];
          secondNum = numbers[numbers.length - 1];
          operIndex = opers.length - 1
        }

       

        console.log(
          "opers[i + operIndex]",
          opers[operIndex],
          "operIndex",
          operIndex
        );
        switch (opers[operIndex]) {
          case "+":
            if (elems[i + 1] === "+" && elems[i + 2] === "-") {
              result = +firstNum + -+secondNum;
            } else {
              result = +firstNum + +secondNum;
            }
            break;
          case "-":
            if (elems[i + 1] === "-" && elems[i + 2] === "-") {
              result = +firstNum - -+secondNum;
            } else {
              result = +firstNum - +secondNum;
            }
            break;
          case "*":
            if (elems[i + 1] === "*" && elems[i + 2] === "-") {
              result = +firstNum * -+secondNum;
            } else {
              result = +firstNum * +secondNum;
            }
            break;
          case "/":
            if (elems[i + 1] === "/" && elems[i + 2] === "-") {
              result = +firstNum / -+secondNum;
            } else {
              console.log(
                "In / result = +firstNum / +secondNum; ",
                result,
                firstNum,
                secondNum
              );
              result = +firstNum / +secondNum;
            }
            break;
          default:
            break;
        }
        numbers.splice(0, 2);
        opers.splice(0, 1);
        // Put the result as the firstNum.
        numbers.unshift(result);

        // If user pressed the equals and continued calculations.
        if (equalsSign[0] === '=') {
          console.log('equalsSign[0] === ');
          setNumber(result);
          return true
        }
        
        makeCalculations();
        // setEqualsSign(false); // in case user coninues after getting a result
        
        
        return true;
      });
      
    };

    console.log("elements[elements.length - 1] ", elements[elements.length - 1]);

    makeCalculations();
    elems.push(elements[elements.length - 1]);
  }, [insertedNumbers, number, operators, elements, equalsSign]);

  const handleClick = useCallback(
    sign => {
      const removeInitialZero = () => (number === "0" ? setNumber("") : null);

      const gatherElements = () => {
        if (sign === "=") {
          doTheMath();
        }

        console.log("///gatherElements", number, sign);
        if (sign === "+" || sign === "-" || sign === "*" || sign === "/") {
          console.log(' gatherElements if (sign === "+"....', sign);
          setOperators([...operators, sign]);
          setElements([...insertedNumbers, ...operators, sign]);
        }
        if (insertedNumbers.length >= 0 && number !== "0") {
          setInsertedNumbers([...insertedNumbers, number]);
          setElements([...elements, number]);
        }

       
      };

      if (!isNaN(+sign)) {
        console.log("It is a number = elements......", elements);

        removeInitialZero();
        setNumber(num => num + sign);
      } else if (sign === "+" || sign === "-" || sign === "*" || sign === "/") {
        console.log(
          "handlelclick if (sign === '='....- sign, number",
          sign,
          number
        );

        gatherElements();
        setNumber("0");
      } else {
        switch (sign) {
          case "=":
            setEqualsSign([...equalsSign, sign]);
            console.log('In = elements', elements, " sign", sign);

            // setElements([...elements, ...operators, sign])
            gatherElements();
            break;
          case ".":
            if (number.match(/^[0-9]{0,9}$/)) {
              setNumber(number => number + ".");
            }
            break;
          case "AC":
            setNumber("0");
            setInsertedNumbers([]);
            setOperators([]);
            setElements([]);
            setEqualsSign([])
            // setEqualsSign(false);
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
      operators,
      elements,
      equalsSign
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
