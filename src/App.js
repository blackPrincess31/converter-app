import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';

function App() {

// Initializing all the state variables
const [info, setInfo] = useState([]);
const [input, setInput] = useState(0);
const [from, setFrom] = useState("usd");
const [to, setTo] = useState("rub");
const [options, setOptions] = useState([]);
const [output, setOutput] = useState(0);

// Calling the api whenever the dependency changes
useEffect(() => {
	Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
.then((res) => {
	setInfo(res.data[from]);
	})
}, [from]);


// Calling the convert function whenever
// a user switches the currency

useEffect(() => {
	setOptions(Object.keys(info));
	convert();
}, [info])

// Function to convert the currency
function convert() {
	var rate = info[to];
	setOutput(input * rate);
}


// Function to switch between two currency
// function flip() {
// 	var temp = from;
// 	setFrom(to);
// 	setTo(temp);
// }

function flip() {
	var temp = input;
	setInput(output);
	setOutput(temp);
	
}

// useEffect(() => {
// 	setOutput(input);
// 	flip();
// }, [input])
	

return (
	<div className="App">
	<div className="heading">
		<h1>Exchange money</h1>
	</div>
	<div className="container">
		<div className="left">
		
		<input type="text"
			placeholder="Enter the amount"
			value={input}
			onChange={(e) => setInput(e.target.value)}
			onInput={()=>{convert()}}/>
		<input type="text"
			placeholder="Enter the amount"
			value={output}
			onChange={(e) => setOutput(e.target.value)} 
			onInput={()=>{flip()}}/>
		</div>
    
		<div className="middle">
		<h3>From</h3>
		<Dropdown options={options}
					onChange={(e) => { setFrom(e.value) }}
		value={from} placeholder="From" />
		</div>
		
		<div className="right">
		<h3>To</h3>
		<Dropdown options={options}
					onChange={(e) => {setTo(e.value)}}
		value={to} placeholder="To" />
		</div>
	</div>
	<div className="result">

		<p>{input+" "+from+" = "+output + " " + to}</p>

	</div>
	</div>
);
}

export default App;

