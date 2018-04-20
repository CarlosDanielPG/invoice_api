var axios = require('axios');

var id_external = 'wjWpYZlhVqSbI8pTwBSjwwpgYw83';

axios.get(process.env.PAYBOOK_URL + 'users?api_key=' + process.env.PAYBOOK_KEY).
  then(function(response){
    var found = false;
    var obj = response.data['response'];
    for(var i = 0; i < obj.length; i++){
      if(obj[i]['id_external'] == id_external){
        console.log(obj[i]);
        found = true;
      }
    }
    if(!found)
      console.log('No existe el usuario');
    //console.log(obj[0]['name']);
  })
  .catch(function(error){
    console.log(error);
  });
