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
                document.getElementById("degrees").innerHTML="Today: "+data.main.temp+" °C, feels like: "+data.main.feels_like+" °C";
                // uur en datum afspelen van die plek
                // zonsopgang:
                let date = new Date(data.sys.sunrise*1000);
// Hours part from the timestamp
                let hours = date.getHours();
// Minutes part from the timestamp
                let minutes = "0" + date.getMinutes();
// Will display time in 10:30:23 format
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

            });

                let startforcast="http://api.openweathermap.org/data/2.5/forecast?"
                let forcast=startforcast+city+key;

                // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
                fetch(forcast)

                    .then((response) => {
                        return response.json();
                    })

                    .then((data) => {
                        console.log(data);

                        // de dag van vandaag er uit het weather-object halen
                        let today=data.list[0].dt_txt;
                        let datum = today.split("-");
                        let dag=datum[2];
                        let daag = dag.split(" ");
                        let vandaag=daag[0];

                        // om de datum van vandaag met jaar etc. te tonen in de html
                        let d = new Date();
                        let x = d.toString();
                        let datu = x.substring(0,15);

                        // om dynamisch de dag van vandaag op te halen
                        var c = d.getDate();
                        //var uur = d.getHours();
                        var maand=d.getMonth();
                        var jaar=d.getFullYear();

                        // de datum van morgen dynamisch op te vragen om te tonen
                        var morgen_1 = new Date(jaar, maand, c+1);
                        let u = morgen_1.toString();
                        let morgen = u.substring(0,15);

                        // de datum van overmorgen dynamisch op te vragen om te tonen
                        var morgen_2 = new Date(jaar, maand, c+2);
                        let t = morgen_2.toString();
                        let overmorgen = t.substring(0,15);

                        // de datum van betovermorgen dynamisch op te vragen om te tonen
                        var morgen_2 = new Date(jaar, maand, c+3);
                        let o = morgen_2.toString();
                        let betovermorgen = o.substring(0,15);

                        var morgen_3 = new Date(jaar, maand, c+4);
                        let ou = morgen_3.toString();
                        let bebetovermorgen = ou.substring(0,15);

                        //dt_txt: "2020-01-13 15:00:00" // het uur er uit halen
                        //let heure = today.split(" ");
                        //let uuur=heure[1];

                       // let daag = heure[1].split(":");
                       // let r=daag[0];
                        //alert(r);

                   if(c==vandaag){


                      }
                      // nu schrijven voor de dag van vandaag: het uur er uithalen als vandat tot dat uur list[]=3;
                       // anders list[]=0; etc . . .

             let i=0;
             let weektabel="<table>";

              // While(i<=45){
                weektabel+="<tr><td>"+datu+"<br />Today</td><td>"+data.list[0].weather[0].icon+"</td><td>min temp: "+data.list[0].main.temp_min+" C°, max temp: "+data.list[0].main.temp_max+" C°<br />humidity: "+data.list[0].main.humidity+" %</td><td>"+data.list[0].weather[0].description+"<br />"+data.list[0].main.pressure+" hpa</td></tr>";
               weektabel+="<tr><td>"+morgen+"<br /></td><td>"+data.list[9].weather[0].icon+"</td><td>min temp: "+data.list[9].main.temp_min+" C°, max temp: "+data.list[9].main.temp_max+" C°<br />humidity: "+data.list[9].main.humidity+" %</td><td>"+data.list[9].weather[0].description+"<br />"+data.list[9].main.pressure+" hpa</td></tr>";
               weektabel+="<tr><td>"+overmorgen+"<br /></td><td>"+data.list[18].weather[0].icon+"</td><td>min temp: "+data.list[18].main.temp_min+" C°, max temp: "+data.list[18].main.temp_max+" C°<br />humidity: "+data.list[18].main.humidity+" %</td><td>"+data.list[18].weather[0].description+"<br />"+data.list[18].main.pressure+" hpa</td></tr>";
               weektabel+="<tr><td>"+betovermorgen+"<br /></td><td>"+data.list[27].weather[0].icon+"</td><td>min temp: "+data.list[27].main.temp_min+" C°, max temp: "+data.list[27].main.temp_max+" C°<br />humidity: "+data.list[27].main.humidity+" %</td><td>"+data.list[27].weather[0].description+"<br />"+data.list[27].main.pressure+" hpa</td></tr>";
               weektabel+="<tr><td>"+bebetovermorgen+"<br /></td><td>"+data.list[36].weather[0].icon+"</td><td>min temp: "+data.list[36].main.temp_min+" C°, max temp: "+data.list[36].main.temp_max+" C°<br />humidity: "+data.list[36].main.humidity+" %</td><td>"+data.list[36].weather[0].description+"<br />"+data.list[36].main.pressure+" hpa</td></tr>";

                        //    i=i+9;
            //
                weektabel+="</table>"

              document.getElementById("foreCastForWeek").innerHTML=weektabel;

      // nog schrijven: indien niets ingevuld in invulveld: errorr melding geven


                    })
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
