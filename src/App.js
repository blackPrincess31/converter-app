import { useEffect,useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';

function App() {

const [info, setInfo] = useState([]);
const [input, setInput] = useState(0);
const [from, setFrom] = useState("usd");
const [to, setTo] = useState("rub");
const [options, setOptions] = useState([]);
const [output, setOutput] = useState(0);

useEffect(() => {

	Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
.then((res) => {
	setInfo(res.data[from]);
	})
}, [from]);

useEffect(() => {
	setOptions(Object.keys(info));
}, [info])

function convert(from_or_to,input_or_output) {
	var rate = info[from_or_to];
	setOutput(input_or_output * rate);
}

function swap() {
	var sw = from;
	setFrom(to);
	setTo(sw);
}

function flip() {

	var temp = input;
	setInput(output);
	setOutput(temp);
	}


return (
	<div className="App">
	<div className="heading">
		<h1>Exchange money</h1>
	</div>
	<div className="container">
		<div className="left">
		<div>
		<Dropdown options={options}
				  onChange={(e) => {setFrom(e.value) }}
		value={from} placeholder="From" />
		</div>
		<input type="number"
			placeholder="0"
			value={input}
			onChange={(e) => setInput(e.target.value)}
			onInput={()=>{convert(to,input)}}
			/>

			<div className='btn'>
			<button onClick={()=> swap()}>Swap</button>
			</div>
		</div>

		<div className='right'>
		<div>
		<Dropdown options={options}
			onChange={(e) => {setTo(e.value)}}
		    value={to} placeholder="To" />	
       <input type="number"
			placeholder="0"
			value={output}
			onChange={(e) => setOutput(e.target.value)} 
			onInput={()=>{convert(from,output)}}
			/>
			<h4 className='current'> Current Rate = {info[to]}</h4>
		</div>
		</div>
	</div>
			
	<div className="result">
		
		<p>{input+" "+from+" = "+output + " " + to}</p>
	</div>

	</div>
);
}

export default App;

