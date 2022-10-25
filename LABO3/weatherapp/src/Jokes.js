import Weather from '../src/Weather.js';
export default class Jokes {
    constructor() {
        this.getJoke();
    }
    getJoke() {
        fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.querySelector(".joke__text").innerText = data.value;
        });
    }
}