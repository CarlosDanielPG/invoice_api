var axios = require('axios');
var id_user = '5ad5365d0b212afd7d8b458c';

axios.delete(process.env.PAYBOOK_URL + 'users/' + id_user + '?api_key=' + process.env.PAYBOOK_KEY)
  .then(function(response){
    console.log(response.data);
  })
  .catch(function(error){
    console.log(error);
  });
