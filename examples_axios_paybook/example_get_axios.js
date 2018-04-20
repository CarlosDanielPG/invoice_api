var axios = require('axios');

axios.get(process.env.PAYBOOK_URL + 'users?api_key=' + process.env.PAYBOOK_KEY).
  then(function(response){
    console.log(response.data);
  })
  .catch(function(error){
    console.log(error);
  });
