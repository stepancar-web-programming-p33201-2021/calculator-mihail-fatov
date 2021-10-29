import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

let numButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 's', '0']
let actButtons =['+', '-', '*', '/', '^', '<', 'clr']

class CalculatorButton extends Component {
    render() {
        return (
            <button>{this.props.name}</button>
        )
    }
}

class CalculatorButtonSpace extends Component {
    render() {
        return (
            <div className='buttonsSpace'>
                {numButtons.map((label) => <CalculatorButton name={label}/>)}
            </div>
        )
    }
}

class CalculatorField extends Component {
    render() {
        return (
            <div className='result'>
                <input/>
            </div>
        )
    }
}

class Calculator extends Component {
    render() {
        return (
            <div id='root'>
                <CalculatorField/>
                <CalculatorButtonSpace/>
            </div>
        )
    }
}


ReactDOM.render(
    <Calculator/>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
