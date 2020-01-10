(() => {
    //7169f5bedeb8da197f07b8c4e02cde4d // de personal key uit de mail
    // 7c998263790686fb082bdb3d6a532182    // my personal key for weather app

    // luisteren naar de klik op de knop
    document.getElementById("run").addEventListener("click", function(){

        // de stad naar keuze ingeven in het invulveld en deze gegevens ophalen
        let ciety=document.getElementById("city").value;
        let country=document.getElementById("country").value;

        // het opsplitsen van de api-link om zo een stad naar keuze te kunnen toevoegen/selecteren
        let city="q="+ciety+","+country+"&units=metric";
        let key="&APPID=7169f5bedeb8da197f07b8c4e02cde4d";
        let start="http://api.openweathermap.org/data/2.5/weather?"

        // deze concateneren
        let apiCity=start+city+key;

        // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
        fetch(apiCity)

            .then((response) => {
                return response.json();
            })

            .then((data) => {
                console.log(data);
                country = country.toUpperCase();
                document.getElementById("forcast-title").innerHTML="The weather in "+ciety+", "+country;
                document.getElementById("weather-description").innerHTML=data.weather[0].description;
                document.getElementById("degrees").innerHTML=data.main.temp+" °C, feels like: "+data.main.feels_like+" °C";
                // uur en datum afspelen van die plek
                // zonsopgang:
                let date = new Date(data.sys.sunrise*1000);
// Hours part from the timestamp
                let hours = date.getHours();
// Minutes part from the timestamp
                let minutes = "0" + date.getMinutes();
// Will display time in 10:30:23 format   // why -2
                let sunrise = hours + ':' + minutes.substr(-2);

                // zonsondergang:
                let datee = new Date(data.sys.sunset*1000);
// Hours part from the timestamp
                let houurs = datee.getHours();
// Minutes part from the timestamp
                let minuutes = "0" + datee.getMinutes();
// Will display time in 10:30:23 format   // why -2
                let sunset = houurs + ':' + minuutes.substr(-2);
// alles in een var steken en dan onclick tonen

// change the rain that is not right yet and look up the -2
               let tabell="<table><tr><td>wind</td><td>speed: "+data.wind.speed+"</td></tr><tr><td>Cloudiness</td><td>"+data.weather[0].description+"</td></tr><tr><td>Pressure</td><td>"+data.main.pressure+" hpa</td></tr><tr><td>Humidity</td><td>"+data.main.humidity+" %</td></tr> <tr><td>Rain</td><td>"+data.weather[0].description+"</td></tr><tr><td>Sunrise: </td><td>"+sunrise+"</td></tr><tr><td>Sunset: </td><td>"+sunset+"</td></tr><tr><td>Geo coord</td><td>longitude: "+data.coord.lon+" - latitude: "+data.coord.lat+"</td></tr></table>";

              document.getElementById("tabel").innerHTML=tabell;

             /*   letweektabel="<table><tr><td>data.city.city.timezone data.weather.icon</td><td>min temp: "+data.main.temp_min+"C°, max temp "+data.main.temp_max+"C°</td></tr></table>" // dit kan eigenlijk ook in een lus
                              <tr><td></td><td></td></tr>
                               <tr><td></td><td></td></tr>
                               <tr><td></td><td></td></tr>
                               <tr><td></td><td></td></tr>

                </table>" */
            });

      // nog schrijven: indien niets ingevuld in invulveld: errorr melding geven



        //-------------------------------for working with axios ---------------------------------------------------------------------------------------------------
//will now provide autocomplete and parameter typings
        /*
                const axios = require('axios');

        // Make a request for a user with a given ID
                axios.get('/user?ID=12345')
                    .then(function (response) {
                        // handle success
                        console.log(response);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .finally(function () {
                        // always executed
                    });
        */
    });
})();
