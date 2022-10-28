export default class Weather {
    constructor(api_key) {
        this.apiKey = api_key;
//check if timestamp is older than 10 minutes
        if(localStorage.getItem('weather') &&
        Date.now() - localStorage.getItem('timestamp') < 600000){
            //get data from local storage
            const data = JSON.parse(localStorage.getItem('weather'));
            this.displayWeather(data);
            console.log('data from local storage');
        }else{
            this.getLocation();
            console.log('data from API');
        }
    }

    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        
    }

    getWeather(position){
        console.log("getWeather called");
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        
        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            //save to local storage
            localStorage.setItem('weather', JSON.stringify(data));
            //save timestamp
            localStorage.setItem('timestamp', Date.now());
            //print nu data
            this.displayWeather(data);});

    }
    displayWeather(data){
        const temp = data.current.temp_c;
        const weather = data.current.condition.text;
        const icon = data.current.condition.icon;
        //create an image element
        const img = document.createElement('img');
        img.src = icon;
        //create a div element
        
        document.querySelector(".weather__temp").innerText = temp + '°C';
        document.querySelector(".weather__summary").innerText = weather;
        document.querySelector(".weather__icon").appendChild(img);
    }
}
