import './style.css';
import Weather from './src/Weather.js';
import Jokes from './src/Jokes.js';
const weather = new Weather("70b9db07fa264169866201652222510");
const status = document.querySelector(".weather__summary").innerText;
const joke = new Jokes(status);
console.log(status)