import Weather from '../src/Weather.js';
export default class Jokes {
    constructor(subject) {
        this.getJoke(subject);
    }
    getJoke(subject) {
        
        fetch(`https://api.chucknorris.io/jokes/search?query=${subject}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.querySelector(".joke__text").innerText = data.value;
        });
    }
}