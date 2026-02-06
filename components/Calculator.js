import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);

    const inputNumber = (num) => {
        if (waitingForNewValue) {
            setDisplay(String(num));
            setWaitingForNewValue(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    const inputDecimal = () => {
        if (waitingForNewValue) {
            setDisplay('0.');
            setWaitingForNewValue(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(false);
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if(previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForNewValue(true);
        setOperation(nextOperator);
    };

    const calculate = (firstValue, secondValue, operator) => {
        switch(operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return secondValue !== 0 ? firstValue / secondValue : 0;
            case '=':
                return secondValue;
        }
    };

    const handleEquals = () => {
        if (operation && previousValue !== null) {
            const inputValue = parseFloat(display);
            const newValue = calculate(previousValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForNewValue(false);
        }
    };

    const handleDelete = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    return (
        <div className='calculator-container'>
            <div className='calculator'>
                <div className='display'>
                    <div className='display-value'>{display}</div>
                </div>

                <div className='button-row'>
                    <button className="button function" onClick={clear}>AC</button>
                    <button className="button function" onClick={handleDelete}>⌫</button>
                    <button className="button operator" onClick={() => performOperation('÷')}>÷</button>
                    <button className="button operator" onClick={() => performOperation('×')}>×</button>
                </div>

                <div className="button-row">
                    <button className="button" onClick={() => inputNumber(7)}>7</button>
                    <button className="button" onClick={() => inputNumber(8)}>8</button>
                    <button className="button" onClick={() => inputNumber(9)}>9</button>
                    <button className="button operator" onClick={() => performOperation('-')}>−</button>
                </div>
        
                <div className="button-row">
                    <button className="button" onClick={() => inputNumber(1)}>1</button>
                    <button className="button" onClick={() => inputNumber(2)}>2</button>
                    <button className="button" onClick={() => inputNumber(3)}>3</button>
                    <button className="button operator equals" onClick={handleEquals} rowSpan="2">=</button>
                </div>
        
                <div className="button-row">
                    <button className="button zero" onClick={() => inputNumber(0)}>0</button>
                    <button className="button" onClick={inputDecimal}>.</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;