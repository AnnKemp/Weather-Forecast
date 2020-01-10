(() => {
    document.getElementById("run").addEventListener("click", function(){

        let ciety=document.getElementById("city").value;

        fetch("http://api.openweathermap.org/data/2.5/weather?q=Brussels,be&APPID=7169f5bedeb8da197f07b8c4e02cde4d")

            .then((response) => {
                return response.json();
            })

            .then((data) => {
                console.log(data);
            });

        //7169f5bedeb8da197f07b8c4e02cde4d // de personal key uit de mail
        // 7c998263790686fb082bdb3d6a532182    // my personal key for weather app
        // search city by name
        // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}

        //api.openweathermap.org/data/2.5/find?q=London&units=metric //voorbeeld voor het ophalen van temperatuur in celsius



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
