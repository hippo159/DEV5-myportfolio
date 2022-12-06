import './style.css';
import Weather from './src/Weather.js';
import Jokes from './src/Jokes.js';
const weather = new Weather("5a9a2c45322348aeb6a113745220612");
const status = document.querySelector(".weather__summary").innerText;
const joke = new Jokes(status);
console.log(status)