(() => {
    // keys for the weather app :

    //7169f5bedeb8da197f07b8c4e02cde4d // de personal key uit de mail
    // 7c998263790686fb082bdb3d6a532182    // my personal key for weather app
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // keys for the UNSPLASh photo app
//    3a2307f9688e470b2c3f18f71f6847ccfbe48f8bfaa0282d6a69e9dbcdcc9a80   // Access key

//    18e3996f2e52a3ae76de84d448361a09082dcb61093acb6c79e5d5997c324de3     // secret key

    //Redirect URI   (optional for applications that are only using the 'Public' permissions)
    //       urn:ietf:wg:oauth:2.0:oob

    //White-listed addresses to redirect to after authentication success OR failure (e.g. https://mysite.com/callback)
    //Use one line per URI
    // Use urn:ietf:wg:oauth:2.0:oob for local tests
    //     urn:ietf:wg:oauth:2.0:oob (Authorize)
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // luisteren naar de klik op de knop - onclick . . .
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
                //console.log(data);  // proefje maken
                // de titel een aantal gegevens van vandaag tonen : show titel + some data of today
                country = country.toUpperCase();
                document.getElementById("forcast-title").innerHTML="The weather in "+ciety+", "+country;
                document.getElementById("weather-description").innerHTML=data.weather[0].description;
                document.getElementById("degrees").innerHTML="Today: "+data.main.temp+" °C, feels like: "+data.main.feels_like+" °C";

                // uur en datum afspelen van die stad/plaats in de wereld
                //------------------------------------------------------------------------- zonsopgang: sunrise ----------------------------------------------------------------------------------------------------

                let date = new Date(data.sys.sunrise*1000);
// Hours part from the timestamp
                let hours = date.getHours();
// Minutes part from the timestamp
                let minutes = "0" + date.getMinutes();
// Will display time in 10:30 format
                let sunrise = hours + ':' + minutes.substr(-2);

// ------------------------------------------------------------------------ zonsondergang: sunset ----------------------------------------------------------------------------------------------------
                let datee = new Date(data.sys.sunset*1000);
// Hours part from the timestamp
                let houurs = datee.getHours();
// Minutes part from the timestamp
                let minuutes = "0" + datee.getMinutes();
// Will display time in 10:30 format   // why -2
                let sunset = houurs + ':' + minuutes.substr(-2);
// alles in één var steken en dan onclick tonen
//--------------------------------------------------------------------------------de gegevens van vandaag in een tabel steken en in de html tonen - show the data of today in the html --------------------------------------------------------------------------
// change the rain that is not right yet and look up the -2
                let tabell="<table><tr><td>wind</td><td>speed: "+data.wind.speed+"</td></tr><tr><td>Cloudiness</td><td>"+data.weather[0].description+"</td></tr><tr><td>Pressure</td><td>"+data.main.pressure+" hpa</td></tr><tr><td>Humidity</td><td>"+data.main.humidity+" %</td></tr> <tr><td>Rain</td><td>"+data.weather[0].description+"</td></tr><tr><td>Sunrise: </td><td>"+sunrise+"</td></tr><tr><td>Sunset: </td><td>"+sunset+"</td></tr><tr><td>Geo coord</td><td>longitude: "+data.coord.lon+" - latitude: "+data.coord.lat+"</td></tr></table>";

                document.getElementById("tabel").innerHTML=tabell;

            });
//-------------------------------------------------------om het gemiddelde van die vijf dagen te vertonen / show the average of five days -----------------------------------------------------------

        // hiervoor moet ik "forecast" ophalen ipv "weather"
        let startforcast="http://api.openweathermap.org/data/2.5/forecast?";
        let forcast=startforcast+city+key;

        // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
        fetch(forcast)

            .then((response) => {
                return response.json();
            })

            .then((data) => {
                console.log(data);

                // de dag van vandaag er uit het weather-object halen => dt_txt: "2020-01-13 18:00:00"
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
                var autoDay = d.getDate();
                //var uur = d.getHours();
                var maand=d.getMonth();
                var jaar=d.getFullYear();

                // de datum van morgen dynamisch op te vragen om te tonen
                var morgen_1 = new Date(jaar, maand, autoDay+1);
                let u = morgen_1.toString();
                let morgen = u.substring(0,15);

                // de datum van overmorgen dynamisch op te vragen om te tonen
                var morgen_2 = new Date(jaar, maand, autoDay+2);
                let t = morgen_2.toString();
                let overmorgen = t.substring(0,15);

                // de datum van betovermorgen dynamisch op te vragen om te tonen
                var morgen_3 = new Date(jaar, maand, autoDay+3);
                let o = morgen_3.toString();
                let betovermorgen = o.substring(0,15);

                var morgen_4 = new Date(jaar, maand, autoDay+4);
                let ou = morgen_4.toString();
                let bebetovermorgen = ou.substring(0,15);

                //dt_txt: "2020-01-13 15:00:00" // het uur er uit halen
                //let heure = today.split(" ");
                //let uuur=heure[1];

                // let daag = heure[1].split(":");
                // let r=daag[0];
                //alert(r);

//--------------------------------------------------------------------------------------- hier proberen die lijst van vijf dagen te tonen in de browser ----------------------------------------------------------
                // variabelen initialiseren - initialise vars

                let min=0;
                let max=0;
                let humi=0;
                let pressu=0;


                // function to calculate the average
                function gegevensOphalen(i,  teller_y){
                    min+=data.list[i].main.temp_min;
                    max+=data.list[i].main.temp_max;
                    humi+=data.list[i].main.humidity;
                    pressu+=data.list[i].main.pressure;

                    if(i==teller_y){
                        // 8 moet nog vervangen worden door de length van y.length
                        let averagePressu=pressu/teller_y;
                        averagePressu=Math.round(averagePressu);

                        let averageMin=min/teller_y;
                        averageMin=Math.round(averageMin);
                        let averageMax=max/teller_y;
                        averageMax=Math.round(averageMax);

                        let averageHumi=humi/teller_y;
                        averageHumi=Math.round(averageHumi);

                        let gegevens=[averageMin,averageMax,averageHumi,averagePressu];
                        return gegevens;
                    }
                }
                let day_1=[];
                let day_2=[];
                let day_3=[];
                let day_4=[];
                let day_5=[];

                // de array aflopen om de gegevens er uit te halen
                for (i=0;i<40;i++){

                    let today_2=data.list[i].dt_txt;
                    let datum_2 = today_2.split("-");
                    let dag_2=datum_2[2];
                    let daag_2 = dag_2.split(" ");
                    let vandaag_2=daag_2[0];

                    let teller_eerstedag=0;
                    let teller_e=0;
                    let teller_r=0;
                    let teller_q=0;
                    let teller_z=0;

                    if (autoDay == vandaag_2) {
                        teller_eerstedag+=teller_eerstedag;
                        gegevens_vandaag=gegevensOphalen(i,teller_eerstedag);

                    } else if (autoDay+1 == (parseInt(vandaag_2))) {
                        teller_z+=teller_z;
                        gegevens_morgen=gegevensOphalen(i,teller_z);
                    } else if (autoDay+2 == (parseInt(vandaag_2))) {
                        teller_e+=teller_e;
                        gegevens_overmorgen=gegevensOphalen(i,teller_e);
                    } else if (autoDay+3 == (parseInt(vandaag_2))) {
                        teller_r+=teller_r;
                        gegevens_betovermorgen=gegevensOphalen(i,teller_r);
                    } else if (autoDay+4 == (parseInt(vandaag_2))) {
                        teller_q+=teller_q;
                        gegevens_bebetovermorgen=gegevensOphalen(i,teller_q);
                    } else {
                        break;
                    }
                }

                let weektabel_2="<table>";

                console.log(gegevens_vandaag[0]); //
                // let gegevens=[averageMin,averageMax,averageHumi,averagePressu]; efkens om de volgorde te weten
                /*                      // hier die variabelen nog vervangen
                                        weektabel_2+="<tr><td>"+datu+"<br />Today</td><td>"+data.list[0].weather[0].icon+"</td><td>min temp: "+day_1[0]+" C°, max temp: "gegevens_vandaag[1]+" C°<br />humidity: "+gegevens_vandaag[2]+" %</td><td>"+data.list[0].weather[0].description+"<br />"+gegevens_vandaag[3]+" hpa</td></tr>";
                                        weektabel_2+="<tr><td>"+morgen+"<br /></td><td>"+data.list[i].weather[0].icon+"</td><td>min temp: "+day_2[0]+" C°, max temp: "+gegevens_morgen[1]+" C°<br />humidity: "+gegevens_morgen[2]+" %</td><td>"+data.list[i].weather[0].description+"<br />"+gegevens_morgen[3]+" hpa</td></tr>";
                                        weektabel_2+="<tr><td>"+overmorgen+"<br /></td>"+data.list[i].weather[0].icon+"</td><td>min temp: "+day_3[0]+" C°, max temp: "+gegevens_overmorgen[1]+" C°<br />humidity: "+gegevens_overmorgen[2]+" %</td><td>"+data.list[i].weather[0].description+"<br />"+gegevens_overmorgen[3]+" hpa</td></tr>";
                                        weektabel_2+="<tr><td>"+betovermorgen+"<br /></td>"+data.list[i].weather[0].icon+"</td><td>min temp: "day_4[0]+" C°, max temp: "+gegevens_betovermorgen[1]+" C°<br />humidity: "+gegevens_betovermorgen[2]+" %</td><td>"+data.list[i].weather[0].description+"<br />"+gegevens_betovermorgen[3]+" hpa</td></tr>";
                                        weektabel_2+="<tr><td>"+bebetovermorgen+"<br /></td>"+data.list[i].weather[0].icon+"</td><td>min temp: "+day_5[0]+" C°, max temp: "+bebetovermorgen[1]+" C°<br />humidity: "+bebetovermorgen[2]+" %</td><td>"+data.list[i].weather[0].description+"<br />"+bebetovermorgen[3]+" hpa</td></tr>";
                */
                weektabel_2+="</table>";

                // ------------------------------------------eerste werkende poging om de gegevens van vijf weekdagen te tonen, deze waarden zijn echter nog geen dag-gemiddelden ---------------------------------------------------------------------------------------

                // begin tabel
                // let weektabel="<table>";

                /*  weektabel+="<tr><td>"+datu+"<br />Today</td><td>"+data.list[0].weather[0].icon+"</td><td>min temp: "+data.list[0].main.temp_min+" C°, max temp: "+data.list[0].main.temp_max+" C°<br />humidity: "+data.list[0].main.humidity+" %</td><td>"+data.list[0].weather[0].description+"<br />"+data.list[0].main.pressure+" hpa</td></tr>";
                 weektabel+="<tr><td>"+morgen+"<br /></td><td>"+data.list[9].weather[0].icon+"</td><td>min temp: "+data.list[9].main.temp_min+" C°, max temp: "+data.list[9].main.temp_max+" C°<br />humidity: "+data.list[9].main.humidity+" %</td><td>"+data.list[9].weather[0].description+"<br />"+data.list[9].main.pressure+" hpa</td></tr>";
                 weektabel+="<tr><td>"+overmorgen+"<br /></td><td>"+data.list[18].weather[0].icon+"</td><td>min temp: "+data.list[18].main.temp_min+" C°, max temp: "+data.list[18].main.temp_max+" C°<br />humidity: "+data.list[18].main.humidity+" %</td><td>"+data.list[18].weather[0].description+"<br />"+data.list[18].main.pressure+" hpa</td></tr>";
                 weektabel+="<tr><td>"+betovermorgen+"<br /></td><td>"+data.list[27].weather[0].icon+"</td><td>min temp: "+data.list[27].main.temp_min+" C°, max temp: "+data.list[27].main.temp_max+" C°<br />humidity: "+data.list[27].main.humidity+" %</td><td>"+data.list[27].weather[0].description+"<br />"+data.list[27].main.pressure+" hpa</td></tr>";
                 weektabel+="<tr><td>"+bebetovermorgen+"<br /></td><td>"+data.list[36].weather[0].icon+"</td><td>min temp: "+data.list[36].main.temp_min+" C°, max temp: "+data.list[36].main.temp_max+" C°<br />humidity: "+data.list[36].main.humidity+" %</td><td>"+data.list[36].weather[0].description+"<br />"+data.list[36].main.pressure+" hpa</td></tr>";

                 */
                // einde tabel
                // weektabel+="</table>"

                // de gegevens/tabel in de html steken om te tonen
                //document.getElementById("foreCastForWeek").innerHTML=weektabel;
//---------------------------------------------------------------------------------------------------- einde eerste poging -----------------------------------------------------------------------




                // de gegevens/tabel in de html steken om te tonen
                document.getElementById("foreCastForWeek").innerHTML=weektabel_2;
                // nog schrijven: indien niets ingevuld in invulveld: errorr melding geven


            })



//----------------------------------------------------------------------------for working with axios ---------------------------------------------------------------------------------------------------
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
        //-------------------------------------------------------------------code snippets for unsplash---------------------------------------------------------------------------------------------------
        /*

         unsplash.search.photos("weather", 1, 1, { orientation: "landscape" })
               .then(toJson)
               .then(json => {
                   // Your code
               }); */

    }); //  einde onclick
})();
/*
var d1 = new Date();
var d2 = new Date(d1);
var same = d1.getTime() === d2.getTime();
var notSame = d1.getTime() !== d2.getTime(); */