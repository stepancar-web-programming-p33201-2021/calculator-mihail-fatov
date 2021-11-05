import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

let numButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ]
let actButtons =[ '+', '-', '*', '%', '^']

class Calculator extends Component {

    constructor(){
        super();
        this.searchInput = React.createRef();
        this.state= {
            inputString: '',
        }
    }

    handleFocus(){
        this.searchInput.current.focus()
    }
    
    inputChange (e) {
        let value = null
        if ((this.state.inputString.slice(-1).match(/[/%*+^-]/)) && (e.target.value.slice(-1).match(/[/%*+^-]/))) {
            value = this.state.inputString.slice(0, this.state.inputString.length-1)+e.target.value.slice(-1)
        } else {
            value = e.target.value.replace(/[^0-9+\-*/^%]/, '');
        }
        value = value.replace('/','%')
        this.setState({inputString: value})
        this.handleFocus()
    }

    numButtonClick (val) {
        console.log('Number: ' + val)
        this.setState({inputString: this.state.inputString+val})
        this.handleFocus()
    }

    actButtonClick(val){
        console.log('Action: ' + val)
        if (this.state.inputString.slice(-1).match(/[%*+^-]/)) {
            this.setState({inputString:this.state.inputString.slice(0, this.state.inputString.length - 1) + val})
        } else {
            this.setState({inputString: this.state.inputString+val})
        }
        this.handleFocus()
    }

    clrButtonClick(){
        this.setState({inputString: ''})
        this.handleFocus()
    }

    rmButtonClick(){
        this.setState({inputString: this.state.inputString.slice(0, this.state.inputString.length-1)})
        this.handleFocus()
    }

    actionCount(){
        let inputStr = this.state.inputString
        if (inputStr[0].match(/[*^%]/)){
            inputStr = inputStr.slice(1, this.state.inputString.length)
        }
        
        let parts = inputStr.split(/[%*+^-]/)
        let i = 0
        let bias = 0
        
        if (parts[0]=='') {
            parts[1] = inputStr[0]+parts[1]
            parts.shift()
            console.log(parts)
        }  
        let result = parseInt(parts[0])
        while (i<parts.length-1) {
            console.log(parts[i])
            //console.log(this.state.inputString[bias+parts[i].length])
            let operation = inputStr[bias+parts[i].length]
            if (operation=='+') {
                result = result + parseInt(parts[i+1])
            } else if (operation=='-') {
                result = result - parseInt(parts[i+1])
            } else if (operation=='*') {
                result = result * parseInt(parts[i+1])
            } else if (operation=='%') {
                result = Math.floor(result/parseInt(parts[i+1]))
            } else if (operation=='^') {
                result = Math.pow(result, parseInt(parts[i+1]))
            }
            bias = bias+parts[i].length+1
            i=i+1
        }
        this.setState({inputString: String(result)})
        this.handleFocus()
    }

    render() {

        return (
            <div id='root'>
                <div className='result'>
                <input style={{width: '95%'}} autoFocus={true} ref={this.searchInput} value={this.state.inputString} onChange={(e)=>{this.inputChange(e)}} onSubmit={()=>{this.actionCount()}}/>
            </div>
            <div className='buttonsSpace'>
                
                
                {numButtons.map((label) => <button value={label} onClick={()=>{this.numButtonClick(label)}}>{label}</button>)}
                
                {actButtons.map((label) => <button value={label} onClick={()=>{this.actButtonClick(label)}}>{label}</button>)}
                <button onClick={()=>{this.actionCount()}}>{'='}</button>
                <button onClick={()=>{this.rmButtonClick()}}>{'<'}</button>
                <button onClick={()=>{this.clrButtonClick()}}>{'C'}</button>
                
                
            </div>
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
