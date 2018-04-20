var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var user_schema = new Schema({
  name      :  { type: String },
  sexo      :  { type: String },
});

module.exports = mongoose.model('User', user_schema);
