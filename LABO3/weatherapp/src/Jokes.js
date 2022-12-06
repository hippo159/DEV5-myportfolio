import Weather from '../src/Weather.js';
export default class Jokes {
    constructor(subject) {
        this.getJoke(subject);
    }
    getJoke(subject) {
        
        fetch(`https://api.chucknorris.io/jokes/search?query=${subject}`)
        .then(response => response.json())
        .then(data => {
            //select random instance of data
            const random = Math.floor(Math.random() * data.result.length);
            const joke = data.result[random].value;
            document.querySelector(".joke__text").innerText = joke;
            document.querySelector(".addRead").innerText = "Even in " + subject + " weather you can still smell like Chuck Norris";
            console.log(joke);
        });
    }
}