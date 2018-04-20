var axios = require('axios');

axios.post(process.env.PAYBOOK_URL + 'users?api_key=' + process.env.PAYBOOK_KEY, {
    api_key : process.env.PAYBOOK_KEY,
    id_external: "wjWpYZlhVqSbI8pTwBSjwwpgYw83",
    name: "Carlos Perez"
  })
  .then(function (response){
    console.log(response.data);
  })
  .catch(function (error){
    console.log(error.data);
  });
