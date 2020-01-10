(() => {
    document.getElementById("run").addEventListener("click", function(){
//will now provide autocomplete and parameter typings
        const axios = require('axios').default;

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













    });
})();