import { useEffect,useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';

function App() {
const [current_input, setCurrent] = useState(0);
const [output_input, setOutput] = useState(0);

const [left_currency, setLCurrency] = useState("rub");
const [right_currency, setRCurrency] = useState("usd");

const [currency_from, setConvertFrom] = useState(left_currency);
const [currency_to, setConvertTo] = useState(right_currency);
const [currency_rate, setRate] = useState(0);

const [options, setOptions] = useState([]);

const [active_side, setActive] = useState('left');
const [left_value, setLeftValue] = useState(0);
const [right_value, setRightValue] = useState(0);

useEffect(() => {
	Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency_from}.json`)
.then((res) => {
	setRate(res.data[currency_from][currency_to]);
	setOptions(Object.keys(res.data[currency_from]));
})
}, [currency_to, currency_from]);

useEffect(() => {
	setOutput(current_input * currency_rate)
}, [currency_rate, current_input])

useEffect(() => {
	if(active_side == 'left'){
		setConvertFrom(left_currency);
		setConvertTo(right_currency);
	}
	if(active_side == 'right'){
		setConvertFrom(right_currency);
		setConvertTo(left_currency);
	}
}, [active_side, right_currency, left_currency])

useEffect(() => {
	if(active_side == 'left'){
		setLeftValue(current_input);
		setRightValue(output_input);
	}
	if(active_side == 'right'){
		setLeftValue(output_input);
		setRightValue(current_input);
	}
}, [output_input])

function swap_currency() {
	var sw = left_currency;
	setLCurrency(right_currency);
	setRCurrency(sw);
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
				  onChange={(e) => {setLCurrency(e.value); setActive('left')}}
		value={left_currency} />

		</div>
		<input type="number"
			id='left_input'
			placeholder="0"
			value={left_value}
			
			onInput={(e)=>{setCurrent(e.target.value); setActive('left')}}
			/>

			<div className='btn'>
			<button onClick={()=> swap_currency()}>Swap</button>
			</div>
		</div>

		<div className='right'>
		<div>
		<Dropdown options={options}
			onChange={(e) => {setRCurrency(e.value); setActive('right')}}
		    value={right_currency}/>	

       <input type="number"
	   		id='right_input'
			placeholder="0"
			value={right_value} 
			onInput={(e)=>{setCurrent(e.target.value); setActive('right')}}
			/>
			<h4 className='current'> Current Rate = {currency_rate}</h4>
		</div>
		</div>
	</div>
			
	<div className="result">
	</div>

	</div>
);
}

export default App;

