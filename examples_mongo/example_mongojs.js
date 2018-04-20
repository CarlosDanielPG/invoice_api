var mongojs = require("mongojs");

var db = mongojs("mongodb://127.0.0.1:27017/prueba",["users"]);

db.users.find({},function(err,docs){
if(err){
console.log("Ocurrió un error al ejecutar la consulta",err);
}else{
console.log(docs);
}
});
